import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "../sidenavbar/sidenavbar";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [suc, setSuc] = useState();
  useEffect(() => {
    axios
      .get("https://hub4-back.vercel.app/home", { withCredentials: true })
      .then((result) => {
        console.log(result);
        if (result.data !== "Success") {
          setSuc("Successded OK");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SideNavbar />
      <p>{suc}</p>
    </div>
  );
};

export default App;
