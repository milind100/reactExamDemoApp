import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";


import userPostReq from "../../Api/userPostReq";



import CustomForm from "../../reusable/CustomForm";
import BootstarpCard from "../../reusable/BootstarpCard";
import { email, password } from "../../constants/formFields";

import { useDispatch } from "react-redux";
import { showFullScreenLoader } from "../../Redux/fullScreenLoader";

const endPoint = "Login";

const loginFormFields = { ...email, ...password }
const Login = () => {





    const dispatch = useDispatch()



    const navigate = useNavigate()

    const redirectToRegister = (e) => {
        navigate("/Signup")
    }




    const StoreDataInLocalStorage = (storeobj) => {
        const { token, name, email, role } = storeobj
        const wholeData = JSON.stringify(storeobj)
        localStorage.setItem("userData", wholeData)
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("role", role)
        localStorage.setItem("token", token)
    }



    const LoginAction = async (formObj) => {

        dispatch(showFullScreenLoader(true))
        const { email, password } = formObj
        const { statusCode, message, data } = await userPostReq(endPoint, { email, password })
        dispatch(showFullScreenLoader(false))

        if (statusCode === 200) {
            // Swal.fire({
            //     title: `${message} for ${data.role}`,
            //     confirmButtonText: 'going to Dashboard',
            // }).then((result) => {
            //     /* Read more about isConfirmed, isDenied below */
            //     if (result.isConfirmed || result.isDismissed) {
            StoreDataInLocalStorage({ ...data })
            if (data.role === "teacher") navigate("/teacher")
            if (data.role === "student") navigate("/student")
            //     }
            // })
        } else {
            Swal.fire(message)
        }


    }




    return (
        <>
            <h1 className="text-center bold">Exam Application</h1>
            <BootstarpCard>
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"><b> Login Form</b></h3>

                <CustomForm formFields={loginFormFields} actionOnformSuccess={LoginAction} >
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button
                            className="btn btn-warning mt-2 p-2"
                            id="submitBtn"
                            type="submit"
                        >
                            <b>Login</b>
                        </button>

                        <NavLink style={{ margin: "auto" }} to="/ForgotPasswordEmail">forgot Password</NavLink>

                        <button className="btn btn-info" onClick={e => redirectToRegister(e)}>Dont have an Account</button>

                    </div>
                </CustomForm>
            </BootstarpCard>
        </>

    )


}
export default Login