import { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import { initializeExamListState } from '../../Redux/Teacher/teachersExamsSlice'
import { initializeSelectedExamState } from '../../Redux/Teacher/teacherSelectedExam'
import { initialiseNewExam } from '../../Redux/Teacher/teacherNewExam'
import { initialiseAllStudentsList } from '../../Redux/Teacher/teachersStudentsList'
import { useDispatch } from 'react-redux'

import { LuLayoutDashboard } from "react-icons/lu"
import { PiStudentBold } from "react-icons/pi"
import { CgProfile } from "react-icons/cg"




const navItems = [
    {
        to: "Dashboard",
        name: "Dashboard",
        icon: <LuLayoutDashboard className="icon" size={30} />
    },
    {
        to: "Students",
        name: "Students",
        icon: <PiStudentBold className="icon" size={30} />
    },
    {
        to: "Profile",
        name: "Profile",
        icon: < CgProfile className="icon" size={30} />
    },

]


const TeacherLayout = ({ children }) => {

    const dispatch = useDispatch()

    const role = localStorage.getItem("role")

    useEffect(() => {
        //This is for initialising all the reducers token and initial state after login to set isToken valid true
        dispatch(initializeExamListState())
        dispatch(initializeSelectedExamState())
        dispatch(initialiseNewExam())
        dispatch(initialiseAllStudentsList())

    }, [])




    return (
        <>
            <Sidebar navItems={navItems} />

            <section className="home" style={{
                padding: "20px",
                width: "100%",
            }}>
                {/* <div className="text">Dashboard Sidebar</div> */}
                <h1>Teacher DashBoard</h1>
                <div style={{
                    width: "80%",
                    height: "95vh",
                    padding: "50px 50px",
                    marginTop: "10px",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 20px 35px rgba(0, 0, 0, 0.1)",
                }}>

                    {/* <TeacherDashboard /> */}
                    {
                        role == "teacher" ?
                            <Outlet /> :
                            <Navigate to="/login" replace />
                    }


                </div>

            </section >
        </>
    )
}

export default TeacherLayout