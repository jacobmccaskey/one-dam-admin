import React, { useState } from "react";
// import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TextField from "@material-ui/core/TextField";
// import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  controls: {
    width: "100%",
    textAlign: "right",
    display: "block",
  },
  span: {
    color: "grey",
  },
  container: {
    textAlign: "left",
  },
  sizeDiv: {
    textAlign: "center",
    border: "solid",
    borderRadius: "5px",
    borderWidth: "thin",
    marginBottom: "0.5rem",
  },
  accordianBtn: {
    float: "right",
    textAlign: "center",
    zIndex: 1000,
    textTransform: "none",
    textDecoration: "none",
    backgroundColor: "#007791",
    marginLeft: theme.spacing(2),
    width: "100%",
  },
}));

export default function ItemAccordian(props) {
  const { item, handleDelete, accessToken, populateStore } = props;
  const [inputForInventory, setInputForInventory] = useState("none");
  const [stockNum, setStockNum] = useState(0);
  const handleViewStockInput = () => {
    setInputForInventory("block");
    props.setItemID(item._id);
    props.setModal(true);
  };
  const replinishStock = () => {
    // setInputForInventory("none");
    // Axios({
    //   method: "put",
    //   url: process.env.REACT_APP_REPLINISH_ITEM,
    //   headers: {
    //     "x-access-token": accessToken,
    //   },
    //   data: {
    //     id: item._id,
    //     quantity: stockNum,
    //   },
    // }).then((res) => window.location.reload());
    // // setStockNum(0);
  };
  const classes = useStyles();

  return (
    <Container maxWidth="lg" key={item._id}>
      <Accordion style={{ padding: "0.5rem", margin: "1rem" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.container}>
            <ul>
              <li>
                <span className={classes.span}>Name:</span> {item.name}
              </li>
              <br />
              <li>
                <span className={classes.span}>Description:</span>{" "}
                {item.description}
              </li>
              <br />
              <li>
                <span className={classes.span}>Price:</span> ${item.price}
              </li>
              <br />
              <li>
                <p style={{ textDecoration: "underline" }}>Images</p>

                {item.images.map((image) => (
                  <React.Fragment key={image.key}>
                    <span className={classes.span}>{image.key}</span>
                    <br />
                  </React.Fragment>
                ))}
              </li>
              <li>
                <span className={classes.span}>ID:</span> {item._id}
              </li>

              <br />
              <li>
                <span className={classes.span}>Sizes:</span>
                {item.sizes.map((item) => (
                  <div className={classes.sizeDiv} key={item.size}>
                    <span>{item.size} </span>
                    {/* <span>
                      
                    </span>
                    <span>{item.quantity}</span> */}
                  </div>
                ))}
              </li>
              <br />
              <li>
                <span className={classes.span}>Total Inventory:</span>
                <span> {item.quantity}</span>
              </li>
              <li>
                <span className={classes.span}>Returns:</span>
                <span> {item.returns}</span>
              </li>
            </ul>
            <ul>
              <li>
                <span className={classes.span}>Tags:</span>
                {item.tags.map((tag) => (
                  <span key={tag}>| {tag} | </span>
                ))}
              </li>
            </ul>
            <div className={classes.controls}>
              <Button
                onClick={() =>
                  handleDelete(
                    item._id,
                    item.images,
                    accessToken,
                    populateStore
                  )
                }
              >
                <DeleteIcon />
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={(item) => handleViewStockInput(item)}
              >
                replinish
              </Button>
              <br />
              <div style={{ display: inputForInventory, margin: "1rem" }}>
                <TextField
                  type="number"
                  value={stockNum}
                  onChange={(e) => setStockNum(e.target.value)}
                />
                <Button onClick={replinishStock}>
                  <AddBoxIcon style={{ height: "100%" }} />
                </Button>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
//colors, description, imageUrl, images(array), name, price, sizes(ARRAY), _id,
