import { createSlice, createAsyncThunk, compose } from "@reduxjs/toolkit";
// import teacherGetReq from "../../Api/teacherGetReq";
// import teacherPutReq from "../../Api/teacherPutReq";
import { teacherGetReq, teacherPutReq } from "../../Api/teacherApi";

const getExamData = createAsyncThunk(
    "teacher/getExamQuestion",
    async (id) => {
        try {

            const { statusCode, message, data } = await teacherGetReq(`examDetail?id=${id}`);
            if (statusCode === 200) {
                return data.questions
            }
            if (statusCode === 401) {
                throw 401
            }
            // console.log(statusCode)
        }
        catch (err) {
            console.log(err)
            throw new Error(err)
        }
    }
)


const updateTheExam = createAsyncThunk(
    "teacher/updateExam",
    async (payload, { dispatch, getState }) => {
        try {
            const { questionIndex, questionObj, subjectName, id } = payload

            const state = getState().teacherSelectedExam
            const questions = [...state.questions]


            questions[questionIndex] = questionObj

            const finalObject = {
                subjectName: subjectName,
                questions: questions
            }



            const res = await teacherPutReq(`editExam?id=${id}`, finalObject)

            if (res.statusCode === 200) {
                return questions //here data coming from api is problem thats why we are send in or state directly
            } else if (res.statusCode === 400) {
                throw 401
            } else if (res.statusCode === 500) {
                throw 401
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
)

const initialState = {
    questions: [],
    isTokenValid: true,
    isLoading: false,
    isUpdating: false,
}



const teachersSelectedExam = createSlice({
    name: "teachersSelectedExam",
    initialState,
    reducers: {
        initializeSelectedExamState: (state) => {
            return initialState
        },
        // saveSelectedQuestion: (state, action) => {
        //     const { questionIndex, questionObj } = action.payload

        //     const newQuestions = [...state.questions]
        //     newQuestions[questionIndex] = questionObj

        //     state.questions = newQuestions

        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExamData.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getExamData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.questions = action.payload

            })

            .addCase(getExamData.rejected, (state, action) => {
                state.isLoading = false

                if (action.error.message == "401") {

                    localStorage.clear()
                    state.isTokenValid = false
                    // state.isTokenValid = false
                }

            })

            .addCase(updateTheExam.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateTheExam.fulfilled, (state, action) => {
                state.isUpdating = false
                state.questions = action.payload

                return state
            })
            .addCase(updateTheExam.rejected, (state, action) => {
                if (action.error.message == "401") {
                    localStorage.clear()
                    state.isTokenValid = false
                    // state.isTokenValid = false
                }
                state.isUpdating = false

            })


    }
})

export const { initializeSelectedExamState } = teachersSelectedExam.actions
export { getExamData, updateTheExam }
export default teachersSelectedExam.reducer