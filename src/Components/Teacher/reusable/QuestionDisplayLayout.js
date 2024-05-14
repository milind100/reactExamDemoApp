
const QuestionDisplayLayout = ({ subjectName, question }) => {
    return (
        <div>
            <div className="card-body p-2 p-md-2 p-xl-6">
                <div className="text-center mb-2-3 mb-lg-6">
                    <h2 className="h1 mb-0 text-secondary">
                        {subjectName}
                    </h2>
                </div>

                <div className="d-flex  m-3">
                    <div className="card mb-3" style={{ width: "90%", marginRight: 30 }}>
                        <div className="card-header" >
                            <h5 className="mb-0">
                                {/* <span className="text-theme-secondary me-2">{currentQuestion + 1}</span> */}
                                {question?.question}
                            </h5>
                        </div>
                    </div>
                </div>

                {
                    question?.options?.map((option, i) => {
                        return (
                            <div className="d-flex  m-3" key={i}>
                                <div className="card mx-5" style={{ width: "80%" }}>
                                    <div className="card-header" id="headingFive">
                                        <h5 className="mb-0">
                                            <span className="text-theme-secondary me-2">{i + 1}).</span>
                                            {option}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


                <div className="d-flex  m-3">
                    <div className="card mb-3" style={{ width: "90%", marginRight: 30 }}>
                        <div className="card-header" >
                            <h5 className="mb-0">

                                <span className="text-theme-secondary me-2">Answer:</span>
                                {question?.answer}
                            </h5>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default QuestionDisplayLayout



