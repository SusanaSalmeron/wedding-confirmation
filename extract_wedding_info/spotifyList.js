import axios from "axios";
import { getToken } from "./generate.js";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:3000"

/* const token = await getToken() */


const body = {
    name: "Suana",
    description: "My Playlist",
    public: false
}


/* const response = await axios.post('https://api.spotify.com/v1/users/217vpk2omzobcqjsdmsdujaaa/playlists', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}, body) */



function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
let codeVerifier = generateRandomString(128);


async function generateCodeChallenge(codeVerifier) {
    async function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
/*     const digest = window.crypto.subtle.digest('SHA-256', data);
 */    console.log("miau" + encoder)

    /*  return base64encode(digest); */
}

await generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
})

console.log(generateCodeChallenge(codeVerifier + '________________'))
