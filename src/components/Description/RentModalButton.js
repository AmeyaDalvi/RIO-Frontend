import React from "react";
import { Box } from "@mui/system";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Rating,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Alert } from "@mui/material";
import { UserContext } from "store/UserContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// import LocationMap from "components/ProductDescription/LocationMap";

const RentModalButton = ({ price, productStatus }) => {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const verify = Cookies.get("rioUserToken");

  const rentBtnHandler = () => {
    handleOpen();
    if (verify === undefined) {
      setOpen(true);
    }
  };
  const costCalculator = () => {
    let d1 = new Date(startDate).toISOString().split("T")[0];
    let d2 = new Date(endDate).toISOString().split("T")[0];
    const diffTime = Math.abs(new Date(d2) - new Date(d1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalCost(diffDays === 0 ? 1 * price : diffDays * price);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    costCalculator();
  }, [endDate]);

  return (
    <Box>
      {productStatus == 1 ? (
        <Button
        sx={{
          backgroundColor: "#E9ECF1",
          color: "black",
          border: "1px solid black",
          fontSize: "18px",
          fontWeight: "bold",
          width: "100px",
        }}
        disabled = {true}
      >
        Rented
      </Button>
      ) : (
        <Button
        sx={{
          color: "black",
          border: "1px solid black",
          fontSize: "18px",
          fontWeight: "bold",
          ":hover": {
            background: "black",
            color: "white",
          },
          width: "80px",
        }}
        onClick={rentBtnHandler}
      >
        Rent
      </Button>
      )}
      {verify === undefined ? (
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
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Alert
              severity="error"
              action={
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
              }
            >
              Please Login First to Rent!
            </Alert>
          </Box>
        </Modal>
      ) : (
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
              height: 580,
              bgcolor: "background.paper",
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
                marginBottom: "0.7rem",
              }}
            >
              <h2>Rent Product</h2>
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
                alignItems: "flex-start",

                justifyContent: "center",
                marginBottom: "1.5rem",
                marginTop: "1rem",
                gap: "1rem",
              }}
            >
              Select Date:
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newVal) => {
                      setStartDate(newVal);
                    }}
                    minDate={dayjs(new Date())}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newVal) => {
                      setEndDate(newVal);
                    }}
                    minDate={startDate}
                    disabled={startDate !== null ? false : true}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h3>Total Price:</h3>
              <h2 style={{ color: "green" }}>
                ＄{totalCost ? totalCost : 0}.00
              </h2>
            </Box>
            <Divider variant="middle" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              Payment Details:
              <Box
                component="form"
                noValidate
                autoComplete="off"
                mt={2}
                py={2}
                width="100%"
              >
                <Stack
                  display="flex"
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  mb="2rem"
                >
                  <TextField
                    id="outlined-basic"
                    label="Name on Card"
                    variant="outlined"
                    placeholder="For ex. John Doe"
                    fullWidth
                    type="text"
                    // onChange={(e) => {
                    //   setCardName(e.target.value);
                    // }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Card Number"
                    variant="outlined"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    fullWidth
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
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
                    id="outlined-basic"
                    label="Expiry Date"
                    variant="outlined"
                    fullWidth
                    type="text"
                    placeholder="For ex. 10/26"
                    inputProps={{
                      pattern: "[0-9]*/[0-9]*",
                    }}
                    // onChange={(e) => { d
                    //   setExpiryDate(e.target.value);
                    // }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    type="number"
                    placeholder="For ex. 123"
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
      )}
    </Box>
  );
};

export default RentModalButton;
