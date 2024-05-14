"react"
import "./questionFrom.css"

const intialQuestion = {
    "options": ["", "", "", ""],
    "_id": "",
    "question": ""
}

const QuestionForm = ({ examQuestion = intialQuestion, subjectName = "Subject Name", answer, changeAnswer, index, children }) => {

    const { question, options, _id } = examQuestion



    const handleChange = (option) => {
        changeAnswer(_id, option)
    }

    return (
        <div className="questionFrom">

            <h1 className="text-center">{subjectName}</h1>
            <div className="question">
                <p>
                    <strong>Question {index}:</strong> {question}
                </p>
            </div>
            <ul className="options">
                {
                    options?.map((option, index) => {
                        return <li className="option"
                            key={index}
                            onClick={() => handleChange(option)}
                            style={{ cursor: 'pointer' }}
                        >
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name={question}
                                id={option}
                                value={option}
                                checked={option === answer}
                                onChange={(e) => console.log(e.target.id)}
                            />
                            <label className="form-check-label" htmlFor={option} data-label="A">
                                {option}
                            </label>
                        </li>
                    })
                }
            </ul>
            {children}


        </div>
    )
}

export default QuestionForm