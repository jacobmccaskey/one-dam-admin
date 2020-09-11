import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  header: {
    textAlign: "center",
    backgroundColor: "black",
    color: "grey",
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
    color: "black",
  },
}));

export default function VerticalNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <Typography variant="h6" noWrap={false}>
            oneDAM Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link to="/store" className={classes.link}>
            <ListItem button key="Store">
              <ListItemText primary="Store" />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/orders" className={classes.link}>
            <ListItem button key="orders">
              <ListItemText primary="Orders" />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/users" className={classes.link}>
            <ListItem button key="users">
              <ListItemText primary="Users" />
            </ListItem>
          </Link>

          <Divider />

          <Link to="/profile" className={classes.link}>
            <ListItem button key="Profile">
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>

          <Divider />
        </List>
      </Drawer>
    </div>
  );
}
