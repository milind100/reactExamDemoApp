import apiCall from "./apiCall"
const url = `${process.env.REACT_APP_URL}users`

const userPostReq = async (end, sendObj) => {
    const res = await apiCall({ endPoint: `${url}/${end}`, sendObj, method: "post", tokenRequired: true })
    return res.data
}

export default userPostReq