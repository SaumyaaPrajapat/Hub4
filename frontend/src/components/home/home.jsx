import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"));

    if (!token) {
      //navigate("/login");
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        token.split("=")[1]
      }`;
    }
  }, [navigate]);

  return (
    <div>
      <SideNavbar />
    </div>
  );
};

export default App;
