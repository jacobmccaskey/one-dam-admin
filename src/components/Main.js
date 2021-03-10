import React, { useContext } from "react";
import Login from "./login";
import Admin from "./admin";
import { Auth } from "../context/Auth";

export default function Main() {
  const { admin } = useContext(Auth);

  return (
    <React.Fragment>
      {admin === null ? (
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
      )}
    </React.Fragment>
  );
}
