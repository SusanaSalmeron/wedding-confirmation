import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb';
import Handlebars from "handlebars";
import nunjucks from 'nunjucks'
import fs from 'fs'

const REGION = "eu-central-1";
const TABLE_NAME = "wapi-guests";
const client = new DynamoDBClient({ region: REGION })

async function scanItems() {
    const params = {
        TableName: TABLE_NAME
    }
    const command = new ScanCommand(params);
    const output = await client.send(command)
    return output
}

(async () => {
    /* const data = await scanItems()
    const unmarshallData = data.Items.map(item => unmarshall(item))
    const convertedData = JSON.stringify(unmarshallData);
    fs.writeFile("data.json", convertedData, (error) => {
        if (error) {
            console.error(error);
            throw error;
        }
        console.log("data.json written correctly");
    }); */
    fs.readFile("data.json", (error, output) => {
        if (error) {
            console.error(error);
            throw error;
        }
        const data = JSON.parse(output);

        const goToBrunch = data.filter((group) => {
            return group.brunch
        }).map(group => {
            return "- " + group.group
        }).join("\n")

        const noBrunch = data.filter((group) => {
            return group.brunch !== undefined && group.brunch !== true
        }).map(group => {
            return "- " + group.group
        }).join("\n")

        const needRoom = data.filter((group) => {
            return group.room
        }).map(group => {
            return "- " + group.group
        }).join("\n")

        const goingToBrunch = (group) => {
            return group.brunch ? "Sí" : "No"
        }

        const needHotel = (group) => {
            return group.room ? "Sí" : "No"
        }

        const selectedMenu = (group) => {
            return group.menus.map(menu => {
                const allergies = menu.allergies.length === 0 ? "Ninguna" : menu.allergies
                return "\n\t Nombre: " + menu.guestName + "\n\t Menú: " + menu.menuType + "\n\t Alergias: " + allergies
            })
        }

        const commentFromGuest = (group) => {
            return group.comment === '' ? "Ninguno" : group.comment
        }

        const menusWithAllergies = (type) => {
            return data.filter(group => {
                return group.menus !== undefined
            }).map(g => {
                return g.menus.map(menu => {
                    return menu.menuType === type && menu.allergies.length ? menu : { allergies: ["ninguna"], guestName: menu.guestName }
                })
            })
        }

        const validGroups = data.filter(group => {
            return group.brunch !== undefined
        })

        const validSongs = (groups) => {
            let currentSongs = []
            for (let i = 0; i < groups.length; i++) {
                const songs = groups[i].songlist
                //CASO 1
                //console.log(songs)
                if (songs.includes('. ') && songs.includes(':')) {
                    const artistAndSongList = songs.split('.')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        //SUBCASO 1
                        if (artistAndSongList[j].includes(': ')) {
                            const artistAndSong = artistAndSongList[j].split(': ')
                            currentSongs.push({
                                artist: artistAndSong[0].trim(),
                                trackName: artistAndSong[1].trim()
                            })
                        }
                    }
                    //CASO 2
                } else if (songs.includes('\n') && songs.includes(' - ')) {
                    const artistAndSongList = songs.split('\n')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        //SUBCASO 1
                        if (artistAndSongList[j].includes(' - ') && !artistAndSongList[j].includes("'")) {
                            const artistAndSong = artistAndSongList[j].split(' - ')
                            currentSongs.push({
                                artist: artistAndSong[0].trim().toLowerCase(),
                                trackName: artistAndSong[1].trim().toLowerCase()
                            })
                        }
                    }
                    //CASO 3
                } else if (songs.includes('"')) {
                    const artistAndSongList = songs.split('\n')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        const artistAndSong = artistAndSongList[j].split('"')
                        currentSongs.push({
                            artist: artistAndSong[0].trim().toLowerCase(),
                            trackName: artistAndSong[1].trim().toLowerCase()
                        })
                    }
                    //CASO 4
                } else if (songs.includes("DE")) {
                    const artistAndSongList = songs.split('\n')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        const artistAndSong = artistAndSongList[j].split('DE')
                        for (let k = 0; k < artistAndSong.length; k++) {
                            //SUBCASO 1
                            if (artistAndSong[k].includes('HOY')) {
                                const newSong = artistAndSong[0] + "DE" + artistAndSong[1]
                                artistAndSong.shift()
                                artistAndSong[0] = newSong
                                //SUBCAS0 2
                            } else if (artistAndSong[k].includes('ALE')) {
                                const newArtist = artistAndSong[1] + "DE" + artistAndSong[2]
                                artistAndSong.pop()
                                artistAndSong[1] = newArtist
                            }
                        }
                        currentSongs.push({
                            artist: artistAndSong[1].trim().toLowerCase(),
                            trackName: artistAndSong[0].trim().toLowerCase()
                        })
                    }
                    //CASO 5
                } else if (songs.includes('/')) {
                    const artistAndSongList = songs.split('\n')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        //SUBCASO 1
                        if (artistAndSongList[j].includes(' - ')) {
                            const artistAndSongs = artistAndSongList[j].split(' / ')
                            for (let k = 0; k < artistAndSongs.length; k++) {
                                const artistAndSong = artistAndSongs[k].split(' - ')
                                currentSongs.push({
                                    artist: artistAndSong[0].trim().toLowerCase(),
                                    trackName: artistAndSong[1].trim().toLowerCase()
                                })
                            }
                        }
                    }
                    //CASO 6
                } else if (songs.includes('_')) {
                    const artistAndSongList = songs.split('\n')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        const artistAndSong = artistAndSongList[j].split('_ ')
                        currentSongs.push({
                            artist: artistAndSong[1].trim().toLowerCase(),
                            trackName: artistAndSong[0].trim().toLowerCase()
                        })
                    }
                } else if (songs.includes('(')) {
                    const artistAndSongList = songs.split('\n')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        const artistAndSong = artistAndSongList[j].split('(')
                        const closeParenthesisRemoved = artistAndSong[1].split(')')
                        artistAndSong[1] = closeParenthesisRemoved[0]
                        currentSongs.push({
                            artist: artistAndSong[0].trim().toLowerCase(),
                            trackName: artistAndSong[1].trim().toLowerCase()
                        })
                    }

                } else if (songs.includes('!')) {
                    const artistAndSongList = songs.split('\n')
                    const artistAndSong = artistAndSongList[0].split('!')
                    currentSongs.push({
                        artist: artistAndSong[1].trim().toLowerCase(),
                        trackName: artistAndSong[0].trim().toLowerCase()
                    })
                } else if (songs.includes(': ')) {
                    const artistAndSongList = songs.split('\n')
                    for (let j = 0; j < artistAndSongList.length; j++) {
                        const artistAndSong = artistAndSongList[j].split(':')
                        currentSongs.push({
                            artist: artistAndSong[0].trim().toLowerCase(),
                            trackName: artistAndSong[1].trim().toLowerCase()
                        })
                    }
                }
            }
            for (let j = 0; j < groups.length; j++) {
                const songs = groups[j].songlist
                if (songs.includes('/') && !songs.includes('-')) {
                    const artistAndSongList = songs.split('\n')
                    for (let k = 0; k < artistAndSongList.length; k++) {

                        const artistAndSong = artistAndSongList[k].split('/')
                        console.log(artistAndSong)
                        currentSongs.push({
                            artist: artistAndSong[0].trim(),
                            trackName: artistAndSong[1].trim()
                        })
                    }
                }
            }
            return currentSongs
        }

        const songListFixed = validSongs(validGroups)

        fs.writeFileSync("tracklist.json", JSON.stringify(songListFixed))
        fs.writeFileSync("songlist.txt", "LISTA DE CANCIONES:\n")
        const songlistTemplate = nunjucks.render('songlistQuery.tpl', { songlist: songListFixed })
        fs.writeFileSync('songlist.txt', songlistTemplate, { flag: 'a' })

        const attendantGroups = data.filter((group) => {
            return group.brunch !== undefined
        }).map(group => {
            const brunch = goingToBrunch(group)
            const hotel = needHotel(group)
            const menus = selectedMenu(group)
            const songlist = group.songlist === "" ? "Ninguna" : group.songlist.toLowerCase()
            const comment = commentFromGuest(group)
            return {
                group: group.group,
                brunch: brunch,
                hotel: hotel,
                menus: menus,
                songlist: songlist.trim(),
                comment: comment.trim()
            }
        })

        const principalMenuWithAllergies = menusWithAllergies("Principal")
        fs.writeFileSync("menus.txt", "MENU PRINCIPAL CON ALERGIAS \n")
        const principalWithAllergiesFiltered = []
        const infantilWithAllergiesFiltered = []
        const allergiesFiltered = (data, array) => {
            for (let i = 0; i < data.length; i++) {
                data[i].map(allergy => {
                    return allergy.allergies[0] !== "ninguna" ? array.push({
                        allergies: allergy.allergies,
                        guestName: allergy.guestName
                    }) : allergy
                })
            }
        }

        allergiesFiltered(principalMenuWithAllergies, principalWithAllergiesFiltered)

        const principalMenusWithAllergiesListRendered = nunjucks.render("menuQuery.tpl", { allergies: principalWithAllergiesFiltered })
        fs.writeFileSync('menus.txt', principalMenusWithAllergiesListRendered, { flag: 'a' })
        const infantilMenuWithAllergies = menusWithAllergies("Infantil")
        fs.writeFileSync("menus.txt", "\nMENU INFANTIL CON ALERGIAS \n", { flag: "a" })
        allergiesFiltered(infantilMenuWithAllergies, infantilWithAllergiesFiltered)
        const infantilMenusWithAllergiesListRendered = nunjucks.render("menuQuery.tpl", { allergies: infantilWithAllergiesFiltered })
        fs.writeFileSync('menus.txt', infantilMenusWithAllergiesListRendered, { flag: 'a' })

        const brunchTemplate = nunjucks.render('brunchQuery.tpl', { group: goToBrunch })
        fs.writeFileSync("queries2.txt", brunchTemplate)
        const noBrunchTemplate = nunjucks.render('noBrunchQuery.tpl', { group: noBrunch })
        fs.writeFileSync("queries2.txt", noBrunchTemplate, { flag: 'a' })
        const roomTemplate = nunjucks.render('roomQuery.tpl', { group: needRoom })
        fs.writeFileSync("queries2.txt", roomTemplate, { flag: 'a' })
        const attendantsListRendered = nunjucks.render('attendantsList.tpl', { groups: attendantGroups })
        fs.writeFileSync("queries2.txt", attendantsListRendered, { flag: 'a' })
    });
})()

