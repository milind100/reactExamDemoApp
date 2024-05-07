import { createSlice } from "@reduxjs/toolkit";

const emptyQuestion = {
  question: "",
  answer: "",
  options: ["", "", "", ""],
};
const initialState = {
  isTokenValid: true,
  isLoading: false,
  subjectName: "",
  questions: [emptyQuestion],
  notes: [""],
};
const maxindex = 14;

const createNewExam = createSlice({
  name: "createNewExam",
  initialState,
  reducers: {
    initialiseNewExam: () => {
      return initialState;
    },
    addQuestion: (state, action) => {
      const { question, note } = action.payload;
      let index = state.questions.length - 1;
      state.questions[index] = { ...question };
      state.notes[index] = note;
      if (index < maxindex) state.questions.push(emptyQuestion);
      state.notes.push("");
    },
    updateQuestion: (state, action) => {
      const { index, question, note } = action.payload;

      state.questions[index] = question;
      state.notes[index] = note;
    },
    updateSubjectName: (state, action) => {
      state.subjectName = action.payload;
    },
    updateTokenValidation: (state) => {
      state.isTokenValid = false;
    },
    changeIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const {
  addQuestion,
  updateQuestion,
  // updateSubjectName,
  initialiseNewExam,
  updateTokenValidation,
  changeIsLoading,
} = createNewExam.actions;
export default createNewExam.reducer;
