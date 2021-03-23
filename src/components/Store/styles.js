import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "relative",
    textAlign: "center",
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
    // border: "0.5px solid lightgrey",

    // width: "4rem",
    display: "inline-block",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    fontWeight: 500,
  },
  tagButton: {
    backgroundColor: "lightblue",
    marginLeft: "4px",
    display: "inline",
    border: "none",
    verticalAlign: "center",
    // borderRadius: "20%",
    "&:hover": {
      // backgroundColor: "black",
      color: "red",
    },
  },
  divContainerForItemSize: {
    textAlign: "left",
    verticalAlign: "center",
    marginBottom: "2rem",
    width: "100%",
  },
  input: {
    marginRight: "1rem",
    marginTop: "10px",
    // height: "36px",
  },
  newItemBtn: {
    width: "60%",
    backgroundColor: "lightblue",
    margin: theme.spacing(1),
    textTransform: "none",
    color: "black",
  },
  genderBtn: {
    backgroundColor: "white",
    width: "50%",
    color: "black",
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  genderView: {
    display: "inline",
    fontSize: "20px",
    fontWeight: "500",
    border: "1px solid black",
    borderRadius: "2px",
    padding: "0.5rem",
  },
  wrapperAddItem: {
    width: "50%",
    // textAlign: "center",
    margin: "auto",
    border: "grey",
    borderRadius: "2px",
    // [theme.breakpoints.up("lg")]: {
    //   width: "50%",
    // },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  variantBox: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: "inline-block",
  },
}));
