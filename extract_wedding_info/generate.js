import axios from "axios";
import "dotenv/config";
import fs from 'fs';
import qs from 'qs'

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000'

export async function getToken(clientId = process.env.CLIENT_ID, clientSecret = process.env.CLIENT_SECRET) {
    const headers = {
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded", },
        auth: { username: clientId, password: clientSecret, },
    };
    const data = { grant_type: "client_credentials", };
    try {
        const response = await axios.post("https://accounts.spotify.com/api/token", qs.stringify(data), headers);
        return response.data.access_token;
    } catch (err) {
        console.log(err);
    }
};


/* const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const state = generateRandomString(16);
const scope = 'user-read-private user-read-email playlist-modify-private';

const params = {
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
}

console.log(params)

const response = await axios.post('https://accounts.spotify.com/authorize?', params) */

/* let getAccessToken = async () => {
    let options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            // 'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        params: {
            grant_type: 'client_credentials'
        }
    }
    const response = await axios(options)
    console.log(response.data)
    return response.data.access_token
}

const token = await getAccessToken()
const a = token.toString()

let tokenWithoutDoubleQuotes = ''
for (let i = 0; i < a.length; i++) {
    if (a.charAt(i) !== '"') {
        tokenWithoutDoubleQuotes += a.charAt(i);
    }
}

fs.writeFileSync("access.txt", tokenWithoutDoubleQuotes) */

