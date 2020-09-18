import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ItemAccordian from "./ItemAccordian";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";

// import { storage } from "./firebase";
// import { addToStore } from "../util";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    position: "relative",
    paddingTop: "5rem",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function Store(props) {
  const [inventory, setInventory] = useState([]);
  const classes = useStyles();
  const populateStore = useCallback(() => {
    fetch(process.env.REACT_APP_INVENTORY, {
      method: "GET",
      headers: {
        "x-access-token": `${props.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.admin === false ? props.authorize(null) : setInventory(data);
      })
      .catch((err) => console.error(err));
  }, [props]);

  // const deleteItem = (id) => {
  //   let body = {
  //     id: id,
  //   };
  //   fetch(`http://localhost:4545/admin/delete/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       populateStore();
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const handleUploadAndUpdateState = (imageAsFile) => {
  //   const { name, price, description } = this.state;

  //   if (imageAsFile === "") {
  //     return console.log(
  //       `not an image, the image file is a ${typeof imageAsFile}`
  //     );
  //   }

  //   const uploadTask = storage
  //     .ref(`/images/${imageAsFile.name}`)
  //     .put(imageAsFile);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapShot) => {
  //       console.log(snapShot);
  //     },
  //     (err) => {
  //       console.error(err);
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(imageAsFile.name)
  //         .getDownloadURL()
  //         .then((fireBaseUrl) => {
  //           addToStore(fireBaseUrl, name, description, price);
  //           setTimeout(() => {
  //             this.populateStore();
  //           }, 1000);
  //         });
  //     }
  //   );
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { imageFile } = this.state;
  //   this.handleUploadAndUpdateState(imageFile);
  // };

  useEffect(() => {
    populateStore();
  }, [populateStore]);
  console.log(inventory);
  return (
    <div className={classes.root}>
      <Container>
        <Link to="/addItem" className={classes.link}>
          <Button variant="outlined">add item</Button>
        </Link>
        {inventory.map((item) => (
          <ItemAccordian item={item} />
        ))}
      </Container>
    </div>
  );
}
