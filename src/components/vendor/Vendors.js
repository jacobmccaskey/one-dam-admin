import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/Delete";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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

export default function Vendors() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="#" className={classes.link}>
        <Button variant="outlined" style={{ marginBottom: "1rem" }}>
          New Vendor
        </Button>
      </Link>
    </div>
  );
}
