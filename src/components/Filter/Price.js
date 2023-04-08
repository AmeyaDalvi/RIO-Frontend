import Slider from "@mui/material/Slider";
import React from "react";

const minDistance = 10;

const marks = [
  {
    value: 0,
    label: "0$",
  },
  {
    value: 100,
    label: "10000$",
  },
];

export default function Price() {
  const [value, setValue] = React.useState([0, 100]);
  const sliderChangeHandler = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };
  return (
    <Slider
      getAriaLabel={() => "Minimum distance"}
      value={value}
      onChange={sliderChangeHandler}
      valueLabelDisplay="auto"
      disableSwap
      marks={marks}
    />
  );
}
