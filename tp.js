const routes = [
  {
    path: "/",
    element: <Navigate to="/Login" replace={true} />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <SignUp />,
  },
  {
    path: "/ForgotPasswordEmail",
    element: <ForgotPasswordEmail />,
  },
  {
    path: "/newPassword/*",
    element: <NewPasswordEmailLink />,
  },
  {
    path: "/teacher/*",
    element: <TeacherLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="Dashboard" replace={true} />,
      },
      {
        path: "Dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "Dashboard/editExam/:id",
        element: <EditExamPage />,
      },
      {
        path: "Profile",
        element: <UserPasswordResetPage />,
      },
      {
        path: "Dashboard/CreateExam",
        element: <CreateExamLayout />,
      },
      {
        path: "Students",
        element: <StudentsListLayout />,
      },
      {
        path: "Students/:id",
        element: <SelectedStudent />,
      },
      {
        path: "*",
        element: (
          <div>
            <h1>Page Not Found</h1>
          </div>
        ),
      },
    ],
  },
  {
    path: "/student/*",
    element: <StudentLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="Dashboard" replace={true} />,
      },
      {
        path: "Dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "Dashboard/takeTest/:id",
        element: <TakeTest />,
      },
      {
        path: "Profile",
        element: <StudentProfile />,
      },
      {
        path: "*",
        element: (
          <div>
            <h1>Page Not Found</h1>
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div>
        <h1>Not Found</h1>
      </div>
    ),
  },
];

export default routes;
