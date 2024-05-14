import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useCheackIfUserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    // const { role, token, email } = data;
    const role = data?.role;
    const token = data?.token;
    const email = data?.email;

    const usrRole = localStorage.getItem("role");
    const urstoken = localStorage.getItem("token");
    const usremail = localStorage.getItem("email");

    if (
      data === null ||
      usremail !== email ||
      urstoken !== token ||
      usrRole !== role
    ) {
      return;
    }

    Swal.fire(`You are alerady login as ${role} logout first`);

    if (role === "teacher") navigate("/teacher", { replace: true });
    if (role === "student") navigate("/student", { replace: true });
  }, []);
};

export default useCheackIfUserLogin;
