import uid from "uid";
import axios from "axios";
import validator from "validator";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIAJB5LEG3TMD5WOUIQ",
  secretAccessKey: "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",
});

//function for uploading file to s3 bucket
const uploadFileToS3 = (filesArr) => {
  filesArr.forEach((file) => {
    if (file !== "") {
      const params = {
        Bucket: "one-dam",
        ContentType: "image/*",
        Key: `${file.name}`,
        Body: file,
      };
      s3.upload(params, (err, data) => {
        if (err) throw err;

        console.log(data);
      });
    }
  });
};

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

// export function addItem(
//   token,
//   name,
//   imageArr,
//   price,
//   description,
//   totalQuantity,
//   colors,
//   sizes,
//   vendor,
//   setErrorMessage
// ) {
//   let colorsArray = colors.trim().toLowerCase().split(",");
//   axios({
//     method: "post",
//     url: process.env.REACT_APP_ADDITEM,
//     headers: { "x-access-token": token },
//     data: {
//       name: name,
//       images: imageArr,
//       price: price,
//       description: description,
//       vendor: vendor,
//       quantity: totalQuantity,
//       sizes: sizes,
//       colors: colorsArray,
//     },
//   }).then((response) => console.log(response));
// }

export function addItem(imageArr) {
  uploadFileToS3(imageArr);
}
