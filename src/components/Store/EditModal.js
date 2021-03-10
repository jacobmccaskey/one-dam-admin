import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "@material-ui/core/Modal";

export default function EditModal(props) {
  const [sizes, setSizes] = useState(null);

  useEffect(() => {
    Axios({
      method: "get",
      url: `${process.env.REACT_APP_GET_ITEM}/${props.itemID}`,
    }).then((res) => setSizes(res));
  }, [props.itemID]);
  return (
    <Modal open={props.modal} onClose={props.setModal}>
      <div>{JSON.stringify(sizes)}</div>
    </Modal>
  );
}
