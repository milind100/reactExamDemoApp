

import { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'

import { initialiseStudentsExams } from '../../Redux/Student/allExamsForStudent'
import { initialiseTest } from '../../Redux/Student/takeTestSlice'

import { LuLayoutDashboard } from "react-icons/lu"

import { CgProfile } from "react-icons/cg"


const navItems = [
    {
        to: "Dashboard",
        name: "Dashboard",
        icon: <LuLayoutDashboard className="icon" size={30} />
    },
    {
        to: "Profile",
        name: "Profile",
        icon: <CgProfile className="icon" size={30} />
    },

]




const StudentLayout = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    useEffect(() => {
        //This is for initialising all the reducers token and initial state after login to set isToken valid true
        dispatch(initialiseStudentsExams())
        dispatch(initialiseTest())
    }, [])

    return (
        <>
            <Sidebar navItems={navItems} />

            <section className="home" style={{
                padding: "20px",
                width: "100%",
            }}>
                {/* <div className="text">Dashboard Sidebar</div> */}
                <h1>Student DashBoard</h1>
                <div style={{
                    width: "80%",
                    height: "100vh",
                    padding: "50px 50px",
                    marginTop: "10px",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 20px 35px rgba(0, 0, 0, 0.1)",
                }}>

                    {/* <TeacherDashboard /> */}
                    {
                        role === "student" ?
                            <Outlet /> :
                            <Navigate to="/login" replace />
                    }

                </div>

            </section >
        </>
    )
}

export default StudentLayout