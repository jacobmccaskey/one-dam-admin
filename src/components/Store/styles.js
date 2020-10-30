import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "relative",
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  marginBottom: {
    marginBottom: "2rem",
    width: "90%",
  },
  text: {
    size: "22px",
    textDecoration: "underline",
    color: "grey",
  },
  sizeTag: {
    // backgroundColor: "lightgrey",

    borderRadius: "4px",
    // width: "4rem",
    display: "inline-block",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    fontWeight: 500,
  },
  tagButton: {
    // backgroundColor: "gray",
    marginLeft: "4px",
    display: "inline",
    border: "none",
    verticalAlign: "center",
    borderRadius: "20%",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  divContainerForItemSize: {
    textAlign: "center",
    marginBottom: "2rem",
    width: "100%",
  },
  input: {
    marginRight: "1rem",
    marginTop: "10px",
  },
  newItemBtn: {
    width: "60%",
    backgroundColor: "#0066b2",
    margin: theme.spacing(1),
    textTransform: "none",
    color: "black",
  },
  genderBtn: {
    backgroundColor: "#0066b2",
    color: "black",
    marginRight: theme.spacing(2),
  },
  genderView: {
    display: "inline",
    fontSize: "18px",
  },
}));
