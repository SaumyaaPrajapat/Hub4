import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import blogo from "../img/Logo.png";
import { FaUserCircle, FaUserCheck, FaUserFriends } from "react-icons/fa";
import "./choose.css";

const Choose = () => {
  const [isHoveredSignUp, setIsHoveredSignUp] = useState(false);
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const buttonStyle = {
    marginTop: "0",
    marginRight: "10px",
    borderRadius: "12px",
    color: "#000000",
    border: "2px solid transparent",
    transition: "border 0.3s",
    fontWeight: "500",
    fontSize: "1rem",
  };

  const buttonHoverStyle = {
    border: "2px solid #000000",
  };
  return (
    <div className="cardStyle">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ top: 0 }}>
        <div className="BAR">
          <Link to="/" className="navbar-brand">
            <img
              src={blogo}
              style={{ height: "150%", marginLeft: "15%" }}
              alt="Logo"
            />
          </Link>
          <div className="d-flex">
            <ul
              className="navbar-nav"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <li className="nav">
                <Link
                  to="/choose"
                  className="nav-link btn btn-outline rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredSignUp ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredSignUp(true)}
                  onMouseLeave={() => setIsHoveredSignUp(false)}
                >
                  Get started
                </Link>
              </li>
              <li className="nav">
                <Link
                  to="/login"
                  className="nav-link btn btn-size-10 rounded-10"
                  style={{
                    ...buttonStyle,
                    ...(isHoveredLogin ? buttonHoverStyle : {}),
                  }}
                  onMouseEnter={() => setIsHoveredLogin(true)}
                  onMouseLeave={() => setIsHoveredLogin(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="choose-card">
        <div className="flex-containers">
          <div className="choose-box" onClick={() => navigate("/login")}>
            <div className="custom-headings">
              <div className="choose-circles">
                <FaUserCircle className="choose-profile" />
              </div>
              <h4>
                <strong>Admin</strong>
              </h4>
            </div>
            <div className="flex-row">
              <h5>
                Login as an administrator to access the dashboard to manage app
                data.
              </h5>
            </div>
          </div>

          <div className="choose-box" onClick={() => navigate("/login")}>
            <div className="custom-headings">
              <div className="choose-circles">
                <FaUserCheck className="choose-profile" />
              </div>
              <h4>
                <strong>User</strong>
              </h4>
            </div>
            <div className="flex-row">
              <h5>
                Login as an user to manage the employees and category and to
                keep the track.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
