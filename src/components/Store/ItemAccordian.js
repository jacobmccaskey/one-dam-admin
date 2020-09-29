import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  controls: {
    width: "100%",
    textAlign: "right",
  },
  span: {
    color: "grey",
  },
}));

export default function ItemAccordian(props) {
  const { item, handleDelete, handleEdit, accessToken, populateStore } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">
            {item.name} id: {item._id}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
              <span className={classes.span}>ID:</span> {item._id}
            </li>
            <br />
          </ul>
          <div className={classes.controls}>
            <Button
              onClick={() =>
                handleDelete(item._id, item.images, accessToken, populateStore)
              }
            >
              <DeleteIcon />
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={(item) => handleEdit(item)}
            >
              Edit
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
//colors, description, imageUrl, images(array), name, price, sizes(ARRAY), _id,
