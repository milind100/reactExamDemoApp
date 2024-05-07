import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { teacherGetReq } from "../../Api/teacherApi"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const initialState = {
    name: "",
    email: "",
}


const SelectedStudent = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [status, setStatus] = useState({ isTokenValid: true, isLoading: false })
    const [student, setStudent] = useState({ name: "", email: "", })
    const [results, setresults] = useState([])



    const getStudentDetails = async () => {

        setStatus({ ...status, isLoading: true })
        try {
            const res = await teacherGetReq(`viewStudentDetail?id=${id}`)


            setStatus({ ...status, isLoading: false })
            if (res.statusCode === 200) {

                const { name, email, Result } = res.data[0]

                setStudent({ name, email })
                setresults(Result)
            }
            else if (res.statusCode === 401) {
                Swal.fire("your Token is invalid")

                setStatus({ ...status, isTokenValid: false })
                setStudent(initialState)
            }
            else {
                Swal.fire("Something is wrong")
                setStudent(initialState)

            }
        }
        catch (err) {

            setStatus({ ...status, isLoading: false })
            Swal.fire("Error Occcured")
            console.log(err)
        }
    }

    useEffect(() => {
        getStudentDetails()
    }, [])



    if (!status.isTokenValid) {

        // return navigate("/Login", { replace: true });
        Swal.fire("your session is expired read Exam")
        localStorage.clear()
        navigate("/Login", { replace: true })

    }

    return (
        <div>{
            status.isLoading ? <h1>Loading.......</h1> :
                <>
                    <h4>Name:{student.name}</h4><br />
                    <h4>Email:{student.email}</h4><br />



                    <table className="table align-middle  p-5" style={{ widht: "50vw" }}>
                        <thead className="bg-light">
                            <tr>
                                {/* <th>Number</th> */}
                                <th>index</th>
                                <th>SubjectName</th>
                                <th>score</th>
                                <th>rank</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results?.length === 0 ? <h4>no exams to show</h4> :
                                results?.map((result, index) => {

                                    const { rank, subjectName, score, _id, resultStatus } = result
                                    return (
                                        <tr key={_id}>
                                            <td>
                                                <p className="fw-normal mb-1">{(index + 1)}</p>
                                            </td>
                                            <td>
                                                <p className="fw-normal mb-1">{subjectName}</p>
                                            </td>
                                            <td>
                                                <p className="fw-normal mb-1">{rank}</p>
                                            </td>
                                            <td>
                                                <p className="fw-normal mb-1">{score}</p>
                                            </td>
                                            <td>
                                                <p className="fw-normal mb-1">{resultStatus}</p>
                                            </td>


                                        </tr>
                                    )
                                })
                            }


                        </tbody>

                    </table>







                    {/* <h3>SubjectName:{student.subjectName}</h3><br />
            <h3>score:{student.score}</h3><br />
            <h3>resultStatus:{student.resultStatus}</h3><br />
        <h3>studentId:{student.studentId}</h3> */}
                </>
        }
        </div >
    )
}

export default SelectedStudent