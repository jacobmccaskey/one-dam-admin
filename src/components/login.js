import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginTop: "10%",
    border: 0,
    borderRadius: 10,
    borderColor: "grey",
    textAlign: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    paddingTop: "10px",
    color: "white",
  },
});

export default function Login(props) {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="md" className={classes.container}>
        <form onSubmit={props.validateCredentials}>
          <label>username:</label>
          <input
            type="text"
            onChange={(e) => props.userVal(e.target.value)}
            value={props.username}
          />
          <br />
          <label>password</label>
          <input
            type="password"
            onChange={(e) => props.secretVal(e.target.value)}
            value={props.password}
          />
          <br />
          <Button type="submit">Login</Button>
        </form>
      </Container>
    </div>
  );
}
