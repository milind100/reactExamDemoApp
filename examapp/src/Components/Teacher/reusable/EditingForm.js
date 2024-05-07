import { useState } from "react"
import Swal from "sweetalert2"


const defaultQuestion = {
    "options": [
        "",
        "",
        "",
        ""
    ],
    "question": "",
    "answer": ""
}

const arry = ["a", "b", "c", "d"]

const initialErrors = { question: "", options: ["", "", "", ""] }

const EditingForm = ({ question = defaultQuestion,
    note = "",
    submitBtnText,
    onSuccessAction,
    creatingNewExam,
    subjectName,
    allQuestions,
    queIndex,
    children }) => {


    const [not, setNot] = useState(note ? note : "")

    const [questionState, setQuestionState] = useState(question)

    const [errors, setErrors] = useState(initialErrors)



    const handleReset = () => {
        setQuestionState(question)
        setErrors(initialErrors)
    }

    const handleSubmit = () => {

        if (valiDateForm({ questionState, errors })) {
            const questionObj = {
                options: questionState.options,
                question: questionState.question,
                answer: questionState.answer
            }
            onSuccessAction(questionObj, not)
        } else {
            return false
        }
    }
    const handleQuestionChange = (e) => {

        setQuestionState(q => ({ ...q, question: e.target.value }))
        let error = ValidateQuestion({ value: e.target.value, type: "question", allQuestions, queIndex })
        setErrors(er => ({ ...er, question: error }))
    }


    const changeOption = (e, index) => {


        setQuestionState(q => ({ ...q, answer: "" }))


        const newOptions = [...questionState.options]
        newOptions[index] = e.target.value

        setQuestionState(q => ({ ...q, options: newOptions }))


        const optionErrors = newOptions.map((option, i) =>
            ValidateQuestion({ value: option, type: "option", options: newOptions, queIndex })
        );
        console.log("Errors", optionErrors)
        setErrors({ ...errors, options: optionErrors })
    }


    return (
        <div>
            <div>
                <div className="card-body p-2 p-md-2 p-xl-6">
                    <div className="text-center mb-2-3 mb-lg-6">
                        <h4 className="h4 mb-0 text-secondary">
                            SubjectName: {subjectName ? subjectName : "not set"}
                        </h4>
                    </div>
                    <div className="d-flex  m-3">
                        <div className="card mb-3" style={{ width: "90%", marginRight: 30 }}>
                            <div className="card-header" >

                                {/* <span className="text-theme-secondary me-2">{currentQuestion + 1}</span> */}
                                <label htmlFor="exampleInputEmail1">Question</label>


                                <input type="text" className="form-control" value={questionState.question}
                                    onChange={(e) => handleQuestionChange(e)}
                                />
                                <label htmlFor="" style={{ color: "red" }}>{errors.question}</label>

                            </div>
                        </div>
                    </div>

                    {
                        questionState?.options?.map((option, i) => {

                            return (
                                <div className="d-flex  m-0" key={i}>
                                    {arry[i]}
                                    <div className="card mx-5" style={{ width: "80%" }}>
                                        <div className="card-header d-flex" id="headingFive">
                                            <input type="text" className="form-control" value={option}
                                                onChange={(e) => { changeOption(e, i) }}
                                            />

                                            <input
                                                className="form-check-input mx-5"
                                                type="radio"
                                                name="answer"
                                                id={"answer"}
                                                // value={option}
                                                checked={questionState.options[i] === questionState.answer}
                                                // onChange={(e) => console.log(e.target.id)}
                                                onChange={(e) => {

                                                    setQuestionState(q => ({ ...q, answer: option }))
                                                }}
                                            />
                                            <label htmlFor="" style={{ color: "red", width: "40%" }}>{errors.options[i]}</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* onChange={(e) => setInputs({ ...inputs, answer: e.target.value })} */}
                    <div className="d-flex  m-3">
                        <div className="card mb-3" style={{ width: "90%", marginRight: 30 }}>
                            <div className="card-header" >

                                <span className="text-theme-secondary me-2">Answer:</span>
                                <label htmlFor="">{questionState.answer}</label>
                                <br />
                                {
                                    creatingNewExam &&
                                    <>
                                        Note
                                        <input type="text" className="form-control"
                                            value={not}
                                            onChange={(e) => setNot(e.target.value)}
                                        />

                                    </>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="m-2">
                        <button className="btn btn-warning mx-3"
                            onClick={(e) => handleReset()}
                        >reset</button>
                        <button className="btn btn-info mx-3"
                            onClick={(e) => handleSubmit(e)}
                        >{submitBtnText}</button>
                        {/* <button className="btn btn-danger mx-3"
                            onClick={() => setEditMode(false)}
                        >Cancel</button> */}
                        {children}
                    </div>
                </div >

            </div>
        </div>
    )
}

export default EditingForm



const valiDateForm = ({ questionState, errors }) => {

    const { question, answer, options } = questionState

    if (question.trim() === "") {
        Swal.fire("Please Enter Question")
        return false
    }
    else if (errors?.question?.length > 0) {
        Swal.fire("There was an error with Question")
        return false
    }
    else if (options.some(op => op.trim() === "")) {
        Swal.fire("Please fill options")
        return false
    }
    else if (errors?.options?.some(option => option?.length > 0)) {
        Swal.fire("There was an error with options")
        return false
    } else if (answer.trim() === "") {
        Swal.fire("Please Select the Answer")
        return false
    }
    else {
        return true
    }

}

function ValidateQuestion({ value, type, allQuestions, options, queIndex }) {

    switch (type) {
        case "question":

            if (value == "") {
                console.log(("Empty"))
                return "please fill the Question"
            }

            if (allQuestions.some(que => que.question === value)) {
                const dupliIndex = allQuestions.findIndex(que => que.question === value)

                if (dupliIndex !== queIndex) {
                    return "This is Ducplicate question"
                }
            }


        case "option":
            if (value === "") {
                return "";
            }

            const duplicateOptions = options?.filter(
                (option, index) => option === value && index !== options?.indexOf(option)
            );
            return duplicateOptions?.length > 0 ? "This option is repeating" : "";


        default:
            return
    }
}