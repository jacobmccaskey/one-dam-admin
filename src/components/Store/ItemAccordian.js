import React from "react";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ItemAccordian(props) {
  const { item } = props;

  return (
    <Container maxWidth="lg">
      <Accordion>
        <AccordionSummary
          expandIcon={<DeleteIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">
            {item.name} id: {item._id}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>{item.name}</li>
            <br />
            <li>{item.description}</li>
            <br />
            <li>${item.price}</li>
            <br />
            <li>{item._id}</li>
            <br />
          </ul>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
//colors, description, imageUrl, images(array), name, price, sizes(ARRAY), _id,
