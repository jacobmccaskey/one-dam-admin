import React, { useState, useEffect, useCallback } from "react";
import Admin from "./components/admin";
import Login from "./components/login";
import { serverAuthorize, checkLogin } from "./util";
// import validator from "validator";

import "./App.css";

export default function App() {
  const [username, userVal] = useState("");
  const [password, secretVal] = useState("");
  const [admin, authorize] = useState(null);
  const [showStore, setShow] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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
      .then((data) => {
        setAccessToken(data.token);
        serverAuthorize(authorize, data);
      });
  };

  //checks to see if valid token exists
  useEffect(() => {
    if (admin === null) {
      checkLogin(authorize, setAccessToken);
    }
  }, [admin]);

  useEffect(() => {
    if (admin === true) {
      setShow(true);
    }
  }, [admin]);

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
        <Admin admin={admin} accessToken={accessToken} />
      )}
    </div>
  );
}
