import axios from 'axios';
import { getHeaders } from './clientUtils';

const groupUrl = process.env.REACT_APP_GUESTS_API_URL

export async function getAttendantGroup(id: string) {
    let attendantGroup = null
    try {
        const response = await axios.get(`${groupUrl}/guests/${id}`, getHeaders())
        attendantGroup = response.data
    } catch (err: any) {
        if (err.response?.status === 410) {
            attendantGroup = err.response.status
        } else if (err.response?.status === 404) {
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
        await axios.put(`${groupUrl}/guests/${id}`, body, getHeaders())
        return true
    } catch (err) {
        console.log('Error', err)
        return false
    }
}

export async function deleteGuest(id: string) {
    try {
        console.log(id)
        await axios.delete(`${groupUrl}/guests/${id}`, getHeaders())
        return true
    } catch (err) {
        console.log(err)
    }
}