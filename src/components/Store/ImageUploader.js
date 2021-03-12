import React, { useDebugValue } from "react";
import { DropzoneArea } from "material-ui-dropzone";

// https://www.npmjs.com/package/material-ui-dropzone

export default function ImageUploader(props) {
  const { images, setImages } = props;
  const upload = (file) => {
    setImages((prevState) => [...prevState, file]);
    console.log(images);
  };

  return <DropzoneArea onChange={(e) => upload(e)} />;
}
