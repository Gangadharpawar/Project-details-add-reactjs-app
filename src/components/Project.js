import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/project.css";
const Project = () => {
  const [projectname, SetProjectName] = useState("");
  const [resone, SetResone] = useState("Business");
  const [category, SetCategory] = useState("Quality A");
  const [pstartdate, SetPstartDate] = useState("");
  const [type, SetType] = useState("Internal");
  const [priority, SetPriority] = useState("High");
  const [penddate, SetPendDate] = useState("");
  const [division, SetDivision] = useState("Filters");
  const [department, SetDepartment] = useState("Strategy");
  const [location, SetLocation] = useState("Pune");
  const [status, SetStatus] = useState("Register");

  const [projectnamerequired, SetprojectNamerequired] = useState(false);
  const [pstartdaterequired, Setpstartdaterequired] = useState(false);
  const [penddaterequired, SetPendDaterequired] = useState(false);
  const HandeladdNewProject = async (e) => {
    e.preventDefault();

    if (pstartdate !== "" && penddate !== "" && projectname !== "") {
      SetprojectNamerequired(false);
      Setpstartdaterequired(false);
      SetPendDaterequired(false);
      // Sending data to backend
      try {
        fetch("http://localhost:5500/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectname,
            resone,
            category,
            pstartdate,
            type,
            priority,
            penddate,
            division,
            department,
            location,
            status,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data) {
              alert("Project Saved Successfully");
              cleardata();
            }
          });
      } catch (error) {
        console.log("somthing went wrong");
        console.log(error);
      }
    } else {
      if (projectname === "") {
        SetprojectNamerequired(true);
      } else {
        SetprojectNamerequired(false);
      }
      if (pstartdate === "") {
        Setpstartdaterequired(true);
      } else {
        Setpstartdaterequired(false);
      }
      if (penddate === "" && penddate < pstartdate) {
        SetPendDaterequired(true);
      } else {
        SetPendDaterequired(false);
      }
    }
  };

  const cleardata = () => {
    SetProjectName("");
    SetPstartDate("");
    SetPendDate("");
  };
  return (
    <div>
      <div className="container1">
        <h2>Create Project</h2>
        <div>
          <div>
            <label>Project Theme:</label>
          </div>
          <div className="from-group" style={{ display: "inline-flex" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Project Theme"
              value={projectname}
              onChange={(e) => SetProjectName(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary"
              onClick={HandeladdNewProject}
            >
              Save Project
            </button>
          </div>
          <div className="error-text">
            {projectnamerequired ? "Project Name required" : ""}
          </div>
          <form className="form-inline">
            <div className="form-group">
              <label>Reson:</label>
              <select
                className="form-control"
                value={resone}
                onChange={(e) => SetResone(e.target.value)}
              >
                <option value="Business">Business</option>
                <option value="Dealership">Dealership</option>
                <option value="Transport">Transport</option>
              </select>
              <label>Category:</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => SetCategory(e.target.value)}
              >
                <option>Quality A</option>
                <option>Quality B</option>
                <option>Quality C</option>
              </select>
              <label>Start date as per Project Plan:</label>
              <input
                type="date"
                className="form-control"
                value={pstartdate}
                onChange={(e) => SetPstartDate(e.target.value)}
              />
              <span className="error-text">
                {pstartdaterequired ? "Start Date Required" : ""}
              </span>
            </div>

            <div className="form-group">
              <label>Type:</label>
              <select
                className="form-control"
                value={type}
                onChange={(e) => SetType(e.target.value)}
              >
                <option>Internal</option>
                <option>External</option>
                <option>Vender</option>
              </select>
              <label>Priority:</label>
              <select
                className="form-control"
                value={priority}
                onChange={(e) => SetPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <label>End date as Per Project Plan:</label>
              <input
                type="date"
                className="form-control"
                value={penddate}
                onChange={(e) => SetPendDate(e.target.value)}
              />
              <span className="error-text">
                {penddaterequired ? " End Date Required" : ""}
              </span>
            </div>
            <div className="form-group">
              <label>Division:</label>
              <select
                className="form-control"
                value={division}
                onChange={(e) => SetDivision(e.target.value)}
              >
                <option>Filters</option>
                <option>Compressor</option>
                <option>Pumps</option>
                <option>Glass</option>
                <option>Water Heater</option>
              </select>
              <label>Department:</label>
              <select
                className="form-control"
                value={department}
                onChange={(e) => SetDepartment(e.target.value)}
              >
                <option>Strategy</option>
                <option>Finance</option>
                <option>Quality</option>
                <option>Maintenance</option>
                <option>HR</option>
              </select>
              <label>Location:</label>
              <select
                className="form-control"
                value={location}
                onChange={(e) => SetLocation(e.target.value)}
              >
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </select>
              <div>
                <label onChange={(e) => SetStatus(e.target.value)}>
                  {" Status:Registered"}
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Project;
