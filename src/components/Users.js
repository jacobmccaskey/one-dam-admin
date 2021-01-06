import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@material-ui/core";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
    marginLeft: "2rem",
  },
  userCard: {
    margin: theme.spacing(1),
    // borderTop: "1px black",
    // borderBottom: "black",
    color: "black",
    display: "block",
    padding: "10px",
  },
  inlineEl: {
    padddingRight: theme.spacing(1),
    marginRight: theme.spacing(2),
    display: "inline",
  },
}));

export default function Users(props) {
  const [users, setUsers] = useState([]);
  const { accessToken } = props;
  const styles = useStyles();

  useEffect(() => {
    Axios({
      method: "get",
      url: process.env.REACT_APP_GET_USERS,
      headers: {
        "x-access-token": accessToken,
      },
    }).then((res) => setUsers(res.data));
  }, [accessToken]);
  return (
    <div className={styles.root}>
      {users.map((user) => (
        <Paper className={styles.userCard} key={user._id}>
          <Typography className={styles.inlineEl}>
            {Number(users.indexOf(user) + 1)}.
          </Typography>
          <Typography className={styles.inlineEl}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography className={styles.inlineEl}>
            Email: <a href={`mailto:${user.email}`}>{user.email}</a>
          </Typography>
          <Typography className={styles.inlineEl}>
            Phone: {user.phone}
          </Typography>
          <Typography className={styles.inlineEl}>
            Orders: {Number(user.orders.length)}
          </Typography>
          <Typography className={styles.inlineEl}>
            USER ID: {user._id}
          </Typography>
        </Paper>
      ))}
    </div>
  );
}
