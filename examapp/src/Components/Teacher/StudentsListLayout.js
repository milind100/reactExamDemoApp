import { useEffect, useState } from "react"
import { fetchStudentsList, initialiseAllStudentsList } from "../../Redux/Teacher/teachersStudentsList"
import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


const StudentsListLayout = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { studentsData, isTokenValid, isLoading } = useSelector(state => state.allStudentsList)
    const maxPage = Math.ceil(studentsData?.length / 10)


    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(fetchStudentsList())

    }, [])


    if (!isTokenValid) {
        dispatch(initialiseAllStudentsList())
        Swal.fire("your session is expired new Exam")
        localStorage.clear()

        navigate("/Login", { replace: true })
    }
    console.log("page########", page)
    return (
        <>
            {
                isLoading ? <h1>Loading.......</h1> :

                    <>
                        <h5>All exams created by this teacher</h5>
                        {/* <button onClick={() => dispatch(initializeExamListState())}>Click</button> */}
                        <br />
                        <div style={{ display: "flex" }}>

                            <button className="btn btn-danger"
                                onClick={() => setPage(c => c - 1)}
                                disabled={page === 1}
                            >prev</button>
                            <h4>{page}of{maxPage}</h4>
                            <button className="btn btn-info mx-1"

                                onClick={() => setPage(c => c + 1)}
                                disabled={page === maxPage}
                            >Next</button>
                        </div>
                        <br />

                        <h5>go To
                            <select className="" aria-label="Default select example"
                                onChange={(e) => setPage(Number(e.target.value))}
                                value={page}
                            >

                                {
                                    Array(maxPage).fill(0)?.map((page, index) => {
                                        return <option>{index + 1}</option>

                                    })
                                }
                            </select>
                        </h5>


                        <table className="table align-middle  p-5" style={{ widht: "50vw" }}>
                            <thead className="bg-light">
                                <tr>
                                    {/* <th>Number</th> */}
                                    <th>index</th>
                                    <th>Exam Name</th>
                                    <th>status</th>
                                    <th>Email</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData?.length === 0 ? <h4>no students to show</h4> :
                                    studentsData?.slice(page * 10 - 10, page * 10)?.map((exam, index) => {
                                        const { status, _id, name, email, } = exam
                                        return (
                                            <tr key={_id}>
                                                <td>
                                                    <p className="fw-normal mb-1">{page * 10 - 10 + (index + 1)}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{name}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{status}</p>
                                                </td>
                                                <td>
                                                    <p className="fw-normal mb-1">{email}</p>
                                                </td>


                                                <td>
                                                    <button type="button" className="btn btn-info btn-sm btn-rounded"
                                                        onClick={() => navigate(`${_id}`)}
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




                    </>



            }
        </>
    )

}

export default StudentsListLayout