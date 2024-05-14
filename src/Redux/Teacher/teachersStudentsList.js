import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { teacherGetReq } from "../../Api/teacherApi";
import Swal from "sweetalert2";

const fetchStudentsList = createAsyncThunk(
    "teacher/allStudentsList",
    async () => {

        const res = await teacherGetReq("")

        if (res.statusCode === 200) {
            return res?.data
        }
        else {
            throw res.statusCode
        }



    }

)


const initialState = {
    isLoading: false,
    isTokenValid: true,
    studentsData: []
}

const allStudentsList = createSlice({
    name: "allStudentsList",
    initialState,
    reducers: {
        initialiseAllStudentsList: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentsList.pending, (state) => {
                if (state.studentsData.length === 0)
                    state.isLoading = true
            })
            .addCase(fetchStudentsList.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false
                state.studentsData = action.payload
            })
            .addCase(fetchStudentsList.rejected, (state, action) => {

                state.isLoading = false
                if (action.error.message === "401" || action.error.message === "500") {
                    localStorage.clear()
                    state.isTokenValid = false
                    state.studentsData = []

                    Swal.fire("Your token is invalid")
                }
                else {
                    Swal.fire("Students loading failed")
                }

            })
    }
})

export const { initialiseAllStudentsList } = allStudentsList.actions
export { fetchStudentsList }

export default allStudentsList.reducer