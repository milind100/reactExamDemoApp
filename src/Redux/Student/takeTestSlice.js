import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { studentGetReq } from "../../Api/studentApi"
import Swal from "sweetalert2";


const getTestPaper = createAsyncThunk(
    "student/getTestPaper",
    async (paperId) => {

        const res = await studentGetReq(`examPaper?id=${paperId}`)

        if (res.statusCode === 200) {
            return res.data
        }
        else {
            throw res.statusCode
        }
    }
)




const intialAnswerSheet = [
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" },
    { "question": "", "answer": "" }
]



const initialState = {
    isTokenValid: true,
    isLoading: false,
    subjectName: "",
    subjectId: "",
    examPaper: [""],
    answerSheet: intialAnswerSheet,
    examNotFInished: false
}



const takeTestSlice = createSlice({
    name: 'takeTest',
    initialState,
    reducers: {
        initialiseTest: () => {
            return initialState
        },
        initialiseTestSub: (state, action) => {

            const { id, subjectName } = action.payload

            return { ...state, subjectId: id, subjectName: subjectName }

        },
        changeAnswerInSheet: (state, action) => {
            const { id, answer } = action.payload
            const index = state.answerSheet.findIndex(answer => answer.question === id)

            state.answerSheet[index].answer = answer

        },
        changeLoadingStatus: (state, action) => {
            state.isLoading = action.payload
        },
        changeTokenValidation: (state, action) => {
            state.isTokenValid = action.payload
        },
        changeExamNotFInishedStatus: (state, action) => {
            state.examNotFInished = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTestPaper.pending, (state) => {
                state.isLoading = true

            })
            .addCase(getTestPaper.fulfilled, (state, action) => {
                state.isLoading = false
                const examPaper = action.payload
                const answerSheet = examPaper.map((question) => {
                    const { _id } = question
                    return {
                        question: _id,
                        answer: ""
                    }
                })

                state.answerSheet = answerSheet
                state.examPaper = examPaper
                state.examNotFInished = true
            })
            .addCase(getTestPaper.rejected, (state, action) => {
                if (action.error.message === "401" || action.error.message === "500") {
                    localStorage.clear()
                    state.examPaper = []
                    state.answerSheet = intialAnswerSheet
                    state.isTokenValid = false
                    Swal.fire("Your token is invalid")
                }
                else {
                    Swal.fire("Exam loading failed")
                }
                state.isLoading = false

            })
    }
})



export const { initialiseTest, initialiseTestSub, changeAnswerInSheet, changeLoadingStatus, changeTokenValidation, changeExamNotFInishedStatus } = takeTestSlice.actions
export { getTestPaper }
export default takeTestSlice.reducer