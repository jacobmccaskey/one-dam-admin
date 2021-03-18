import React from "react";
import Input from "@material-ui/core/Input";
import uid from "uid";
import { useStyles } from "./styles";

// component no longer being used..

export default function MultipleImageUpload(props) {
  const {
    setImageTwo,
    setImageThree,
    setImageFour,
    setImageFive,
    setImageSix,
  } = props;
  const classes = useStyles();
  return (
    <div>
      <Input
        className={classes.marginBottom}
        variant="outlined"
        size="small"
        type="file"
        accept="image/*"
        name={uid()}
        onChange={(e) => {
          const file = e.target.files[0];
          setImageTwo(file);
        }}
      />
      <Input
        className={classes.marginBottom}
        variant="outlined"
        size="small"
        type="file"
        accept="image/*"
        name={uid()}
        onChange={(e) => {
          const file = e.target.files[0];
          setImageThree(file);
        }}
      />
      <Input
        className={classes.marginBottom}
        variant="outlined"
        size="small"
        type="file"
        accept="image/*"
        name={uid()}
        onChange={(e) => {
          const file = e.target.files[0];
          setImageFour(file);
        }}
      />
      <Input
        className={classes.marginBottom}
        variant="outlined"
        size="small"
        type="file"
        accept="image/*"
        name={uid()}
        onChange={(e) => {
          const file = e.target.files[0];
          setImageFive(file);
        }}
      />
      <Input
        className={classes.marginBottom}
        variant="outlined"
        size="small"
        type="file"
        accept="image/*"
        name={uid()}
        onChange={(e) => {
          const file = e.target.files[0];
          setImageSix(file);
        }}
      />
    </div>
  );
}
