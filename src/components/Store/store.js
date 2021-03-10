import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ItemAccordian from "./ItemAccordian";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import EditModal from "./EditModal";
import { StoreContext } from "../../context/Store";
import { Auth } from "../../context/Auth";
// import { handleDelete, handleEdit } from "./storeFunctions";
// import { useAlert } from "react-alert";

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
  const [itemID, setItemID] = useState(null);
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  // const alert = useAlert();
  const { handleDelete, handleEdit } = useContext(StoreContext);
  const { accessToken, setUser } = useContext(Auth);

  const populateStore = useCallback(() => {
    fetch(process.env.REACT_APP_INVENTORY, {
      method: "GET",
      headers: {
        "x-access-token": `${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.admin === false ? setUser(null) : setInventory(data);
      })
      .catch((err) => console.error(err));
  }, [accessToken, setUser]);

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
            accessToken={accessToken}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setModal={setModal}
            setItemID={setItemID}
          />
        ))}
      </Container>
      <EditModal modal={modal} itemID={itemID} setModal={setModal} />
    </div>
  );
}
