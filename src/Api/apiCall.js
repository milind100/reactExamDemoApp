import axios from "axios"
const apiCall = async ({ endPoint, sendObj, method, tokenRequired }) => {

    try {
        const res = await axios({
            method: method,
            url: endPoint,
            data: sendObj,
            headers: { "access-token": tokenRequired ? localStorage.getItem("token") : "" }
        });

        return res
    }
    catch (err) {
        console.log(err)
        return { statusCode: 404, message: "some thing went wrong please try again", data: { error: err } }
    }
}

export default apiCall


