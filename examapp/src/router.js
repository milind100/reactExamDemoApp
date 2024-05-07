import SignUp from './Components/User/SignUp';
import Login from './Components/User/Login';
import ForgotPasswordEmail from './Components/User/ForgotPasswordEmail';
import NewPasswordEmailLink from './Components/User/NewPasswordEmailLink';
import UserPasswordResetPage from './Components/User/UserPasswordResetPage';

import TeacherLayout from './Components/Teacher/TeacherLayout';
import TeacherDashboard from './Components/Teacher/TeacherDashboard';
import EditExamPage from './Components/Teacher/EditExamPage';
import CreateExamLayout from './Components/Teacher/CreateExamLayout';
import StudentsListLayout from './Components/Teacher/StudentsListLayout';
import SelectedStudent from './Components/Teacher/SelectedStudent';

import StudentLayout from './Components/Student/StudentLayout';
import StudentDashboard from './Components/Student/StudentDashboard';
import StudentProfile from './Components/Student/StudentProfile';
import TakeTest from './Components/Student/TakeTest';
import { Navigate } from 'react-router-dom';

import useCheackIfUserLogin from './hooks/useCheackIfUserLogin';
import useChekIfTokenPresent from './hooks/useChekIfTokenPresent';


const UserComponent = ({ children }) => {
    useCheackIfUserLogin()
    return (<>
        {children}
    </>
    )
}


const ShowIfTokenPresent = ({ children }) => {
    useChekIfTokenPresent()
    return <>{children}</>
}



const routerArray = [
    {
        path: '/',
        element: <Navigate to="/Login" replace={true} />,
    },
    {
        path: '/Login',
        element: <UserComponent><Login /></UserComponent >,
    },

    {
        path: '/Signup',
        element: <UserComponent><SignUp /></UserComponent >,
    },
    {
        path: '/ForgotPasswordEmail',
        element: <UserComponent><ForgotPasswordEmail /></UserComponent >,
    },
    {
        path: '/newPassword/*',
        element: <UserComponent><NewPasswordEmailLink /></UserComponent >,
    },
    {
        path: '/teacher/*',
        element: <ShowIfTokenPresent> <TeacherLayout /></ShowIfTokenPresent>,
        children: [
            {
                index: true,
                element: <Navigate to="Dashboard" replace={true} />,
            },
            {
                path: 'Dashboard',
                element: <TeacherDashboard />,
            },
            {
                path: 'Dashboard/editExam/:id',
                element: <EditExamPage />,
            },
            {
                path: 'Profile',
                element: <UserPasswordResetPage />,
            },
            {
                path: 'Dashboard/CreateExam',
                element: <CreateExamLayout />,
            },
            {
                path: 'Students',
                element: <StudentsListLayout />,
            },
            {
                path: 'Students/:id',
                element: <SelectedStudent />,
            },
            {
                path: '*',
                element: <div><h1>Page Not Found</h1></div>,
            },
        ],
    },
    {
        path: '/student/*',
        element: <ShowIfTokenPresent><StudentLayout /></ShowIfTokenPresent>,
        children: [
            {
                index: true,
                element: <Navigate to="Dashboard" replace={true} />,
            },
            {
                path: 'Dashboard',
                element: <StudentDashboard />,
            },
            {
                path: 'Dashboard/takeTest/:id',
                element: <TakeTest />,
            },
            {
                path: 'Profile',
                element: <StudentProfile />,
            },
            {
                path: '*',
                element: <div><h1>Page Not Found</h1></div>,
            },
        ],
    },
    {
        path: '*',
        element: <div><h1>Not Found</h1></div>,
    },
]
export default routerArray