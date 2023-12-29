import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      // Redirect to the login page if not authenticated
      navigate("/login");
    } else {
      // Include the token in the headers for authentication
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [navigate]);

  return (
    <div>
      <SideNavbar />
    </div>
  );
};

export default App;
