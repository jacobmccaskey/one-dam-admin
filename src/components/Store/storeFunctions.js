import uid from "uid";
import axios from "axios";
import validator from "validator";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWSID,
  secretAccessKey: process.env.REACT_APP_AWSKEY,
});

//function for uploading file to s3 bucket

const uploadFileToS3 = (file) => {
  if (file !== "") {
    const params = {
      Bucket: "one-dam",
      ContentType: "image/*",
      Key: `${file.name}`,
      Body: file,
      ACL: "public-read",
    };

    var upload = s3.upload(params, (err, data) => {
      if (err) throw err;
      return data;
    });
    var promise = upload.promise();
    return promise;
  }
};

export async function addItemToInventory(
  imageArr,
  accessToken,
  name,
  price,
  description,
  totalQuantity,
  colors,
  sizes,
  vendor,
  setRedirect
) {
  let imageUrls = [];

  let colorsArray = colors.trim().toLowerCase().split(",");

  for (const file of imageArr) {
    if (file !== "") {
      const data = await uploadFileToS3(file);
      imageUrls.push(data);
    }
  }

  axios({
    method: "post",
    url: process.env.REACT_APP_ADDITEM,
    headers: { "x-access-token": accessToken },
    data: {
      name: name,
      images: imageUrls,
      price: price,
      description: description,
      vendor: vendor,
      quantity: totalQuantity,
      sizes: sizes,
      colors: colorsArray,
    },
  }).then((res) => {
    if (res.status === 200) setRedirect(true);
  });
}

export function addTag(size, quantity, gender, setSizes) {
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
