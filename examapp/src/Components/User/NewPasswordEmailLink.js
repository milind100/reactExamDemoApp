import Swal from "sweetalert2"
import { useNavigate, useSearchParams } from "react-router-dom"
import userPostReq from "../../Api/userPostReq"

import CustomForm from "../../reusable/CustomForm"
import BootstarpCard from "../../reusable/BootstarpCard"
import { password, confirmPassword } from "../../constants/formFields"

import { useDispatch } from "react-redux";
import { showFullScreenLoader } from "../../Redux/fullScreenLoader";


const newPasswordByEmailFields = { ...password, ...confirmPassword }

const NewPasswordEmailLink = () => {


  const dispatch = useDispatch()


  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');


  const navigate = useNavigate()

  const sendEmailToServer = async (formObj) => {


    const { password, confirmPassword } = formObj
    console.log(password, confirmPassword)

    dispatch(showFullScreenLoader(true))
    const res = await userPostReq(`ForgotPassword/Verify?token=${token}`, { Password: password, ConfirmPassword: confirmPassword })
    dispatch(showFullScreenLoader(false))

    const { statusCode, message, data } = res

    if (statusCode === 200) {
      Swal.fire(message)
      navigate("/")
    } else {
      Swal.fire(message)
    }

  }


  return (
    <>
      <h1>New password Link</h1>

      <BootstarpCard>

        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"><b> Reset Password</b></h3>

        <CustomForm formFields={newPasswordByEmailFields} actionOnformSuccess={sendEmailToServer}>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-warning mt-2 p-2"
              id="submitBtn"
              type="submit"
            >
              <b>Send Varification Code</b>
            </button>

          </div>
        </CustomForm>
      </BootstarpCard>
    </>

  )
}

export default NewPasswordEmailLink