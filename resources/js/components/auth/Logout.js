import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Logout;
