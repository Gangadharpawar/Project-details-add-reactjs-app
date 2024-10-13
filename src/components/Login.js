import React, { useState, useRef, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/login.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [emailrequired, SetEmailrequired] = useState(false);
  const [passwordrequired, Setpasswordrequired] = useState(false);
  const [error, setError] = useState("");
  const [showpassword, Setshowpassword] = useState(false);
  const naviagate = useNavigate();
  const emailRef = useRef(null);
  const passwrodRef = useRef(null);

  const authinfo = useContext(AuthContext);

  const togglePasswordHandel = () => {
    Setshowpassword(!showpassword);
  };
  const LoginHandel = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      SetEmailrequired(false);
      Setpasswordrequired(false);
      try {
        const response = await fetch("http://localhost:5500/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Login Done", data);
          authinfo.Login(data.token);
          naviagate("/tab");
        } else {
          setError(data.message);
        }

        // .then((res) => res.json())
        // .then((data) => {
        //   // console.log("Login done", data);
        //   naviagate("/tab");
        // });
      } catch (error) {
        console.log("something Wrong", error);
      }
    } else {
      if (email === "") {
        emailRef.current.focus();
        SetEmailrequired(true);
      } else {
        SetEmailrequired(false);
      }
      if (password === "") {
        Setpasswordrequired(true);
      } else {
        Setpasswordrequired(false);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
            ref={emailRef}
          />
          <span className="error-text " id="emailerror">
            {emailrequired ? "Email Required" : ""}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="pwd"
            // value={password}
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
            ref={passwrodRef}
          />
          <span className="error-text " id="passworderror">
            {passwordrequired ? "Password Required" : ""}
          </span>
          <span
            onClick={togglePasswordHandel}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={showpassword ? faEyeSlash : faEye} />
          </span>
        </div>
        <div className="fp">
          <a href="true"> Forget Password</a>
        </div>
        <input
          type="button "
          className="btn btn-primary"
          onClick={LoginHandel}
          value="Login"
        />
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
