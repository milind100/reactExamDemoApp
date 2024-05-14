import { useState, useRef, useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import EditingForm from "./reusable/EditingForm"
import { useSelector, useDispatch } from "react-redux"
import { addQuestion, updateQuestion, updateSubjectName, initialiseNewExam, updateTokenValidation, changeIsLoading } from "../../Redux/Teacher/teacherNewExam"
import Swal from "sweetalert2"
// import teacherPostReq from "../../Api/teacherPostReq"
import { teacherPostReq } from "../../Api/teacherApi"

import { showFullScreenLoader } from "../../Redux/fullScreenLoader"


const maxQuestions = 14

const CreateExamLayout = () => {


    const navigate = useNavigate()
    const { subjectName, questions, notes, isTokenValid, isLoading } = useSelector(state => state.createNewExam)


    const loaderRef = useRef(null)
    const [curQuestion, setCurQuestion] = useState(-1)
    const dispatch = useDispatch()

    const subjectForm = (
        <>
            <div className="d-flex  m-3">
                <div className="card mb-3" style={{ width: "90%", marginRight: 30 }}>
                    <div className="card-header" >

                        {/* <span className="text-theme-secondary me-2">{currentQuestion + 1}</span> */}
                        <label htmlFor="exampleInputEmail1">Subject Name</label>


                        <input type="text" className="form-control" value={subjectName}
                            onChange={(e) => dispatch(updateSubjectName(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            <button className="btn btn-info mx-3"
                onClick={(e) => setCurQuestion(0)}
            >Save</button>
        </>
    )



    const changeQuestion = (question, note) => {
        console.log(question)
        if (curQuestion !== questions.length - 1) {

            dispatch(updateQuestion({ question, index: curQuestion, note }))
        }
        else {
            dispatch(addQuestion({ question, note }))
        }
        if (curQuestion < maxQuestions) setCurQuestion(c => c + 1)
        return
    }


    const submitTheExam = async () => {

        if (questions[maxQuestions].question === "") {
            Swal.fire("please Save the last Question")
            return false
        }
        else if (subjectName === "") {
            Swal.fire("Please enter subject name before submitting")
            return false
        } else if (!notes.some(note => note.length !== 0)) {
            Swal.fire("Please enter atleast one note before submitting")
            return false
        }



        dispatch(showFullScreenLoader(true))

        const newNotes = notes.filter(note => note !== "")

        dispatch(changeIsLoading(true))
        const res = await teacherPostReq("Exam", { "subjectName": subjectName, "questions": questions, "notes": newNotes })
        dispatch(changeIsLoading(false))


        dispatch(showFullScreenLoader(false))


        if (res.statusCode === 200) {
            Swal.fire(res.message)
            dispatch(initialiseNewExam())
            return navigate("/teacher/Dashboard")
        }
        else if (res.statusCode === 401) {
            Swal.fire("your login session has expired")
            return dispatch(updateTokenValidation())
        }
        else {
            return Swal.fire(res.message)

        }
    }




    if (!isTokenValid) {
        dispatch(initialiseNewExam())
        Swal.fire("your session is expired new Exam")
        localStorage.clear()

        navigate("/Login", { replace: true })
    }




    return (<>

        <div>
            {
                curQuestion === -1 ? subjectForm :
                    <>
                        <h5>question:{curQuestion + 1}</h5>
                        <EditingForm
                            question={questions[curQuestion]}
                            note={notes[curQuestion]}
                            submitBtnText={curQuestion !== questions.length - 1 ? "Update" : "save"}
                            onSuccessAction={changeQuestion}
                            key={curQuestion}
                            creatingNewExam={true}
                            subjectName={subjectName}
                            allQuestions={questions}
                            queIndex={curQuestion}
                        />

                    </>

            }

            {
                curQuestion === maxQuestions &&
                <>
                    <button className="btn btn-danger" onClick={submitTheExam}>Submit and Save Exam</button>
                </>
            }



            <h5>PAgination</h5>

            <div style={{ display: "flex" }}>

                <nav aria-label="...">
                    <ul className="pagination pagination-lg">
                        <li
                            key={-1}
                            className={curQuestion === -1 ? "page-item active" : "page-item"}
                            onClick={() => setCurQuestion(-1)}
                            aria-current="page"
                            style={{ cursor: "pointer" }}
                        >
                            <span className="page-link">sub</span>
                        </li>
                        {
                            questions.map((cur, i) => {
                                console.log("yes", i === curQuestion)
                                return <li
                                    key={i}
                                    className={i == curQuestion ? "page-item active" : "page-item"}
                                    // className="page-item active"

                                    onClick={() => setCurQuestion(i)}
                                    aria-current="page"
                                    style={{ cursor: "pointer" }}
                                >
                                    <span className="page-link">{i + 1}</span>
                                </li>
                            })
                        }
                    </ul>
                </nav>
                <div className="mx-2">
                    <button className="btn btn-danger"
                        onClick={() => setCurQuestion(c => c - 1)}
                        disabled={curQuestion === -1}
                    >prev</button>
                    <button className="btn btn-info mx-1"

                        onClick={() => setCurQuestion(c => c + 1)}
                        disabled={curQuestion === maxQuestions || curQuestion === questions.length - 1}
                    >Next</button>
                </div>
            </div>

        </div>
    </>
    )
}

export default CreateExamLayout

