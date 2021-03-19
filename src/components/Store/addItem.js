import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/Store";
import { Auth } from "../../context/Auth";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import { Link, useParams } from "react-router-dom";
import uid from "uid";
import { useStyles } from "./styles";
import { useAlert } from "react-alert";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import MultipleImageUpload from "./MultipleImageUpload";
import Box from "@material-ui/core/Box";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import Select from "react-select";
// import CreatableSelect from "react-select/creatable";

//add endpoint to API
const vendors = [{ value: "oneDAM", label: "oneDAM" }];

const genderOptions = [
  { value: "male", label: "male" },
  { value: "female", label: "female" },
  { value: "unisex", label: "unisex" },
];

export default function AddItem() {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const { addItemToInventory } = useContext(StoreContext);
  const { accessToken } = useContext(Auth);
  // const [uploadMultiplePhotos, setUploadMultiplePhotos] = useState(false);
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  // const [color, setColor] = useState("");
  // for all colors populated for individual size/color inputs
  // const [colors, setColors] = useState([]);
  const [gender, setGender] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [variant, setVariant] = useState([]);
  const [variantColor, setVariantColor] = useState("");
  const [variantQuantity, setVariantQuantity] = useState(0);
  const [vendor, setVendor] = useState("");
  const [redirectToHome, setRedirect] = useState(false);

  //hooks for individual images
  // const [imageOne, setImageOne] = useState("");
  // const [imageTwo, setImageTwo] = useState("");
  // const [imageThree, setImageThree] = useState("");
  // const [imageFour, setImageFour] = useState("");
  // const [imageFive, setImageFive] = useState("");
  // const [imageSix, setImageSix] = useState("");
  const [images, setImages] = useState([]);

  //for making tags and pushing to sizes array and totalQuantity
  const [sizeInputForTag, setSizeInput] = useState("");
  // const [quantityInputForTag, setQuantity] = useState(0);

  //hook for opening menu.
  // const [openMenu, setOpenMenu] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  function addSizeVariant() {
    setVariant((prevState) => [
      ...prevState,
      {
        color: variantColor,
        quantity: variantQuantity,
      },
    ]);
    setTotalQuantity((prevState) => (prevState += variantQuantity));
    setVariantColor("");
    setVariantQuantity(0);
  }

  function addProductVariation() {
    addSizeVariant();
    setVariantColor("");
    setVariantQuantity(0);
    let totalCount = 0;
    variant.forEach((item) => (totalCount += Number(item.quantity)));
    setSizes((prevState) => [
      ...prevState,
      {
        size: sizeInputForTag.toLowerCase(),
        variant: variant,
        totalCount: totalCount,
        id: uid(),
      },
    ]);
    setSizeInput("");
    setVariantColor("");
    setVariantQuantity(0);
    setVariant([]);
    console.log(sizes);
  }
  const removeProductSize = (target) => {
    setTotalQuantity((prevState) => (prevState -= target.totalCount));
    setSizes(() => sizes.filter((tag) => tag.id !== target.id));
    console.log(target);
  };

  const alert = useAlert();

  const submitForm = (e) => {
    e.preventDefault();

    // const imageArray = [
    //   imageOne,
    //   imageTwo,
    //   imageThree,
    //   imageFour,
    //   imageFive,
    //   imageSix,
    // ];
    addItemToInventory(
      images,
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
    );
  };

  const pushToTagArray = () => {
    let tag = tagInput;
    setTags((prevState) => [...prevState, tag]);
    setTagInput("");
  };

  const pickGender = (gender) => {
    setGender(gender);
    console.log(gender);
    // setOpenMenu(false);
    // setAnchorEl(null);
  };

  // const genderMenu = (e) => {
  //   // setOpenMenu(true);
  //   setAnchorEl(e.currentTarget);
  // };

  // useEffect(() => {
  //   let count = 0;
  //   if (sizes.length === 0) return setTotalQuantity(0);
  //   sizes.forEach((size) => (count += parseInt(size.quantity)));
  //   return setTotalQuantity(count);
  // }, [sizes]);

  useEffect(() => {
    //for later development to edit items
    if (productId === "new") return;
    if (productId) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_GET_ITEM}/${productId}`,
      }).then((res) => console.log(res));
      console.log(productId);
    } else return null;
  }, [productId]);

  return (
    <React.Fragment>
      {!redirectToHome ? (
        <div className={classes.wrapperAddItem}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button style={{ marginTop: "5rem", marginLeft: "1rem" }}>
              <Typography>{"<"}Back to home</Typography>
            </Button>
          </Link>
          <Container className={classes.container}>
            <form onSubmit={(e) => submitForm(e)}>
              <div style={{ padding: "1rem" }}>
                <div style={{ textAlign: "left" }}>
                  <Typography>Name</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    className={classes.marginBottom}
                    style={{ width: "50%" }}
                    multiline
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  ></TextField>

                  <Typography>Description</Typography>
                  <TextField
                    className={classes.marginBottom}
                    id="item-description"
                    // style={{ minHeight: 100 }}
                    size="small"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <div style={{ display: "block" }}>
                    <div style={{ display: "block", width: "180px" }}>
                      <InputLabel>Amount</InputLabel>
                      <Input
                        className={classes.marginBottom}
                        // style={{ minWidth: "6rem", width: "20%" }}
                        variant="outlined"
                        type="number"
                        name="price"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "block",
                          width: "100%",
                          paddingRight: "1rem",
                        }}
                      >
                        <InputLabel>Gender</InputLabel>
                        <Select
                          className="basic-single"
                          isRtl={true}
                          options={genderOptions}
                          onChange={(gender) => pickGender(gender.value)}
                          name="gender"
                        />
                      </div>

                      <div style={{ display: "block", width: "100%" }}>
                        <InputLabel>Vendor</InputLabel>
                        <Select
                          className="basic-single"
                          isRtl={true}
                          options={vendors}
                          onChange={(e) => setVendor(e.value)}
                          name="gender"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Box m={2} />

              <ImageUploader setImages={setImages} images={images} />

              {/* inventory input for sizes and colors */}
              <Paper
                style={{
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  textAlign: "left",
                }}
              >
                <Typography>Inventory</Typography>
                <div style={{ textAlign: "left" }}>
                  {sizes.map((tag) => (
                    <Typography
                      style={{
                        // backgroundColor: "white",
                        color: "grey",
                        verticalAlign: "middle",
                        height: "36px",
                      }}
                      className={classes.sizeTag}
                      variant="body1"
                      key={tag.id}
                    >
                      {tag.size}
                      <button
                        className={classes.tagButton}
                        // style={{
                        //   // backgroundColor: tag.color,
                        //   // color: "white",
                        //   height: "90%",
                        // }}
                        key={tag.id}
                        value={tag}
                        onClick={() => removeProductSize(tag)}
                      >
                        <DeleteForeverIcon color="inherit" fontSize="small" />
                      </button>
                    </Typography>
                  ))}
                </div>

                <div
                  style={{ borderRadius: "0px" }}
                  className={classes.divContainerForItemSize}
                >
                  <TextField
                    type="text"
                    label="size"
                    size="small"
                    className={classes.input}
                    variant="outlined"
                    onChange={(e) => setSizeInput(e.target.value)}
                    value={sizeInputForTag}
                  />
                  <br />
                  <TextField
                    type="number"
                    label="quantity"
                    size="small"
                    className={classes.input}
                    variant="outlined"
                    onChange={(e) => setVariantQuantity(Number(e.target.value))}
                    value={variantQuantity}
                  />
                  <TextField
                    type="text"
                    label="color"
                    size="small"
                    className={classes.input}
                    variant="outlined"
                    onChange={(e) => setVariantColor(e.target.value)}
                    value={variantColor}
                  />
                  {/* <Button
                    onClick={() => {
                      addSizeVariant();
                      setVariantColor("");
                      setVariantQuantity(0);
                    }}
                    style={{ verticalAlign: "center" }}
                  >
                    add variant
                  </Button> */}
                  <br />
                  {variant.map((type) => (
                    <div className={classes.variantBox} key={type.color}>
                      <span>
                        {type.color} | {type.quantity}
                      </span>
                    </div>
                  ))}

                  <br />
                  <Button onClick={addProductVariation} variant="contained">
                    Add Product Size
                  </Button>
                </div>
              </Paper>
              <Paper
                style={{
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  textAlign: "left",
                }}
              >
                <Typography>Product Tags</Typography>
                {/* <CreatableSelect
                  isClearable
                  onChange={(e) => setTagInput(e.target.value)}
                  options={tags}
                /> */}
                <TextField
                  type="text"
                  label="tags"
                  variant="outlined"
                  size="small"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      pushToTagArray();
                    }
                  }}
                  onChange={(e) => setTagInput(e.target.value)}
                  value={tagInput}
                  // onEnter={pushToTagArray}
                />
                {/* <Button onClick={pushToTagArray}>
                  <Typography>Add</Typography>
                </Button> */}
                <div style={{ display: "inline" }}>
                  {tags.map((tag) => (
                    <div
                      style={{
                        margin: "5px",
                        padding: "5px",
                        borderRadius: "2px",
                        backgroundColor: "lightblue",
                        display: "inline",
                        height: "36px",
                        fontSize: "16px",
                      }}
                    >
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </Paper>
              {/* for adding vendor */}
              {/* <Typography>Vendor</Typography>
              <TextField
                className={classes.marginBottom}
                style={{ width: "30%" }}
                variant="outlined"
                size="small"
                label="select"
                select
                onChange={(e) => setVendor(e.target.value)}
                value={vendor}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.name} value={vendor.name}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </TextField> */}

              {/* <InputLabel>Amount</InputLabel>
              <Input
                className={classes.marginBottom}
                type="number"
                name="price"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              ></Input> */}
              <br />
              <Typography className={classes.text}>
                Quantity: {totalQuantity}
              </Typography>
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                className={classes.newItemBtn}
              >
                Submit
              </Button>
            </form>
          </Container>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
}
