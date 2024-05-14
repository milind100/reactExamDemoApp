import { useDispatch, useSelector } from "react-redux"
import {
    useLocation, useParams, useNavigate,
    // unstable_useBlocker as useBlocker 
} from "react-router-dom"
import QuestionForm from "./ExamComponets/QuestionForm"
import { useEffect } from "react"
import {
    getTestPaper,
    initialiseTest,
    initialiseTestSub,
    changeAnswerInSheet,
    changeLoadingStatus,
    changeTokenValidation,
    // changeExamNotFInishedStatus
} from "../../Redux/Student/takeTestSlice"
import Swal from "sweetalert2"
import SubLoader from "../../reusable/SubLoader"
import { useState } from "react"
import PreviewTest from "./ExamComponets/PreviewTest"
import { studentPostReq } from "../../Api/studentApi"

const TakeTest = () => {
    const { id } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { isTokenValid,
        examNotFInished,
        isLoading,
        subjectName,
        subjectId,
        examPaper,
        answerSheet
    } = useSelector(state => state.TakeTest)




    const [page, setPage] = useState(0)
    const [previewMode, setPreviewMode] = useState(false)


    useEffect(() => {

        dispatch(initialiseTestSub({ id, subjectName: state.subjectName }))
        dispatch(getTestPaper(id))

    }, [])


    const viewQuestion = (index) => {
        setPage(index)
        setPreviewMode(false)
    }

    const changeAnswer = (id, answer) => {
        dispatch(changeAnswerInSheet({ id, answer }))
    }



    const handleFinalSubmit = async () => {
        dispatch(changeLoadingStatus(true))

        const res = await studentPostReq(`giveExam?id=${subjectId}`, answerSheet)

        dispatch(changeLoadingStatus(false))

        console.log("examajofjaf", examNotFInished)


        if (res.statusCode === 200) {
            Swal.fire(res.message)
            dispatch(initialiseTest())
            return navigate("/student/Dashboard")
        }
        else if (res.statusCode === 401) {
            Swal.fire("your login session has expired")
            return dispatch(changeTokenValidation(false))
        }
        else {
            return Swal.fire(res.message)
        }
    }


    // useBlocker(() => {
    //     if (examNotFInished) {
    //       return (!window.confirm("your exam is unfinished if you leave your exam will be submitted"))
    //     }

    //     return false
    // })





    // if (!isTokenValid) {
    //     dispatch(initialiseTest())
    //     Swal.fire("your session is expired Dashboard")
    //     localStorage.clear()
    //     navigate("/Login", { replace: true })
    // }


    return (<>
        {isLoading ?
            <SubLoader />
            : previewMode ?
                <PreviewTest viewQuestion={viewQuestion} >
                    <button className="btn btn-success mt-3"
                        onClick={handleFinalSubmit}
                    >Submit the Exam</button>
                </PreviewTest> :
                <>
                    <div>
                        <QuestionForm
                            index={page + 1}
                            subjectName={subjectName}
                            examQuestion={examPaper[page]}
                            answer={answerSheet[page]?.answer}
                            changeAnswer={changeAnswer}
                        >

                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => setPage(p => p + 1)}
                                disabled={page === 6}

                            >Next Question</button>

                            <button className="btn btn-warning mt-3"
                                onClick={() => setPage(p => p - 1)}
                                disabled={page === 0}
                            >Previous Question</button>

                        </QuestionForm>
                        <button className="btn btn-dark mt-3"
                            onClick={() => setPreviewMode(true)}
                            disabled={page !== 6}
                        >Submit and Review</button>
                        <hr />
                        <br />

                        <div style={{ display: "flex" }}>

                            <nav aria-label="...">
                                <ul className="pagination pagination-lg">
                                    {
                                        examPaper?.map((cur, i) => {
                                            return <li
                                                key={i}
                                                className={i === page ? "page-item active" : "page-item"}
                                                onClick={() => setPage(i)}
                                                aria-current="page"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <span className="page-link">{i + 1}</span>
                                            </li>
                                        })
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </>
        }
    </>
    )
}

export default TakeTest



