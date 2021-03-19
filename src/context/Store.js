import React from "react";
import axios from "axios";
import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
// import { useAlert } from "react-alert";

export const StoreContext = React.createContext();

export default function StoreManager({ children }) {
  // const alert = useAlert();
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWSID,
    secretAccessKey: process.env.REACT_APP_AWSKEY,
  });

  //function for uploading file to s3 bucket

  const uploadFileToS3 = (file) => {
    if (file !== "") {
      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET || "one-dam-2020",
        ContentType: "image/*",
        Key: `${uuid()}`,
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

  //bug with deleting multiple files
  const deleteFileFromS3 = (fileArray) => {
    for (const file of fileArray) {
      if (file === null) {
        continue;
      }
      if (file !== null) {
        s3.deleteObject(
          {
            Bucket: "one-dam-2020",
            Key: `${file.Key}`,
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  };

  async function addItemToInventory(
    imageArr,
    accessToken,
    name,
    price,
    description,
    totalQuantity,
    sizes,
    vendor,
    gender,
    setRedirect,
    alert,
    tags
  ) {
    let imageUrls = [];

    const arrayToCheck = [
      imageArr,
      accessToken,
      name,
      price,
      description,
      totalQuantity,
      sizes,
      vendor,
      gender,
      tags,
    ];

    //weak validation before hitting server. returns alert to user
    for (const x of arrayToCheck) {
      if (x === null || x === "" || x === undefined || x.length === 0) {
        // return alert.show("Please make sure all fields have been completed.. ");
        return console.log(JSON.stringify(x));
      }
    }

    const itemPrice = Number.parseFloat(price).toFixed(2);
    const itemGender = gender.trim();

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
        price: itemPrice,
        description: description,
        vendor: vendor,
        quantity: totalQuantity,
        sizes: sizes,
        gender: itemGender,
        tags: tags,
      },
    }).then((res) => {
      if (res.status === 200) setRedirect(true);
    });
  }

  const handleDelete = async (
    itemID,
    itemImages,
    accessToken,
    populateStore
  ) => {
    if (Array.isArray(itemImages) && itemImages.length !== 0) {
      deleteFileFromS3(itemImages);
    }

    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_DELETE_ITEM}/${itemID}`,
      headers: { "x-access-token": accessToken },
    }).then(() => populateStore());
  };

  const handleEdit = ({ item }) => {
    console.log({ item });
  };

  // export function addTag(size, quantity, color, setSizes, setColors) {
  //   setSizes((prevState) => [
  //     ...prevState,
  //     {
  //       size: size.toLowerCase(),
  //       quantity: quantity,
  //       color: color.toLowerCase(),
  //       id: uid(),
  //     },
  //   ]);

  //   setColors((prevState) => [...prevState, color]);
  // }

  return (
    <StoreContext.Provider
      value={{
        addItemToInventory,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
