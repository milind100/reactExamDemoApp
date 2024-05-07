import { configureStore } from "@reduxjs/toolkit";

import teachersExamsList from "./Teacher/teachersExamsSlice";
import teacherSelectedExam from "./Teacher/teacherSelectedExam";
import createNewExam from "./Teacher/teacherNewExam"
import allStudentsList from "./Teacher/teachersStudentsList"

import allExamsForStudent from "./Student/allExamsForStudent";
import takeTestSlice from "./Student/takeTestSlice";

import fullScreenLoader from "./fullScreenLoader";

const store = configureStore({
    reducer: {
        teachersExamsList: teachersExamsList,
        teacherSelectedExam: teacherSelectedExam,
        createNewExam: createNewExam,
        allStudentsList: allStudentsList,

        allExamsForStudent: allExamsForStudent,
        TakeTest: takeTestSlice,
        fullScreenLoader: fullScreenLoader
    }
})

export default store