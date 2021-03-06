import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    position: "relative",
    paddingTop: "5rem",
  },
}));

export default function VendorProfile() {
  const classes = useStyles();
  return <div className={classes.root}>Vendor Profile</div>;
}
