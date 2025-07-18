import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔸 Token delete karo
    localStorage.removeItem("token");

    // 🔸 Login page pe redirect karo
    navigate("/IsLoggedIn"); // ya "/" agar homepage chahiye
  }, [navigate]);

  return null; // Kuch UI show nahi karna
};

export default Logout;
