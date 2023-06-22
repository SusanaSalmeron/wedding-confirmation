import axios from 'axios';
import { getHeaders } from './clientUtils';

const groupUrl = "https://o048u36pvi.execute-api.eu-central-1.amazonaws.com/dev/v1/guests"


export async function getAttendantGroup(id: string) {
    let attendantGroup = null
    try {
        const response = await axios.get(`${groupUrl}/${id}`, getHeaders())
        attendantGroup = response.data
    } catch (err: any) {
        if (err.response?.status === 410) {
            attendantGroup = err.response.status
        } else {
            console.log('Error when getting attendant group', err.message)
        }
    }
    return attendantGroup
}


export async function updateGuest(id: string, menus: [], room: boolean, brunch: boolean, songlist: string, comment: string) {
    try {
        const body = {
            menus,
            room,
            brunch,
            songlist,
            comment
        }
        await axios.put(`${groupUrl}/${id}`, body, getHeaders())
        return true
    } catch (err) {
        console.log('Error', err)
        return false
    }
}

export async function deleteGuest(id: string) {
    try {
        console.log(id)
        const response = await axios.delete(`${groupUrl}/${id}`, getHeaders())
        console.log(response)
        return true
    } catch (err) {
        console.log(err)
    }
}