import React from "react";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

const AuthoProvider = ({ children }) => {
  const [isLoggedIn, SetisLoggedIn] = useState(null);

  const Logout = () => {
    sessionStorage.removeItem("token");
    SetisLoggedIn(false);
  };
  const Login = ({ token }) => {
    sessionStorage.setItem("token", token);
    SetisLoggedIn(true);
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    !token ? SetisLoggedIn(false) : SetisLoggedIn(true);
  }, []);
  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, Logout, Login }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthoProvider;
