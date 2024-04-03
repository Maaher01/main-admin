import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserlogin = () => {
    const checklogin = sessionStorage.getItem("authenticated");
    if (checklogin == "false" || checklogin == null) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserlogin();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};

export default ProtectedRoute;
