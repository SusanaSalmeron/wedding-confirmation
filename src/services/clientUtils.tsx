export const getHeaders = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY
        }
    }
}