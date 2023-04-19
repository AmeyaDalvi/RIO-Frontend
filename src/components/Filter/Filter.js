import { React, useContext } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Price from "components/Filter/Price";
import { useState, useEffect } from "react";
import styles from "styles/filter.module.css";
import Slider from "@mui/material/Slider";
import { UserContext } from "store/UserContext";
import { Grid, Stack, TextField } from "@mui/material";

export default function Filter() {
  const userCtx = useContext(UserContext);

  const rating = userCtx.rating;
  const [price, setPrice] = useState(userCtx.price);
  const finalPrice = userCtx.price;

  useEffect(() => {
    setPrice(userCtx.price);
  }, [finalPrice]);

  const ratingHandler = (e) => {
    userCtx.setRating((prev) => {
      return prev === Number(e.target.value) ? 0 : Number(e.target.value);
    });
  };

  const sliderChangeHandler = (event, newValue) => {
    setPrice(newValue);
  };

  const sliderStopHandler = (event, newValue) => {
    userCtx.setPrice(newValue);
  };

  // const minPriceChangeHandler = (event, newValue) => {
  //   const min = [newValue, price[1]];
  //   setPrice(min);
  // };

  // const maxPriceChangeHandler = (event, newValue) => {
  //   const max = [price[0], newValue];
  //   setPrice(max);
  // };

  const marks = [
    {
      value: 0,
      label: "0$",
    },
    {
      value: 10000,
      label: "10000$",
    },
  ];

  return (
    <div className={styles.filter}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 200,
        }}
      >
        <h2>Filters</h2>
        <Divider />
        <br></br>
        <FormControl
          sx={{
            "& .MuiFormLabel-root.Mui-focused": {
              color: "#555",
            },
          }}
        >
          <FormLabel id="demo-radio-buttons-group-label">
            <h3 className="MuiTypography-root MuiTypography-h3 MuiTypography-noWrap css-ka8hcd">
              Ratings
            </h3>
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={rating}
            sx={{
              "& .MuiRadio-colorPrimary.Mui-checked": {
                color: "#555",
              },
            }}
            onClick={ratingHandler}
          >
            <FormControlLabel
              value={4}
              control={<Radio />}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="disabled"
                    sx={{ color: "#555", fontSize: "20px" }}
                    value={4}
                    readOnly
                  />
                  {"&up"}
                </div>
              }
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="disabled"
                    sx={{ color: "#555", fontSize: "20px" }}
                    value={3}
                    readOnly
                  />
                  {"&up"}
                </div>
              }
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="disabled"
                    sx={{ color: "#555", fontSize: "20px" }}
                    value={2}
                    readOnly
                  />
                  {"&up"}
                </div>
              }
            />
            <FormControlLabel
              value={1}
              control={<Radio />}
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    name="disabled"
                    sx={{ color: "#555", fontSize: "20px" }}
                    value={1}
                    readOnly
                  />
                  {"&up"}
                </div>
              }
            />
          </RadioGroup>
        </FormControl>
        <br></br>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            <h3 className="MuiTypography-root MuiTypography-h3 MuiTypography-noWrap css-ka8hcd">
              Price range
            </h3>
          </FormLabel>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 150,
              },
            }}
          >
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={price}
              onChange={sliderChangeHandler}
              onChangeCommitted={sliderStopHandler}
              valueLabelDisplay="auto"
              disableSwap
              sx={{ color: "#555" }}
              marks={marks}
              min={0}
              max={10000}
            />
          </Box>
        </FormControl>
        <br></br>
        <Grid container columnSpacing={2}>
          <Grid item xs={6} sx={{ flexDirection: "column" }}>
            <Stack>
              <span>Min</span>
              <TextField
                readOnly
                size="small"
                id="minpercent"
                variant="outlined"
                value={price[0]}
              />
            </Stack>
          </Grid>
          <Grid item xs={6} sx={{ flexDirection: "column" }}>
            <Stack>
              <span>Max</span>
              <TextField
                readOnly
                size="small"
                id="minpercent"
                variant="outlined"
                value={price[1]}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
