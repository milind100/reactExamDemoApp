import { useParams, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getExamData } from "../../Redux/Teacher/teacherSelectedExam"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import QuestionDisplayLayout from "./reusable/QuestionDisplayLayout"
import { updateTheExam, initializeSelectedExamState } from "../../Redux/Teacher/teacherSelectedExam"
import EditingForm from "./reusable/EditingForm"

const maxQuestions = 14

const EditExamPage = () => {
   

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const { id } = useParams()

    const [editMode, setEditMode] = useState(false)

    const { isLoading, questions, isTokenValid, isUpdating } = useSelector(state => state.teacherSelectedExam)


    const [currentQuestion, setCurrentQuestion] = useState(0)



    useEffect(() => {
        dispatch(getExamData(id))
    }, [])


    const saveEditedQuestion = (questionObj) => {
        // dispatch(saveSelectedQuestion({ questionIndex, questionObj }))
        dispatch(updateTheExam({ questionIndex: currentQuestion, questionObj, subjectName: state.subjectName, id }))
        setEditMode(false)
        // dispatch(updateTheExam(questionIndex))
    }




    if (!isTokenValid) {
        dispatch(initializeSelectedExamState())
        // return navigate("/Login", { replace: true });
        Swal.fire("your session is expired read Exam")
        localStorage.clear()
        navigate("/Login", { replace: true })

    }



    return (
        <>
            {isLoading ? <h1>Loading........</h1> :
                isUpdating ?
                    < h1 > Updating........</h1 > :
                    <>
                        this componet is question layout
                        {
                            editMode ?
                                <EditingForm subjectName={state?.subjectName} question={questions[currentQuestion]}
                                    onSuccessAction={saveEditedQuestion} submitBtnText={"Save"} allQuestions={questions}
                                    queIndex={currentQuestion}
                                /> :
                                <QuestionDisplayLayout subjectName={state?.subjectName} question={questions[currentQuestion]} />

                        }


                        <div className="m-2">
                            {/* <button className="btn btn-warning mx-3" disabled>Save</button> */}
                            <button className="btn btn-warning"
                                onClick={() => setEditMode(!editMode)}
                            >{editMode ? "cancel" : "Edit"}</button>
                        </div>
                        {!editMode &&
                            <div style={{ display: "flex" }}>

                                <nav aria-label="...">
                                    <ul className="pagination pagination-lg">
                                        {
                                            questions?.map((cur, i) => {
                                                return <li
                                                    key={i}
                                                    className={i === currentQuestion ? "page-item active" : "page-item"}
                                                    onClick={() => setCurrentQuestion(i)}
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
                                        onClick={() => setCurrentQuestion(c => c - 1)}
                                        disabled={currentQuestion === 0}
                                    >prev</button>
                                    <button className="btn btn-info mx-1"

                                        onClick={() => setCurrentQuestion(c => c + 1)}
                                        disabled={currentQuestion === maxQuestions}
                                    >Next</button>
                                </div>
                            </div>
                        }
                    </>
            }
        </>
    )
}

export default EditExamPage








