import axios from "axios";
import { getHeaders } from "./clientUtils";

const groupUrl = process.env.REACT_APP_GUESTS_API_URL

export interface Group {
    id: string,
    group: string,
    people: string[],
    size: number,
    available: boolean
}

abstract class ApiMessage {
    code: number

    constructor(code: number) {
        this.code = code
    }
    statusCode(): number {
        return this.code
    }
    abstract getContent(): Group
}

export class ApiResponse extends ApiMessage {
    group: Group

    constructor(code: number, content: any) {
        super(code)
        this.group = { ...content }
    }
    getContent(): Group {
        return this.group
    }
}

export class ApiError extends ApiMessage {
    code: number
    constructor(code: number) {
        super(code)
        this.code = code
    }
    getContent(): Group {
        return {
            id: '0',
            group: "",
            people: [""],
            size: 0,
            available: false
        }
    }
}

export async function getAttendantGroup(id: string): Promise<ApiMessage> {
    let attendantGroup: ApiMessage
    try {
        const response = await axios.get(`${groupUrl}/guests/${id}`, getHeaders())
        attendantGroup = new ApiResponse(response.status, response.data)
    } catch (err: any) {
        attendantGroup = new ApiError(err.response.status)
        if (err.response?.status !== 410 && err.response?.status !== 404) {
            console.log("Error when getting attendant group", err.message)
        }
    }
    return attendantGroup
}

export async function updateGuest(id: string, menus: [], room: boolean, brunch: boolean, songlist: string, comment: string): Promise<boolean> {
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
        console.log("Error", err)
        return false
    }
}

export async function deleteGuest(id: string): Promise<boolean> {
    try {
        await axios.delete(`${groupUrl}/guests/${id}`, getHeaders())
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}