import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { addTag, addItemToInventory } from "./storeFunctions";
import uid from "uid";
import { useStyles } from "./styles";
import { useAlert } from "react-alert";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//add endpoint to API
const vendors = [{ name: "oneDAM" }, { name: "test" }];

export default function AddItem(props) {
  const [name, setName] = useState("");
  const [uploadMultiplePhotos, setUploadMultiplePhotos] = useState(false);
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [color, setColor] = useState("");
  // for all colors populated for individual size/color inputs
  const [colors, setColors] = useState([]);
  const [gender, setGender] = useState("");
  const [sizes, setSizes] = useState([]);
  const [vendor, setVendor] = useState("");
  const [redirectToHome, setRedirect] = useState(false);

  //hooks for individual images
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");
  const [imageFive, setImageFive] = useState("");
  const [imageSix, setImageSix] = useState("");

  //for making tags and pushing to sizes array and totalQuantity
  const [sizeInputForTag, setSizeInput] = useState("");
  const [quantityInputForTag, setQuantity] = useState(0);

  //hook for opening menu.
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const imageList = [
    { upload: setImageTwo },
    { upload: setImageThree },
    { upload: setImageFour },
    { upload: setImageFive },
    { upload: setImageSix },
  ];

  const genders = ["male", "female", "unisex"];

  //should probably move over to storeFunctions at some point
  const removeTag = (target) => {
    setColors((prevState) =>
      prevState.filter((color) => color !== target.color)
    );
    setSizes(() => sizes.filter((tag) => tag.id !== target.id));
  };

  const alert = useAlert();

  const submitForm = (e) => {
    e.preventDefault();

    const imageArray = [
      imageOne,
      imageTwo,
      imageThree,
      imageFour,
      imageFive,
      imageSix,
    ];
    addItemToInventory(
      imageArray,
      props.accessToken,
      name,
      price,
      description,
      totalQuantity,
      colors,
      sizes,
      vendor,
      gender,
      setRedirect,
      alert
    );
  };

  const pickGender = (gender) => {
    setGender(gender);
    setOpenMenu(false);
    setAnchorEl(null);
  };

  const genderMenu = (e) => {
    setOpenMenu(true);
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    let count = 0;
    if (sizes.length === 0) return setTotalQuantity(0);
    sizes.forEach((size) => (count += parseInt(size.quantity)));
    return setTotalQuantity(count);
  }, [sizes]);

  return (
    <React.Fragment>
      {!redirectToHome ? (
        <Paper style={{ textAlign: "center", width: "80%" }}>
          <Container className={classes.container}>
            <form onSubmit={(e) => submitForm(e)}>
              <Typography className={classes.text}>Name</Typography>
              <TextField
                variant="outlined"
                size="small"
                className={classes.marginBottom}
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></TextField>

              <Typography className={classes.text}>Description</Typography>
              <TextField
                className={classes.marginBottom}
                variant="filled"
                size="small"
                multiline
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></TextField>
              {/* for uploading photos */}
              <Typography className={classes.text}>
                Images (***upload main image first)
              </Typography>
              <span>1: </span>
              <Input
                className={classes.marginBottom}
                variant="outlined"
                size="small"
                type="file"
                accept="image/*"
                name={uid()}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageOne(file);
                }}
              />
              {uploadMultiplePhotos === false ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setUploadMultiplePhotos(true)}
                >
                  add more
                </Button>
              ) : (
                imageList.map((newImage) => (
                  <React.Fragment key={uid()}>
                    <br />
                    <span>{imageList.indexOf(newImage) + 2}:</span>
                    <Input
                      key={newImage}
                      className={classes.marginBottom}
                      variant="outlined"
                      size="small"
                      type="file"
                      accept="image/*"
                      name={uid()}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        newImage.upload(file);
                      }}
                    />
                  </React.Fragment>
                ))
              )}
              <hr />
              <br />
              {/* Gender Picker */}
              <div
                style={{
                  textAlign: "left",
                  display: "inline-block",
                  width: "80%",
                }}
              >
                <Button
                  className={classes.genderBtn}
                  onClick={(e) => genderMenu(e)}
                >
                  {" "}
                  Gender
                </Button>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
                  {genders.map((gender) => (
                    <MenuItem onClick={() => pickGender(gender)} key={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Menu>
                <Typography className={classes.genderView}>{gender}</Typography>
              </div>
              {/* inventory input for sizes and colors */}
              <Typography className={classes.text}>Inventory</Typography>
              <div style={{ textAlign: "left" }}>
                {sizes.map((tag) => (
                  <Typography
                    style={{ backgroundColor: tag.color }}
                    className={classes.sizeTag}
                    variant="body1"
                    key={tag.id}
                  >
                    {tag.size}
                    <button
                      className={classes.tagButton}
                      style={{ backgroundColor: tag.color }}
                      key={tag.id}
                      value={tag}
                      onClick={() => removeTag(tag)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </Typography>
                ))}
              </div>

              <div className={classes.divContainerForItemSize}>
                <TextField
                  type="text"
                  label="size"
                  className={classes.input}
                  variant="outlined"
                  onChange={(e) => setSizeInput(e.target.value)}
                  value={sizeInputForTag}
                />
                <TextField
                  type="number"
                  label="quantity"
                  className={classes.input}
                  variant="outlined"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantityInputForTag}
                />
                <TextField
                  type="text"
                  label="color"
                  className={classes.input}
                  variant="outlined"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                />

                <Button
                  onClick={() => {
                    addTag(
                      sizeInputForTag,
                      quantityInputForTag,
                      color,
                      setSizes,
                      setColors
                    );
                    setSizeInput("");
                    setQuantity(0);
                    setColor("");
                  }}
                >
                  add
                </Button>
              </div>
              {/* for adding vendor */}
              <Typography className={classes.text}>Vendor</Typography>
              <TextField
                className={classes.marginBottom}
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
              </TextField>

              <InputLabel>Amount</InputLabel>
              <Input
                className={classes.marginBottom}
                type="number"
                name="price"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              ></Input>
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
        </Paper>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
}
