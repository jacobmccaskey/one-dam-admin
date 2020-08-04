import React, { Component } from "react";
import { storage } from "./firebase";
import { addToStore } from "../util";
import Button from "@material-ui/core/Button";

class Admin extends Component {
  state = {
    name: "",
    imageFile: "",
    price: "",
    description: "",
    inventory: [],
  };

  populateStore() {
    fetch(process.env.REACT_APP_INVENTORY)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          name: "",
          imageFile: "",
          price: "",
          description: "",
          inventory: data,
        });
        console.log("store fetched");
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.populateStore();
  }

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

  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          Logout
        </Button>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>name:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
          <br />
          <label>price:</label>
          <input
            type="number"
            onChange={(e) => this.setState({ price: e.target.value })}
            value={this.state.price}
          />
          <br />
          <label>description:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ description: e.target.value })}
            value={this.state.description}
          />
          <br />
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => this.setState({ imageFile: e.target.files[0] })}
          />
          <br />
          <button type="submit">upload</button>
        </form>
        <br />
        <ul>
          {this.state.inventory.map((item) => (
            <li key={item._id}>
              <label>{item.name}</label>
              <Button onClick={() => this.deleteItem(item._id)}>X</Button>
              <br />

              <label>{item.description}</label>
              <br />

              <label>{item.price}</label>
              <br />
              <img src={item.imageUrl} alt={item.name} />
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Admin;
