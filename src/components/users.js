import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    position: "relative",
    paddingTop: "5rem",
  },
}));

export default function Users() {
  const classes = useStyles();
  return <div className={classes.root}>Users Page</div>;
}
