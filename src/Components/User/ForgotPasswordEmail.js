import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

import userPostReq from "../../Api/userPostReq"

import CustomForm from "../../reusable/CustomForm"
import BootstarpCard from "../../reusable/BootstarpCard"
import { email } from "../../constants/formFields"

import { useDispatch } from "react-redux";
import { showFullScreenLoader } from "../../Redux/fullScreenLoader";


const forgotPasswordEmailFields = { ...email }
const endPoint = "ForgotPassword"

const ForgotPasswordEmail = () => {


    const dispatch = useDispatch()




    const sendEmailToBackend = async (formObj) => {
        dispatch(showFullScreenLoader(true))


        const { email } = formObj
        const { statusCode, message, data } = await userPostReq(endPoint, { email })
        dispatch(showFullScreenLoader(false))

        if (statusCode === 200) {
            Swal.fire(message)
        } else {
            Swal.fire("something went wrong")
        }

    }

    return (<>
        <h1>Forgot PAssword</h1>

        <BootstarpCard>

            <h5 className="mb-4 pb-2 pb-md-0 mb-md-5"><b> Please Enter Email we will send you varification link</b></h5>

            <CustomForm formFields={forgotPasswordEmailFields} actionOnformSuccess={sendEmailToBackend} >
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                        className="btn btn-warning mt-2 p-2"
                        id="submitBtn"
                        type="submit"
                    >
                        <b>Send Varification Code</b>
                    </button>
                    <NavLink to="/">go to Login Page</NavLink>
                </div>
            </CustomForm>
        </BootstarpCard>
    </>

    )
}

export default ForgotPasswordEmail