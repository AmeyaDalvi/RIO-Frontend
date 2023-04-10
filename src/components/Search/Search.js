import { React, useState, useContext } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { UserContext } from "store/UserContext";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./../../styles/Search.module.css";

function Search() {
  const userCtx = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Categories");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategorySelection = (category) => {
    category === ""
      ? setSelectedCategory("Categories")
      : setSelectedCategory(category);
    userCtx.setCategory(category);
    setAnchorEl(null);
  };

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    userCtx.setSearchKeyword(lowerCase);
  };

  return (
    <div className={styles.main}>
      <Box sx={{ mr: "1rem" }}>
        <Button
          id="demo-customized-button"
          // aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          // aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            borderRadius: "15px",
            mt: "0.8rem",
            width: "10rem",
          }}
        >
          {selectedCategory}
        </Button>
        <Menu
          elevation={0}
          sx={{
            "& .MuiPaper-root": {
              border: "1px solid #d3d4d5",
              width: "20ch",
              backgroundColor: "#f5f5f5",
              color: "#000000",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleCategorySelection("");
            }}
            disableRipple
          >
            All Categories
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCategorySelection("Vehicle");
            }}
            disableRipple
          >
            Vehicle
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCategorySelection("Property");
            }}
            disableRipple
          >
            Property Rental
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCategorySelection("Apparel");
            }}
            disableRipple
          >
            Apparel
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCategorySelection("Electronics");
            }}
            disableRipple
          >
            Electronics
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCategorySelection("Books");
            }}
            disableRipple
          >
            Books
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCategorySelection("Musical");
            }}
            disableRipple
          >
            Musical Instruments
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCategorySelection("Others");
            }}
            disableRipple
          >
            Others
          </MenuItem>
        </Menu>
      </Box>
      <TextField
        fullWidth
        onChange={inputHandler}
        placeholder="Search product"
        id="standard-basic"
        variant="standard"
        margin="normal"
        autoComplete="off"
        InputProps={{
          autoComplete: "off",
          form: {
            autoComplete: "off",
          },
          endAdornment: (
            <IconButton type="submit">
              <SearchOutlinedIcon />
            </IconButton>
          ),
        }}
      />

      <br></br>
    </div>
  );
}

export default Search;
