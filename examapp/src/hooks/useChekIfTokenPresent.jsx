import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useChekIfTokenPresent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
  });
};

export default useChekIfTokenPresent;
