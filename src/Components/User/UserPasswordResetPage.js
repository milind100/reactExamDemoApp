import CustomForm from "../../reusable/CustomForm";
import BootstarpCard from "../../reusable/BootstarpCard";
import { password, confirmPassword, oldPassword } from "../../constants/formFields";
import userPostReq from "../../Api/userPostReq";
import Swal from "sweetalert2";



import { useDispatch } from "react-redux";
import { showFullScreenLoader } from "../../Redux/fullScreenLoader";

const resetPasswordFields = { ...oldPassword, ...password, ...confirmPassword }

const UserPasswordResetPage = () => {


    const dispatch = useDispatch()


    const sendOldAndNewPassword = async (formObj) => {
        const token = localStorage.getItem("token");
        const { oldPassword, password, confirmPassword } = formObj
        const finalObject = {
            "oldPassword": oldPassword,
            "Password": password,
            "ConfirmPassword": confirmPassword
        }

        dispatch(showFullScreenLoader(true))
        try {
            const res = await userPostReq("ResetPassword", finalObject, { "access-token": token })
            // const res = await axios.post("https://examination.onrender.com/users/ResetPassword", formObj, { headers: { "access-token": token } })

            Swal.fire(res.message)

        }
        catch (err) {
            console.log(err)
            Swal.fire("something went wrong")
        }

        dispatch(showFullScreenLoader(false))

    }
    return (
        <BootstarpCard>

            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"><b> Please Enter your new Password</b></h3>

            <CustomForm formFields={resetPasswordFields} actionOnformSuccess={sendOldAndNewPassword} >
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                        className="btn btn-warning mt-2 p-2"
                        id="submitBtn"
                        type="submit"
                    >
                        <b>Reset Password</b>
                    </button>

                </div>
            </CustomForm>
        </BootstarpCard>

    )
}

export default UserPasswordResetPage