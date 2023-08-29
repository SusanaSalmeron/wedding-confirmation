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

        const songlistFromGuest = (group) => {
            return group.songlist === '' ? "Ninguna" : group.songlist.toLowerCase()
        }

        const commentFromGuest = (group) => {
            return group.comment === '' ? "Ninguno" : group.comment
        }

        const songListWithoutUselessCharacters = (group) => {
            const b = group.trim().split('\n').join('\n')
            const removeDots = b.split('.').join('')
            const removeSlashes = removeDots.split('/').join(' - ')
            const removeQuotes = removeSlashes.split("'").join('')
            const removeDoubleQuotes = removeQuotes.split('"').join('')
            const removeParenthesis = removeDoubleQuotes.split("(").join('').split(")").join('')
            const removeUnderScore = removeParenthesis.split('_').join('')
            return removeUnderScore.split(':').join('')
        }

        const attendantGroups = data.filter((group) => {
            return group.brunch !== undefined
        }).map(group => {
            const brunch = goingToBrunch(group)
            const hotel = needHotel(group)
            const menus = selectedMenu(group)
            const songlist = songlistFromGuest(group)
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

        const brunchTemplate = nunjucks.render('brunchQuery.tpl', { group: goToBrunch })
        fs.writeFileSync("queries2.txt", brunchTemplate)
        const noBrunchTemplate = nunjucks.render('noBrunchQuery.tpl', { group: noBrunch })
        fs.writeFileSync("queries2.txt", noBrunchTemplate, { flag: 'a' })
        const roomTemplate = nunjucks.render('roomQuery.tpl', { group: needRoom })
        fs.writeFileSync("queries2.txt", roomTemplate, { flag: 'a' })

        let attendantGroupsWithFixedSongs = []
        for (let i = 0; i < attendantGroups.length; i++) {
            const songList = songListWithoutUselessCharacters(attendantGroups[i].songlist)
            const oneGroup = {
                group: attendantGroups[i].group,
                brunch: attendantGroups[i].brunch,
                hotel: attendantGroups[i].hotel,
                menus: attendantGroups[i].menus,
                songlist: songList,
                comment: attendantGroups[i].comment + "\n"
            }
            attendantGroupsWithFixedSongs.push(oneGroup)
        }

        const attendantsListRendered = nunjucks.render('attendantsList.tpl', { groups: attendantGroupsWithFixedSongs })
        fs.writeFileSync("queries2.txt", attendantsListRendered, { flag: 'a' })
        fs.writeFileSync("queries2.txt", "LISTA DE CANCIONES \n", { flag: 'a' })
        const allSonglistTemplate = Handlebars.compile("{{group}}")
        for (let i = 0; i < attendantGroups.length; i++) {
            if (attendantGroups[i].songlist !== "Ninguna") {
                fs.writeFileSync("queries2.txt", allSonglistTemplate({ group: "\n" + songListWithoutUselessCharacters(attendantGroups[i].songlist) }), { flag: 'a' })
            }
        }
    });
})()

