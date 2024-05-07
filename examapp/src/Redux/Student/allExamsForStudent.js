import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studentGetReq } from "../../Api/studentApi";
import Swal from "sweetalert2";


const getAllExams = createAsyncThunk(
    "student/getAllExams",
    async () => {

        const res = await studentGetReq("studentExam")

        if (res.statusCode === 200) {
            return res.data
        }
        else {
            throw res.statusCode
        }

    }
)







const initialState = {
    exams: [],
    isTokenValid: true,
    isLoading: false,
}



const allExamsForStudent = createSlice({
    name: "allExamsForStudent",
    initialState,
    reducers: {
        initialiseStudentsExams: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllExams.pending, (state) => {
                if (state.exams.length === 0)
                    state.isLoading = true

            })
            .addCase(getAllExams.fulfilled, (state, action) => {
                state.exams = action.payload
                state.isLoading = false
            })
            .addCase(getAllExams.rejected, (state, action) => {

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
    }

})



export const { initialiseStudentsExams } = allExamsForStudent.actions
export { getAllExams }

export default allExamsForStudent.reducer