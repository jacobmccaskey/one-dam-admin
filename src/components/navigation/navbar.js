import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  buttonGroup: {
    paddingLeft: "5%",
  },
  button: {
    textDecoration: "none",
    marginRight: "2px",
  },
  appBar: {
    backgroundColor: "#343436",
  },
}));
export default function NavBar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar
        position="fixed"
        className={classes.appBar}
        // style={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <Typography>oneDAM Admin</Typography>
          <div className={classes.buttonGroup}>
            <Link to="/" className={classes.button}>
              <Button variant="contained">Store</Button>
            </Link>
            <Link to="/orders" className={classes.button}>
              <Button variant="contained">orders</Button>
            </Link>
            <Link to="/users" className={classes.button}>
              <Button variant="contained">Users</Button>
            </Link>
            <Link to="/profile" className={classes.button}>
              <Button variant="contained">profile</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
