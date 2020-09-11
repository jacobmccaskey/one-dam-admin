import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { storage } from "./firebase";
import { addToStore } from "../util";
import VerticalNavBar from "./navigation/navbar";
const Store = lazy(() => import("./store"));
const Orders = lazy(() => import("./orders"));
const Profile = lazy(() => import("./VendorProfile"));
const Users = lazy(() => import("./users"));

class Admin extends Component {
  state = {
    name: "",
    imageFile: "",
    size: "",
    price: "",
    description: "",
    images: [],
    inventory: [],
  };
  populateStore = () => {
    fetch(process.env.REACT_APP_INVENTORY, {
      method: "GET",
      headers: {
        "x-access-token": `${this.props.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.admin === false
          ? this.props.authorize(null)
          : this.setState({
              inventory: data,
            });
      })
      .catch((err) => console.error(err));
  };

  deleteItem = (id) => {
    let body = {
      id: id,
    };
    fetch(`http://localhost:4545/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        this.populateStore();
      })
      .catch((err) => console.error(err));
  };

  handleUploadAndUpdateState = (imageAsFile) => {
    const { name, price, description } = this.state;

    if (imageAsFile === "") {
      return console.log(
        `not an image, the image file is a ${typeof imageAsFile}`
      );
    }

    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.error(err);
      },
      () => {
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            addToStore(fireBaseUrl, name, description, price);
            setTimeout(() => {
              this.populateStore();
            }, 1000);
          });
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { imageFile } = this.state;
    this.handleUploadAndUpdateState(imageFile);
  };

  componentDidMount() {
    if (this.props.admin === true) {
      this.populateStore();
    }
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          {/* add cool looking loading spinner */}
          <Suspense fallback={<div>Loading...</div>}>
            <VerticalNavBar />
            <Switch>
              <Route path="/users" render={() => <Users />} />
              <Route path="/store" render={() => <Store />} />
              <Route path="/orders" render={() => <Orders />} />
              <Route path="/profile" render={() => <Profile />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Admin;
