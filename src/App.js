import "./App.css";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import Login from "./components/Login";
import Project from "./components/Project";
// import data from "./components/data";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tab from "./components/Tab";
import AuthoProvider from "./Auth/AuthoProvider";
function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Project /> */}
      {/* <ProjectList data={data} itemPerpage={3} /> */}
      {/* <ProjectList /> */}
      {/* <Dashboard /> */}
      <AuthoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/projectList" element={<ProjectList />}></Route>
            <Route path="/project" element={<Project />}></Route>
            <Route path="/tab" element={<Tab />}></Route>
          </Routes>
        </Router>
      </AuthoProvider>
      {/* <Tab /> */}
    </div>
  );
}

export default App;
