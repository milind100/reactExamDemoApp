
import CustomForm from "../../reusable/CustomForm";
import BootstarpCard from "../../reusable/BootstarpCard";
import { name } from "../../constants/formFields";
import { studentPutReq } from "../../Api/studentApi";
import Swal from "sweetalert2";


import { useDispatch } from "react-redux";
import { showFullScreenLoader } from "../../Redux/fullScreenLoader";


const ChangeName = () => {

    const dispatch = useDispatch()



    let newName = JSON.parse(JSON.stringify(name))
    newName.name.initialValue = localStorage.getItem('name')

    const fromFields = { ...newName }

    const sendOldAndNewPassword = async (formObj) => {

        const { name } = formObj
        const finalObject = { "name": name, }
        try {

            dispatch(showFullScreenLoader(true))
            const res = await studentPutReq("studentProfile", finalObject)
            dispatch(showFullScreenLoader(false))

            if (res.statusCode === 200) {
                localStorage.setItem("name", res.data.name)
            }
            Swal.fire(res.message)
        }
        catch (err) {
            console.log(err)
            Swal.fire("something weont wrong")
        }
    }
    return (
        <BootstarpCard>

            <CustomForm formFields={fromFields} actionOnformSuccess={sendOldAndNewPassword} >
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                        className="btn btn-warning mt-1 p-1"
                        id="submitBtn"
                        type="submit"
                    >
                        <b>change name</b>
                    </button>
                </div>
            </CustomForm>
        </BootstarpCard>

    )
}

export default ChangeName