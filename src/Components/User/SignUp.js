import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2"

import userPostReq from "../../Api/userPostReq"

import CustomForm from "../../reusable/CustomForm"
import BootstarpCard from "../../reusable/BootstarpCard"
import { name, email, password, confirmPassword, role } from "../../constants/formFields"


import { useDispatch } from "react-redux";
import { showFullScreenLoader } from "../../Redux/fullScreenLoader";



const registerFromFields = { ...name, ...email, ...password, ...confirmPassword, ...role }


const endPoint = "SignUp"

const SignUp = () => {



    const dispatch = useDispatch()


    const navigate = useNavigate()




    const RegisterUser = async (formObj) => {


        const { name, email, password, role } = formObj

        dispatch(showFullScreenLoader(true))
        const { statusCode, message, data } = await userPostReq(endPoint, { name, email, password, role })
        dispatch(showFullScreenLoader(false))



        if (statusCode === 200) {
            Swal.fire({
                title: `${message} for ${data.role}`,
                confirmButtonText: 'going to login',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed || result.isDismissed) {
                    navigate("/")
                }
            })
        } else {
            Swal.fire(message)
        }


    }

    return (
        <>
            <h1>Exam Application</h1>


            <BootstarpCard>

                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>

                <CustomForm formFields={registerFromFields} actionOnformSuccess={RegisterUser}>

                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button
                            className="btn btn-warning mt-2 p-2"
                            id="submitBtn"
                            type="submit"
                        >
                            <b>SignUp</b>
                        </button>



                        <button className="btn btn-info" onClick={() => navigate("/")}>Alredy has an Account</button>
                    </div>
                </CustomForm>
            </BootstarpCard>
        </>

    )

}

export default SignUp