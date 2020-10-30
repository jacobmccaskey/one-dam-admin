import React from "react";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

const options = {
  position: positions.MIDDLE,
};

export default function ModalProvidor({ children }) {
  return (
    <Provider template={AlertMUITemplate} {...options}>
      {children}
    </Provider>
  );
}
