import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import teacherGetReq from "../../Api/teacherGetReq"
// import teacherExamDeleteReq from "../../Api/teacherDeleteReq";
import { teacherExamDeleteReq, teacherGetReq } from "../../Api/teacherApi";
import Swal from "sweetalert2";



const fetchTeachersExamsList = createAsyncThunk(
    "teacher/fetchExamsList",
    async () => {


        const res = await teacherGetReq("/viewExam")



        if (res.statusCode === 200) {
            return res.data
        }
        if (res.statusCode === 401) {
            throw res.statusCode
        } else {
            throw res.statusCode
        }
        // }
    })



const deleteTeachersExam = createAsyncThunk(
    "teacher/deleteExam",
    async (id) => {

        const res = await teacherExamDeleteReq("deleteExam", id)

        if (res.statusCode === 200) {
            return id
        }
        else {
            throw res.statusCode
        }


    }
)



const initialState = {
    isLoading: false,
    isTokenValid: true,
    exams: []
}


const teachersExamsList = createSlice({
    name: "teachersExamsList",
    initialState,
    reducers: {
        initializeExamListState: (state) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachersExamsList.pending, (state) => {
                if (state.exams.length === 0)
                    state.isLoading = true

            })
            .addCase(fetchTeachersExamsList.fulfilled, (state, action) => {
                state.isLoading = false
                state.exams = action.payload
            })
            .addCase(fetchTeachersExamsList.rejected, (state, action) => {

                if (action.error.message === "401" || action.error.message === "500") {
                    localStorage.clear()
                    Swal.fire("Your token is invalid")
                    state.isTokenValid = false
                    state.exams = []
                    state.isLoading = false
                    // state.isTokenValid = false
                }
                state.isLoading = false

            })



            // Deleting the exam api 

            .addCase(deleteTeachersExam.pending, (state) => {
                // if (state.exams.length === 0) 
                state.isLoading = true

            })
            .addCase(deleteTeachersExam.fulfilled, (state, action) => {
                const id = action.payload

                Swal.fire("exam Deleted Successfully")
                const newExams = state.exams.filter(exam => exam._id !== id)
                state.isLoading = false
                state.exams = newExams
            })
            .addCase(deleteTeachersExam.rejected, (state, action) => {

                state.isLoading = false
                if (action.error.message === "401" || action.error.message === "500") {
                    localStorage.clear()
                    state.isTokenValid = false
                    state.exams = []
                    state.isLoading = false
                    Swal.fire("Your token is invalid")
                }
                else {
                    Swal.fire("exam deletion failed")
                    return state
                }
            })
    }


})
export const { initializeExamListState } = teachersExamsList.actions
export { fetchTeachersExamsList, deleteTeachersExam }
export default teachersExamsList.reducer