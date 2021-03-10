import React from "react";
// import Admin from "./components/admin";
// import Login from "./components/login";
import Main from "./components/Main";
import ModalProvider from "./components/modalProvider";
import AuthManager from "./context/Auth";
import StoreManager from "./context/Store";
// import { serverAuthorize, checkCookie } from "./util";
// import { Auth } from "./context/Auth";

// import validator from "validator";

import "./App.css";

export default function App() {
  // const [username, userVal] = useState("");
  // const [password, secretVal] = useState("");
  // const [admin, authorize] = useState(null);
  // const [accessToken, setAccessToken] = useState(null);

  // const validateCredentials = (e) => {
  //   e.preventDefault();

  //   fetch(process.env.REACT_APP_ADMIN_LOGIN, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Accept: "application/json",
  //     },
  //     body: new URLSearchParams({
  //       admin: username,
  //       password: password,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAccessToken(data.token);
  //       serverAuthorize(authorize, data);
  //     });
  // };

  //checks to see if valid token exists
  // const admin = auth.admin;
  // useEffect(() => {
  //   if (admin === null) {
  //     checkCookie(authorize, setAccessToken);
  //   }
  // }, [admin]);

  return (
    <div>
      <ModalProvider>
        <AuthManager>
          <StoreManager>
            {/* {admin === null ? (
              <Login
              // username={auth.username}
              // password={auth.password}
              // validateCredentials={auth.validateCredentials}
              // userVal={auth.userVal}
              // secretVal={auth.secretVal}
              />
            ) : (
              <Admin
              // admin={auth.admin}
              // accessToken={auth.accessToken}
              // authorize={auth.authorize}
              // setAccessToken={auth.setAccessToken}
              />
            )} */}
            <Main />
          </StoreManager>
        </AuthManager>
      </ModalProvider>
    </div>
  );
}
