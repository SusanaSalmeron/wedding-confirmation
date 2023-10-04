import axios from "axios";
import fs from 'fs';
import { getToken } from "./generate.js";
import nunjucks from 'nunjucks'

const token = await getToken()

let data = fs.readFileSync("tracklist.json")
const songlist = JSON.parse(data)


async function getTrack() {
    try {
        let spotifyLinks = []
        for (let i = 0; i < songlist.length; i++) {
            const trackName = songlist[i].trackName
            const artist = songlist[i].artist
            const response = await axios.get(`https://api.spotify.com/v1/search?q=track:${trackName}%20artist:${artist}&type=track`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (response.status === 200 && response.data.tracks.items.length) {
                const tracksArray = response.data.tracks.items
                let tracksIds = []
                for (let i = 0; i < tracksArray.length; i++) {
                    if (tracksArray[i].name.toLowerCase() === trackName.toLowerCase()) {
                        tracksIds.push(tracksArray[i].id)
                        break
                    }
                }
                for (let i = 0; i < tracksIds.length; i++) {
                    const trackResponse = await axios.get(`https://api.spotify.com/v1/tracks/${tracksIds[i]}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                    spotifyLinks.push({
                        trackName: trackResponse.data.name,
                        artist: trackResponse.data.artists[0].name,
                        link: trackResponse.data.external_urls.spotify
                    })
                }
            }
            else {
                spotifyLinks.push({
                    trackName: trackName,
                    artist: artist,
                    link: "No existe en spotify"
                })
            }
        }
        return spotifyLinks
    } catch (err) {
        console.log(err)
    }
}

const spotifyLinksList = await getTrack()


fs.writeFileSync("spotifyLinks.txt", "LINKS DE SPOTIFY:\n")
const linksTemplate = nunjucks.render('spotifyLinksQuery.tpl', { tracklist: spotifyLinksList })
fs.writeFileSync('spotifyLinks.txt', linksTemplate, { flag: 'a' })

