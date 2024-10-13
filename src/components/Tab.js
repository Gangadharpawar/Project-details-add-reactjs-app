import React, { useState } from "react";
// import "../assets/Tab.css";
import Dashboard from "./Dashboard";
import ProjectList from "./ProjectList";
import Project from "./Project";
// import Login from "./Login";
import Dashboarimg from "../assets/images/Dashboard.svg";
import projectlistimg from "../assets/images/Project-list.svg";
import createprojectimg from "../assets/images/create-project.svg";
import logoutimg from "../assets/images/Logout.svg";
import { useNavigate } from "react-router-dom";
const Tab = () => {
  const [tabindex, SetTabIndex] = useState(0);
  const naviagate = useNavigate();
  return (
    <>
      <span className="tabs">
        <menu>
          <div className={tabindex === 0 ? "Active" : " "}>
            <img
              src={Dashboarimg}
              alt="BigCo Inc. logo"
              onClick={() => {
                SetTabIndex(0);
              }}
            />
          </div>
          <div className={tabindex === 1 ? "Active" : " "}>
            <img
              src={projectlistimg}
              alt="BigCo Inc. logo"
              onClick={() => {
                SetTabIndex(1);
              }}
            />
          </div>
          <div className={tabindex === 2 ? "Active" : " "}>
            <img
              src={createprojectimg}
              alt="BigCo Inc. logo"
              onClick={() => {
                SetTabIndex(2);
              }}
            />
          </div>
          <div className={tabindex === 3 ? "Active" : " "}>
            <img
              src={logoutimg}
              alt="BigCo Inc. logo"
              onClick={() => {
                SetTabIndex(3);
              }}
            />
          </div>
        </menu>
      </span>
      <div className="tab-content">
        {tabindex === 0 ? (
          <Dashboard />
        ) : tabindex === 1 ? (
          <ProjectList />
        ) : tabindex === 2 ? (
          <Project />
        ) : (
          // <Login />
          naviagate("/")
        )}
      </div>
    </>
  );
};

export default Tab;
