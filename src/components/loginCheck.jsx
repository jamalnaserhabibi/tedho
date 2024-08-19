import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Check = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      nav("/");
    }
  }, []);
};

export default Check;
