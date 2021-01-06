import React, { useState, useMemo, useEffect } from "react";
import Axios from "axios";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useParams} from "react-router-dom";
import Button from "@material-ui/core/Button";
import uid from "uid";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    position: "relative",
    paddingTop: "5rem",
  },
  topBar: {
    borderBottom: "solid #343436",
    // paddingBottom: theme.spacing(1),
    display: "flex",
  },
  topBarBox: {
    flex: 1,
    borderRight: "solid #343436",
    padding: "1rem",
  },
  orderWrap: {
    diplay: "flex",
    padding: theme.spacing(1),
    margin: "0.2rem",
    textAlign: "left",
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
  },
  orderBox: {
    flex: 1,
  },
  btn: {
    margin: "0.3rem",
  },
}));

export default function Orders(props) {
  const { accessToken } = props;
  const { param } = useParams();
  const [orders, setOrders] = useState([]);
  const [recent, setRecent] = useState([]);
  const [shipped, setShipped] = useState([]);
  const [returned, setReturned] = useState([]);
  const [whatToShow, setWhatToShow] = useState(param);

  function convertToRealNumber(num) {
    return Number((num / 100).toFixed(2));
  }

  const deleteOrder = (id) => {
    const headers = {
      "x-access-token": accessToken,
    };
    Axios({
      method: "delete",
      url: process.env.REACT_APP_DELETE_ORDER,
      headers: headers,
      data: {
        id: id,
      },
    }).then(() => window.location.reload());
  };

  const moveOrderToShipped = (id) => {
    const headers = {
      "x-access-token": accessToken,
    };
    Axios({
      method: "put",
      url: process.env.REACT_APP_UPDATE_ORDER,
      headers: headers,
      data: {
        id: id,
        update: {
          shipped: true,
        },
      },
    }).then(() => window.location.reload());
  };

  const moveOrderToReturned = (id) => {
    const headers = {
      "x-access-token": accessToken,
    };
    Axios({
      method: "put",
      url: process.env.REACT_APP_UPDATE_ORDER,
      headers: headers,
      data: {
        id: id,
        update: {
          returned: "true",
        },
      },
    }).then(() => window.location.reload());
  };

  useMemo(() => {
    Axios({
      method: "get",
      url: process.env.REACT_APP_GET_ORDERS,
      headers: {
        "x-access-token": accessToken,
      },
    }).then((res) => {
      // console.log(res.data);
      console.log(res.data);
      res.data.forEach((order) => {
        if (order.returned === true) {
          setReturned((prevState) => [...prevState, order]);
        }
        if (order.shipped === true && order.returned !== true) {
          setShipped((prevState) => [...prevState, order]);
        }
        if (order.shipped !== true && order.returned !== true) {
          setRecent((prevState) => [...prevState, order]);
        }
      });
    });
  }, [accessToken]);

  useEffect(() => {
    if (whatToShow === "recent" || !whatToShow) setOrders(recent);
    if (whatToShow === "returned") setOrders(returned);
    if (whatToShow === "shipped") setOrders(shipped);
  }, [recent, returned, shipped, whatToShow]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Box className={classes.topBarBox}>
          <Button onClick={() => setWhatToShow("recent")}>Recent Orders</Button>
        </Box>
        <Box className={classes.topBarBox}>
          <Button onClick={() => setWhatToShow("shipped")}>Shipped</Button>
        </Box>
        <Box className={classes.topBarBox}>
          <Button onClick={() => setWhatToShow("returned")}>Returned</Button>
        </Box>
      </div>
      <Box m={3} />
      <div style={{ display: "" }}>
        {orders.map((order) => (
          <Paper className={classes.orderWrap} key={order._id}>
            <Box className={classes.orderBox}>
              <Typography variant="h6">Customer</Typography>
              <hr />
              <Typography>
                <a href={`mailto:${order.email}`}>{order.email}</a>
                <span
                  style={
                    order.guest === true
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  Guest
                </span>
              </Typography>
              <Typography>{order.name}</Typography>
              <Typography variant="h6">Shipping</Typography>
              <hr />
              <Typography>
                {order.address} {order.addressTwo}
              </Typography>
              <Typography>
                {order.city}, {order.state} {order.postalCode}
              </Typography>
            </Box>
            <Box className={classes.orderBox}>
              <Typography variant="h6">
                Amount: ${order.amount.toFixed(2)}
              </Typography>
              <hr />

              <Typography>
                Status:{" "}
                {order.paid === true
                  ? "payment processed"
                  : "payment not yet processed"}
              </Typography>
            </Box>
            <Box className={classes.orderBox}>
              <Typography variant="h6">Items</Typography>
              <hr />
              {order.items.map((item) => (
                <Typography key={uid()}>
                  <span style={{ fontWeight: "bold" }}>{item.quantity} </span>
                  {item.price_data.product_data.name} $
                  {convertToRealNumber(item.price_data.unit_amount).toFixed(2)}
                </Typography>
              ))}
            </Box>
            <div style={{ display: "inline" }}>
              <Button
                variant="contained"
                onClick={() => deleteOrder(order._id)}
                className={classes.btn}
              >
                Delete
              </Button>
              <Box
                style={
                  order.shipped === true
                    ? { display: "none" }
                    : { display: "inherit" }
                }
              >
                <Button
                  variant="contained"
                  className={classes.btn}
                  onClick={() => moveOrderToShipped(order._id)}
                >
                  Ship
                </Button>
              </Box>
              <Box
                style={
                  order.returned === true
                    ? { display: "none" }
                    : { display: "inherit" }
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={() => moveOrderToReturned(order._id)}
                >
                  Return
                </Button>
              </Box>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}
