import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./navigation/navbar";
import Users from "./Users";
const AddItem = lazy(() => import("./Store/addItem"));
const Store = lazy(() => import("./Store/store"));
const Orders = lazy(() => import("./orders"));
const Profile = lazy(() => import("./VendorProfile"));
const Vendors = lazy(() => import("./vendor/Vendors"));

export default function Admin(props) {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* add cool looking loading spinner */}
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <Store {...props} />} />

            <Route path="/Vendors" render={() => <Vendors />} />
            <Route path="/orders/:param" render={() => <Orders {...props} />} />
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/users" render={() => <Users {...props} />} />
            <Route
              path="/addItem/:productId"
              render={() => <AddItem {...props} />}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}
