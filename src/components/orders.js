import React, { useState, useMemo } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    position: "relative",
    paddingTop: "5rem",
  },
}));

export default function Orders(props) {
  const { accessToken } = props;
  const [orders, setOrders] = useState([]);

  useMemo(() => {
    Axios({
      method: "get",
      url: process.env.REACT_APP_GET_ORDERS,
      headers: {
        "x-access-token": accessToken,
      },
    }).then((res) => setOrders(res.data));
  }, [accessToken]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <p></p>
      </div>
    </div>
  );
}
