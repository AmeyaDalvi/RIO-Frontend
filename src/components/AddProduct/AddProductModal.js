import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  Stack,
  duration,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { UserContext } from "store/UserContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { baseUrl } from "utils/baseUrl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// import LocationMap from "components/ProductDescription/LocationMap";

const RentModalButton = ({ price }) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedDuration, setSelectedDuration] = useState("Duration");
  const [address, setAddress] = useState([]);
  const [isUser, setIsUser] = useState({});
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  let userInCookie = Cookies.get("rioUser");
  userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
  const tokenInCookie = Cookies.get("rioUserToken");

  useEffect(() => {
    checkUserInCookie();
  }, [tokenInCookie]);

  useEffect(() => {
    console.log("address", address);
  }, [address]);

  const checkUserInCookie = () => {
    userInCookie ? setIsUser(userInCookie) : setIsUser({});
  };

  const handleCategoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDurationClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCategoryCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleDurationCloseAnchor = () => {
    setAnchorEl2(null);
  };

  const handleCategorySelection = (category) => {
    category === ""
      ? setSelectedCategory("Category")
      : setSelectedCategory(category);
    setAnchorEl(null);
  };

  const handleDurationSelection = (duration) => {
    duration === ""
      ? setSelectedDuration("Duration")
      : setSelectedDuration(duration);
    setAnchorEl2(null);
  };

  const addProductHandler = () => {
    handleOpen();
  };

  const defaultAddressHandler = async (pid) => {
    try {
      const response = await fetch(
        baseUrl + "/getuprofile?id=" + userInCookie["user_id"],
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenInCookie,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("data", data[0]);

        setAddress([
          data[0].Street,
          data[0].City,
          data[0].State,
          data[0].Country,
          data[0].Zip,
        ]);
      } else if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 403) {
        console.log("Forbidden");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Button
        sx={{
          ml: 2,
          display: { xs: "none", sm: "none", md: "block" },
          color: "black",
          fontWeight: "400",
          ":hover": {
            background: "black",
            color: "white",
          },
        }}
        onClick={addProductHandler}
      >
        Add Product
      </Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 550,
            height: 680,
            backgroundColor: "#fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              // marginBottom: "0.7rem",
            }}
          >
            <h2>Add Product</h2>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          </Box>
          <Divider variant="middle" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "1rem",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <TextField
                id="outlined-basic-title"
                label="Product Title"
                variant="outlined"
                placeholder="For ex. Guitar"
                fullWidth
                type="text"
                font="inherit"
                // onChange={(e) => {
                //   setCardName(e.target.value);
                // }}
              />
              <TextField
                id="outlined-basic-desc"
                label="Product Description"
                variant="outlined"
                placeholder="For ex. Nice Guitar!"
                fullWidth
                type="text"
                font="inherit"
                multiline
                rows={4}
              />
            </Box>
            <Stack
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              mb="2rem"
            >
              <Box>
                <Button
                  id="demo-customized-button"
                  // aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  // aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleCategoryClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "#666666",
                    width: "10rem",
                    height: "3.5rem",
                    background: "#FFFFFF",
                    border: "1px solid #C4C4C4",
                    "&:hover": {
                      background: "#fff",
                      border: "1px solid #666666",
                    },

                    textTransform: "none",
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
                      backgroundColor: "#FFFFFF",
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
                  onClose={handleCategoryCloseAnchor}
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
              <Box>
                <Button
                  id="demo-customized-button"
                  // aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  // aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleDurationClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "#666666",
                    width: "10rem",
                    height: "3.5rem",
                    background: "#FFFFFF",
                    border: "1px solid #C4C4C4",
                    "&:hover": {
                      background: "#fff",
                      border: "1px solid #666666",
                    },

                    textTransform: "none",
                  }}
                >
                  {selectedDuration}
                </Button>
                <Menu
                  elevation={0}
                  sx={{
                    "& .MuiPaper-root": {
                      border: "1px solid #d3d4d5",
                      width: "20ch",
                      backgroundColor: "#FFFFFF",
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
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleDurationCloseAnchor}
                >
                  <MenuItem
                    onClick={() => {
                      handleDurationSelection("");
                    }}
                    disableRipple
                  >
                    Duration
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDurationSelection("Day");
                    }}
                    disableRipple
                  >
                    Day
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDurationSelection("Month");
                    }}
                    disableRipple
                  >
                    Month
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDurationSelection("Year");
                    }}
                    disableRipple
                  >
                    Year
                  </MenuItem>
                </Menu>
              </Box>
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Price"
                />
              </FormControl>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              Payment Location:
              <Button
                variant="contained"
                sx={{
                  background: "#000000",
                  color: "#ffffff",
                  ":hover": {
                    background: "#000000",
                    color: "#ffffff",
                  },
                }}
                onClick={defaultAddressHandler}
              >
                Use Default Address
              </Button>
            </Box>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              // mt={2}
              py={2}
              width="100%"
            >
              <Stack
                display="flex"
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                mb={2}
              >
                {console.log(address)}
                <TextField
                  id="outlined-controlled"
                  label="Street"
                  variant="outlined"
                  placeholder="123 E John Hinkle"
                  fullWidth
                  type="text"
                  value={address.length !== 0 ? address[0] : ""}
                  // onChange={(e) => {
                  //   setCardName(e.target.value);
                  // }}
                />
                <TextField
                  id="outlined-controlled"
                  label="City"
                  variant="outlined"
                  placeholder="Bloomington"
                  fullWidth
                  type="text"
                  value={address.length !== 0 ? address[1] : ""}
                  // onChange={(e) => {
                  //   setCardNumber(e.target.value);
                  // }}
                />
                <TextField
                  id="outlined-controlled"
                  label="State"
                  variant="outlined"
                  placeholder="Indiana"
                  fullWidth
                  type="text"
                  value={address.length !== 0 ? address[2] : ""}
                  // onChange={(e) => {
                  //   setCardNumber(e.target.value);
                  // }}
                />
              </Stack>
              <Stack
                display="flex"
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                mb="2rem"
              >
                <TextField
                  id="outlined-controlled"
                  label="Zip"
                  variant="outlined"
                  fullWidth
                  type="number"
                  placeholder="47408"
                  value={address.length !== 0 ? address[4] : ""}
                  // onChange={(e) => { d
                  //   setExpiryDate(e.target.value);
                  // }}
                />
                <TextField
                  id="outlined-controlled"
                  label="Country"
                  variant="outlined"
                  fullWidth
                  type="text"
                  placeholder="US"
                  value={address.length !== 0 ? address[3] : ""}
                  // onChange={(e) => {
                  //   setCvv(e.target.value);
                  // }}
                />
                <TextField
                  id="outlined-basic"
                  label="Contact Info"
                  variant="outlined"
                  fullWidth
                  type="number"
                  placeholder="8126711325"
                  // onChange={(e) => {
                  //   setCvv(e.target.value);
                  // }}
                />
              </Stack>
              <Stack
                display="flex"
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Button
                  variant="contained"
                  sx={{
                    background: "#000000",
                    color: "#ffffff",
                    ":hover": {
                      background: "#000000",
                      color: "#ffffff",
                    },
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#000000",
                    color: "#ffffff",
                    ":hover": {
                      background: "#000000",
                      color: "#ffffff",
                    },
                  }}
                  // onClick={handleRent}
                >
                  Checkout
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RentModalButton;
