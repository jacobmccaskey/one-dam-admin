import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { addTag } from "./storeFunctions";
import uid from "uid";

//add endpoint to API
const vendors = [{ name: "oneDAM" }, { name: "test" }];

const useStyles = makeStyles(() => ({
  container: {
    display: "relative",
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  marginBottom: {
    marginBottom: "2rem",
    width: "90%",
  },
  text: {
    size: "22px",
    textDecoration: "underline",
    color: "grey",
  },
  sizeTag: {
    backgroundColor: "lightgrey",
    borderRadius: "2px",
    width: "4rem",
    display: "inline",
    margin: "10px",
    padding: "3px",
  },
  tagButton: {
    backgroundColor: "gray",
    marginLeft: "4px",
    border: "none",
    verticalAlign: "center",
    borderRadius: "20%",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  divContainerForItemSize: {
    textAlign: "center",
    marginBottom: "2rem",
    width: "100%",
  },
  input: {
    marginRight: "1rem",
    marginTop: "10px",
  },
}));

export default function AddItem() {
  const [name, setName] = useState("");
  const [imageArr, setImageArr] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState([
    // { size: "test", quantity: 100, gender: "male", id: uid() },
  ]);
  const [vendor, setVendor] = useState("");

  //for making tags and pushing to sizes array and totalQuantity
  const [sizeInputForTag, setSizeInput] = useState("");
  const [quantityInputForTag, setQuantity] = useState(0);
  const [genderForTag, setGender] = useState("");

  const classes = useStyles();

  const removeTag = (target) => {
    setSizes(() => sizes.filter((tag) => tag.id !== target));
    console.log(target);
    console.log(sizes);
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let count = 0;
    if (sizes.length === 0) return setTotalQuantity(0);
    sizes.forEach((size) => (count += parseInt(size.quantity)));
    return setTotalQuantity(count);
  }, [sizes]);

  return (
    <div style={{ textAlign: "center" }}>
      <Container className={classes.container}>
        <form onSubmit={submitForm}>
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

          <Typography className={classes.text}>Colors</Typography>
          <Typography className={classes.text} variant="body1">
            separate colors by comma
          </Typography>
          <TextField
            className={classes.marginBottom}
            variant="outlined"
            size="small"
            onChange={(e) => setColors(e.target.value)}
            value={colors}
          />

          <Typography className={classes.text}>
            Images(***upload main image first)
          </Typography>
          <Input
            className={classes.marginBottom}
            variant="outlined"
            size="small"
            type="file"
            name="main-img"
            onChange={(e) => {
              setImageArr(() => [...imageArr, e.target.files]);
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              setImageList([...imageList, parseInt(imageList.length + 1)])
            }
          >
            add more
          </Button>
          {imageList.map((newImage) => (
            <React.Fragment>
              <span>{newImage}:</span>
              <Input
                key={newImage}
                className={classes.marginBottom}
                variant="outlined"
                size="small"
                type="file"
                name={uid()}
                onChange={(e) => {
                  setImageArr(() => [...imageArr, e.target.files[0]]);
                }}
              />
            </React.Fragment>
          ))}
          <hr />
          <br />

          <Typography className={classes.text}>Sizes</Typography>

          {sizes.map((tag) => (
            <Typography
              className={classes.sizeTag}
              variant="body1"
              key={tag.id}
            >
              {tag.size}
              <button
                className={classes.tagButton}
                key={tag.id}
                value={tag.id}
                onClick={(e) => removeTag(e.target.value)}
              >
                X
              </button>
            </Typography>
          ))}
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
              select
              className={classes.input}
              variant="outlined"
              onChange={(e) => setGender(e.target.value)}
              value={genderForTag}
            >
              <MenuItem key="male" value="male">
                Male
              </MenuItem>
              <MenuItem key="female" value="female">
                Female
              </MenuItem>
              <MenuItem key="unisex" value="unisex">
                Unisex
              </MenuItem>
            </TextField>
            <Button
              onClick={() => {
                addTag(
                  sizeInputForTag,
                  quantityInputForTag,
                  genderForTag,
                  sizes,
                  setSizes
                );
                setSizeInput("");
                setQuantity(0);
                setGender("");
              }}
            >
              add
            </Button>
            <Typography className={classes.text}>
              Quantity: {totalQuantity}
            </Typography>
          </div>
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
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          ></Input>
          <br />
          <Button color="primary" variant="outlined">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}
