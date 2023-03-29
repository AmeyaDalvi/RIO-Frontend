import React from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Price from "components/Filter/Price"



export default function Filter() {
    const [value, setValue] = React.useState(2);
    <Rating
      name="simple-controlled"
      value={4}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection:'column',
            width: 150,
            margin: 5
          }
        }
      >
        <h2>Filters</h2>
        <Divider />
        <br></br>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"><h3 class="MuiTypography-root MuiTypography-h3 MuiTypography-noWrap css-ka8hcd">Ratings</h3></FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="4"
            >
              <FormControlLabel value="4" control={<Radio />}  label={<div style={{ display: "flex", alignItems: "center" }}><Rating  name="disabled" value={4} readOnly/>{"&up"}</div>}/>
              <FormControlLabel  value="3" control={<Radio />} label={<div style={{ display: "flex", alignItems: "center" }}><Rating  name="disabled" value={3} readOnly/>{"&up"}</div>}  />
              <FormControlLabel  value="2" control={<Radio />} label={<div style={{ display: "flex", alignItems: "center" }}><Rating  name="disabled" value={2} readOnly/>{"&up"}</div>}  />
              <FormControlLabel  value="1" control={<Radio />} label={<div style={{ display: "flex", alignItems: "center" }}><Rating  name="disabled" value={1} readOnly/>{"&up"}</div>} />
            </RadioGroup>
          </FormControl>
          <br></br>
          <div class FormControl>
            <FormLabel id="demo-radio-buttons-group-label"><h3 class="MuiTypography-root MuiTypography-h3 MuiTypography-noWrap css-ka8hcd">Price range</h3>
          </FormLabel>
            <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 150,
          },
        }}>
            <Price/>  
            </Box>
          </div>
      </Box>
    </div>
  );
};

