import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { initialiseStudentsExams } from "../../Redux/Student/allExamsForStudent"
import { useEffect } from "react"
import { getAllExams } from "../../Redux/Student/allExamsForStudent"
import { useState } from "react"
import SubLoader from "../../reusable/SubLoader"



const pageContentLength = 5


const StudentDashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { exams, isTokenValid, isLoading } = useSelector(state => state.allExamsForStudent)
    const [page, setPage] = useState(1)
    const maxPage = Math.ceil(exams?.length / pageContentLength)


    useEffect(() => {

        dispatch(getAllExams())
    }, [])


    if (!isTokenValid) {
        dispatch(initialiseStudentsExams())
        Swal.fire("your session is expired Dashboard")
        localStorage.clear()
        navigate("/Login", { replace: true })
    }


    return (
        <>
            {isLoading ? <SubLoader /> :
                <>
                    <h5>All exams created by this teacher</h5>
                    {/* <button onClick={() => dispatch(initializeExamListState())}>Click</button> */}
                    <br />

                    <button className="btn btn-warning"
                        onClick={() => dispatch(getAllExams())}
                    >update</button>
                    <br />
                    <br />
                    <div style={{ display: "flex" }}>

                        <button className="btn btn-danger"
                            onClick={() => setPage(c => page === 1 ? maxPage : c - 1)}
                        > {page === 1 ? "last" : "prev"} </button>

                        <h4>{page}of{maxPage}</h4>

                        <button className="btn btn-info mx-1"
                            onClick={() => setPage(c => page === maxPage ? 1 : c + 1)}
                        > {page === maxPage ? "first" : "next"} </button>
                    </div>



                    <h5>go To
                        <select className="" aria-label="Default select example"
                            onChange={(e) => setPage(Number(e.target.value))}
                            value={page}
                        >

                            {
                                Array(maxPage).fill(0)?.map((page, index) => {
                                    return <option key={index}>{index + 1}</option>

                                })
                            }
                        </select>
                    </h5>


                    <br />
                    <table className="table align-middle  p-pageContentLength" style={{ widht: "50vw" }}>
                        <thead className="bg-light">
                            <tr>
                                {/* <th>Number</th> */}
                                <th>index</th>
                                <th>Subject Name</th>
                                <th>Teachers Email</th>

                                <th>notes</th>
                                <th>Percentage</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams?.length === 0 ? <h4>no Exams to show</h4> :
                                isLoading ? <SubLoader /> :
                                    exams.slice(page * pageContentLength - pageContentLength, page * pageContentLength)?.map((exam, index) => {
                                        const { email, notes, subjectName, _id, Result } = exam

                                        return (
                                            <tr key={_id}>
                                                <td>
                                                    <p className="fw-normal mb-1">{page * pageContentLength - pageContentLength + (index + 1)}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{subjectName}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{email}</p>
                                                </td>

                                                <td>
                                                    {
                                                        notes.map((note, i) => <p className="fw-normal mb-1" key={i + 1}>{i + 1}){note}</p>)
                                                    }

                                                </td>

                                                <td>
                                                    <button type="button"
                                                        className={Result.length > 0 ? "btn btn-info btn-sm btn-rounded" : "btn btn-success btn-sm btn-rounded"}
                                                        onClick={() => navigate(`takeTest/${_id}`, { state: { subjectName } })}
                                                        disabled={Result.length > 0}
                                                    >
                                                        Take Test
                                                    </button>

                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{
                                                        Result[0]?.score ?
                                                            `${((Result[0]?.score / 7) * 100).toFixed(2)}%` :
                                                            "----"
                                                    }</p>
                                                </td>
                                            </tr>
                                        )
                                    })
                            }

                        </tbody>

                    </table>

                </>
            }
        </>
    )
}
export default StudentDashboard