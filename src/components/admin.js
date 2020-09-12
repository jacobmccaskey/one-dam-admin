import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { storage } from "./firebase";
// import { addToStore } from "../util";
import NavBar from "./navigation/navbar";
const Store = lazy(() => import("./Store/store"));
const Orders = lazy(() => import("./orders"));
const Profile = lazy(() => import("./VendorProfile"));
const Users = lazy(() => import("./users"));

export default function Admin(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* add cool looking loading spinner */}
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <Store {...props} />} />

            <Route path="/users" render={() => <Users />} />
            <Route path="/orders" render={() => <Orders />} />
            <Route path="/profile" render={() => <Profile />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}
