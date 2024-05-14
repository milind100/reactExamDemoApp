import { useSelector } from "react-redux"


const PreviewTest = ({ viewQuestion, children }) => {


    const { isTokenValid,
        isLoading,
        subjectName,
        subjectId,
        examPaper,
        answerSheet
    } = useSelector(state => state.TakeTest)

    const QuestionAndAnswer = answerSheet.map(answerSheet => {
        let question = examPaper.find(question => question._id === answerSheet.question)?.question
        return {
            question: question,
            answer: answerSheet.answer
        }
    })


    const handleView = (index) => {
        viewQuestion(index)
    }

    return (
        <div>
            <h1>{subjectName}</h1>
            <table className="table align-middle  p-5" style={{ widht: "50vw" }}>
                <thead className="bg-light">
                    <tr>
                        {/* <th>Number</th> */}
                        <th>index</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {QuestionAndAnswer?.length === 0 ? <h4>no answers to show</h4> :

                        QuestionAndAnswer?.map((curQuestion, index) => {
                            const { question, answer } = curQuestion

                            return (
                                <tr key={index}>
                                    <td>
                                        <p className="fw-normal mb-1">{index + 1}</p>
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">{question}</p>
                                    </td>
                                    <td>
                                        <p className="fw-normal mb-1">{answer}</p>
                                    </td>

                                    <td>
                                        <button type="button"
                                            className="btn btn-warning btn-sm btn-rounded"
                                            onClick={() => handleView(index)}
                                        >
                                            Edit
                                        </button>

                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>
            {children}
        </div>
    )
}

export default PreviewTest