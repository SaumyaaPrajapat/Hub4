import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("https://hub4-back.vercel.app/auth/home")
        .then((response) => {
          const user = response.data;
          setUserData(user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <div>
      <SideNavbar />
    </div>
  );
};

export default Home;
