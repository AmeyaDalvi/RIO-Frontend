//use client;

import React, { useRef } from "react";
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
import { baseUrl } from "utils/baseUrl";
// import LocationMap from "components/ProductDescription/LocationMap";

const RentModalButton = ({ price, productId, productStatus }) => {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const verify = Cookies.get("rioUserToken");
  let userInCookie = Cookies.get("rioUser");
  userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;

  console.log("productstatus", productStatus);

  const [error, setError] = useState(false);
  const [nameCardError, setNameCardError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);

  const startDateRef = useRef();
  const endDateRef = useRef();
  const nameCardRef = useRef();
  const cardNumberRef = useRef();
  const expiryDateRef = useRef();
  const cvvRef = useRef();

  const form = useRef();

  const isInputError = () => {
    let errorFlag = false;

    setNameCardError(false);
    setCardNumberError(false);
    setExpiryDateError(false);
    setCvvError(false);
    setError(false);

    if (nameCardRef.current.value === "") {
      setNameCardError(true);
      errorFlag = true;
    }
    if (cardNumberRef.current.value === "") {
      setCardNumberError(true);
      errorFlag = true;
    }
    if (expiryDateRef.current.value === "") {
      setExpiryDateError(true);
      errorFlag = true;
    }
    if (cvvRef.current.value === "") {
      setCvvError(true);
      errorFlag = true;
    }
    return errorFlag;
  };

  useEffect(() => {
    setNameCardError(false);
    setCardNumberError(false);
    setExpiryDateError(false);
    setCvvError(false);
    setError(false);
  }, []);

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
  const handleClose = () => {
    setOpenModal(false);
    setNameCardError(false);
    setCardNumberError(false);
    setExpiryDateError(false);
    setCvvError(false);
    setError(false);
  };
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    costCalculator();
  }, [endDate]);

  const rentDataHandler = (e) => {
    e.preventDefault();
    const isError = isInputError();
    isError && setError(true);
    if (!isError) {
      setOpenModal(false);
      setNameCardError(false);
      setCardNumberError(false);
      setExpiryDateError(false);
      setCvvError(false);
      setError(false);
      rentHandler();
    }
  };

  const rentHandler = async () => {
    try {
      const response = await fetch(
        baseUrl + "/rentaproduct?id=" + userInCookie["user_id"],
        {
          method: "POST",
          body: JSON.stringify({
            productId: productId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + verify,
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {productStatus == 4 ? (
        <Button
          sx={{
            backgroundColor: "#E9ECF1",
            color: "black",
            border: "1px solid black",
            fontSize: "18px",
            fontWeight: "bold",
            width: "100px",
          }}
          disabled={true}
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
            onSubmit={rentDataHandler}
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
              {error && (
                <h4 style={{ color: "red" }}>
                  Fill out all the mandatory fields
                </h4>
              )}
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
                    inputRef={startDateRef}
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
                    inputRef={endDateRef}
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
                {endDate ? (
                  <Box>
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
                        error={nameCardError}
                        inputRef={nameCardRef}
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
                        error={cardNumberError}
                        inputRef={cardNumberRef}
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
                        error={expiryDateError}
                        inputRef={expiryDateRef}
                      />
                      <TextField
                        id="outlined-basic"
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        type="number"
                        placeholder="For ex. 123"
                        error={cvvError}
                        inputRef={cvvRef}
                      />
                    </Stack>
                  </Box>
                ) : (
                  <Box>
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </Stack>
                  </Box>
                )}

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
                      background: "#ffffff",
                      color: "#000000",
                      // borderBottom: "1px solid #666666",
                      boxShadow: "none",
                      ":hover": {
                        background: "#ffffff",
                        color: "#000000",
                        boxShadow: "none",
                      },
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>

                  {endDate ? (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        background: "#000000",
                        color: "#ffffff",
                        ":hover": {
                          background: "#000000",
                          color: "#ffffff",
                        },
                      }}
                    >
                      Checkout
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        background: "#000000",
                        color: "#ffffff",
                        ":hover": {
                          background: "#000000",
                          color: "#ffffff",
                        },
                      }}
                      disabled
                    >
                      Checkout
                    </Button>
                  )}
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
