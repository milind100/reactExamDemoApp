import { createSlice } from "@reduxjs/toolkit";


const emptyQuestion = {
    question: "",
    answer: "",
    options: [
        "",
        "",
        "",
        ""
    ]
}
const initialState = false

const fullScreenLoader = createSlice({
    name: "showHideFullScreenLoader",
    initialState,
    reducers: {
        initialiseLoader: () => {
            return initialState
        },
        showFullScreenLoader: (state, action) => {
            return action.payload
        },

    }
})

export const { initialiseLoader, showFullScreenLoader } = fullScreenLoader.actions
export default fullScreenLoader.reducer


