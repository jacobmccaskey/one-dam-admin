import React, { useState, useEffect, useCallback } from "react";
import { useAlert } from "react-alert";
export const Auth = React.createContext();

export default function AuthManager({ children }) {
  const [username, userVal] = useState("");
  const [password, secretVal] = useState("");
  const [admin, setAdmin] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const alert = useAlert();

  const validateCredentials = () => {
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
      .then(
        (res) => {
          if (res.status === 404) {
            return alert.show("login failed.. Please try again");
          }
          return res.json();
        }
        // res.json()
      )
      .then((data) => {
        setAccessToken(data.token);
        serverAuthorize(setAdmin, data);
      });
  };

  const serverAuthorize = (setAdmin, serverResponse) => {
    let expiry = new Date(
      new Date().getTime() + 60 * 60 * 24 * 1000
    ).toUTCString();
    if (serverResponse.admin === true) {
      setAdmin(true);
      document.cookie =
        "admin =" +
        encodeURIComponent(serverResponse.admin) +
        "; expires =" +
        expiry;
      document.cookie =
        "one-dam-admin-token =" +
        encodeURIComponent(serverResponse.token) +
        ";expires =" +
        expiry;
    }
    if (serverResponse.admin === false) {
      alert.show("Login failed.. please try again");
      setAdmin(null);
    }
  };

  const checkCookie = useCallback((authorize, setAccessToken) => {
    let token = getCookie("one-dam-admin-token");
    // if (!token) {
    //   return authorize(null);
    // }

    fetch(process.env.REACT_APP_ADMIN_VERIFY, {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.admin === false && data.edit === false) {
          document.cookie = "one-dam-admin-token=;max-age=0";
          document.cookie = "admin=;max-age=0";
          return authorize(null);
        }
        if (data.edit === true) {
          authorize(true);
          setAccessToken(token);
        }
      });
  }, []);

  function logout(authorize, setAccessToken) {
    document.cookie = "one-dam-admin-token=;Expires/Max-Age=0";
    document.cookie = "admin=;Expires/Max-Age=0";
    authorize(null);
    setAccessToken(null);
  }

  function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
      if (name === cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }

    // Return null if not found
    return null;
  }

  useEffect(() => {
    if (admin === null) {
      checkCookie(setAdmin, setAccessToken);
    }
  }, [admin, checkCookie]);

  return (
    <Auth.Provider
      value={{
        username,
        userVal,
        password,
        secretVal,
        admin,
        setAdmin,
        accessToken,
        setAccessToken,
        validateCredentials,
        serverAuthorize,
        checkCookie,
        logout,
        getCookie,
      }}
    >
      {children}
    </Auth.Provider>
  );
}
