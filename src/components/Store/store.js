import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ItemAccordian from "./ItemAccordian";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import { handleDelete, handleEdit } from "./storeFunctions";
import { useAlert } from "react-alert";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    position: "relative",
    paddingTop: "5rem",
  },
  link: {
    textDecoration: "none",
    marginBottom: "3rem",
  },
}));

export default function Store(props) {
  const [inventory, setInventory] = useState([]);
  const classes = useStyles();
  const alert = useAlert();

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

  useEffect(() => {
    populateStore();
  }, [populateStore]);

  return (
    <div className={classes.root}>
      <Container>
        <Link to="/addItem/new" className={classes.link}>
          <Button variant="outlined" style={{ marginBottom: "1rem" }}>
            add item
          </Button>
        </Link>
        {inventory.map((item) => (
          <ItemAccordian
            item={item}
            key={item._id}
            populateStore={populateStore}
            accessToken={props.accessToken}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </Container>
    </div>
  );
}
