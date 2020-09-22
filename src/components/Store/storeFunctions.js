import uid from "uid";
import axios from "axios";
import validator from "validator";

export function addTag(size, quantity, gender, sizes, setSizes) {
  setSizes((prevState) => [
    ...prevState,
    {
      size: size,
      quantity: quantity,
      gender: gender,
      id: uid(),
    },
  ]);
}

export function addItem(
  token,
  name,
  imageArr,
  price,
  description,
  totalQuantity,
  colors,
  sizes,
  vendor,
  setErrorMessage
) {
  let colorsArray = colors.trim().toLowerCase().split(",");

  axios({
    method: "post",
    url: process.env.REACT_APP_ADDITEM,
    headers: { "x-access-token": token },
    data: {
      name: name,
      images: imageArr,
      price: price,
      description: description,
      vendor: vendor,
      quantity: totalQuantity,
      sizes: sizes,
      colors: colorsArray,
    },
  }).then((response) => console.log(response));
}
