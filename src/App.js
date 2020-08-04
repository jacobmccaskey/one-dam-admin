import React, { useState, useEffect } from "react";
import Admin from "./components/admin";
import Login from "./components/login";
import { serverAuthorize, checkLogin } from "./util";

import "./App.css";

export default function App() {
  const [username, userVal] = useState("");
  const [password, secretVal] = useState("");
  const [admin, authorize] = useState(null);
  const [showStore, setShow] = useState(null);

  useEffect(() => {
    if (admin === true) return setShow(true);
  }, [admin]);

  //checks to see if valid token exists
  useEffect(() => {
    checkLogin(authorize);
  }, []);

  const validateCredentials = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_ADMIN_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        admin: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => serverAuthorize(authorize, data));
  };

  return (
    <div>
      {showStore === null ? (
        <Login
          username={username}
          password={password}
          validateCredentials={validateCredentials}
          userVal={userVal}
          secretVal={secretVal}
        />
      ) : (
        <Admin />
      )}
    </div>
  );
}
