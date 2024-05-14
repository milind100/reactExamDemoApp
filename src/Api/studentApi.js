import apiCall from "./apiCall"
const url = `${process.env.REACT_APP_URL}student/`


export const studentGetReq = async (end) => {
    const res = await apiCall({ endPoint: `${url}/${end}`, method: "get", tokenRequired: true })
    return res.data
}



export const studentPutReq = async (end, sendObj) => {
    const res = await apiCall({ endPoint: `${url}/${end}`, sendObj, method: "put", tokenRequired: true })
    return res.data
}


export const studentPostReq = async (end, sendObj) => {
    const res = await apiCall({ endPoint: `${url}/${end}`, sendObj, method: "post", tokenRequired: true })
    return res.data
}