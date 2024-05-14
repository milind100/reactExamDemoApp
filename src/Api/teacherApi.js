import apiCall from "./apiCall"
const url = `${process.env.REACT_APP_URL}dashboard/Teachers`


export const teacherExamDeleteReq = async (end, id) => {

    const res = await apiCall({ endPoint: `${url}/${end}?id=${id}`, method: "delete", tokenRequired: true })
    return res.data
}

export const teacherGetReq = async (end) => {
    const res = await apiCall({ endPoint: `${url}/${end}`, method: "get", tokenRequired: true })
    return res.data
}


export const teacherPostReq = async (end, sendObj) => {

    const res = await apiCall({ endPoint: `${url}/${end}`, sendObj, method: "post", tokenRequired: true })
    return res.data
}


export const teacherPutReq = async (end, sendObj) => {

    const res = await apiCall({ endPoint: `${url}/${end}`, sendObj, method: "put", tokenRequired: true })
    return res.data

}