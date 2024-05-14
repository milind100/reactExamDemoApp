import { useDispatch, useSelector } from "react-redux"
import { fetchTeachersExamsList } from "../../Redux/Teacher/teachersExamsSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import SubLoader from "../../reusable/SubLoader"

import { initializeExamListState, deleteTeachersExam } from "../../Redux/Teacher/teachersExamsSlice"

const TeacherDashboard = () => {



    const navigate = useNavigate()


    const dispatch = useDispatch()
    const { isTokenValid, isLoading, exams } = useSelector(state => state.teachersExamsList)






    useEffect(() => {
        const token = localStorage.getItem("token")

        dispatch(fetchTeachersExamsList())

    }, [])



    if (!isTokenValid) {
        dispatch(initializeExamListState())
        // return navigate("/Login", { replace: true });
        Swal.fire("your session is expired Dashboard")
        localStorage.clear()
        navigate("/Login", { replace: true })

    }



    return (
        <>
            <h5>All exams created by this teacher</h5>
            {/* <button onClick={() => dispatch(initializeExamListState())}>Click</button> */}
            <br />
            <br />

            <table className="table align-middle  p-5" style={{ widht: "50vw" }}>
                <thead className="bg-light">
                    <tr>
                        {/* <th>Number</th> */}
                        <th>Exam Name</th>

                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {exams?.length === 0 ? <h4>no Exams to show</h4> :
                        isLoading ? <SubLoader /> :
                            exams?.map((exam) => {
                                const { email, notes, subjectName, _id } = exam
                                return (
                                    <tr key={_id}>
                                        <td>
                                            <p className="fw-normal mb-1">{subjectName}</p>
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => dispatch(deleteTeachersExam(_id))}
                                                type="button" className="btn btn-danger btn-sm btn-rounded">
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-info btn-sm btn-rounded"
                                                onClick={() => navigate(`editExam/${_id}`, { state: { subjectName } })}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                    }


                </tbody>

            </table>
            <button className="btn btn-success" onClick={() => navigate("CreateExam")}>Create Exam</button>

        </>
    )
}

export default TeacherDashboard