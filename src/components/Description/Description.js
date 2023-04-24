import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { baseUrl } from "utils/baseUrl";
import Container from "@mui/material/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Cookies from "js-cookie";
import { Collapse, Input, Stack, TextField, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import Snackbar from "@mui/material/Snackbar";

import { Button, Rating } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import RentModalButton from "./RentModalButton";
import UserChat from "components/Chat/UserChat";
import ChatButton from "components/Chat/ChatButton";
import Comments from "components/Description/Comments";
import Recommendation from "components/Description/Recommendation";
import AddReviewModalButton from "./AddReviewModalButton";

import AddUserComplaintModalButton from "components/Complaint/AddUserComplaintModalButton";

import { UserContext } from "store/UserContext";

const LocationMap = dynamic(
  () => import("components/ProductDescription/LocationMap"),
  { ssr: false }
);

// const DemoContainer = dynamic(
//   () => import("@mui/x-date-pickers/internals/demo"),
//   { ssr: false }
// );

export default function Description({ pid }) {
  const router = useRouter();
  // const { productId } = router.query;
  const verify = Cookies.get("rioUserToken");
  const userCtx = useContext(UserContext);

  const openSnackbar = userCtx.snackBar;

  const rentBtnHandler = () => {
    handleOpen();
    if (verify === undefined) {
      setOpen(true);
    }
  };

  const [product, setProduct] = useState(0);
  const [seller, setSeller] = useState(0);
  const [sellerId, setSellerId] = useState(0);
  const [address, setAddress] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [open, setOpen] = useState(false);
  const [productStatus, setProductStatus] = useState(0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [totalCost, setTotalCost] = useState(0);

  let userInCookie = Cookies.get("rioUser");
  userInCookie = userInCookie !== undefined ? JSON.parse(userInCookie) : null;
  const tokenInCookie = Cookies.get("rioUserToken");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setIsUser] = useState({});

  useEffect(() => {
    checkUserInCookie();
  }, [tokenInCookie]);

  const checkUserInCookie = () => {
    if (tokenInCookie) {
      setIsUserLoggedIn(true);
      setIsUser(userInCookie);
    } else {
      setIsUserLoggedIn(false);
      setIsUser({});
    }
  };

  useEffect(() => {
    fetchProductHandler(pid);
    setProduct({});
  }, []);

  useEffect(() => {
    costCalculator();
  }, [endDate]);

  const costCalculator = () => {
    let d1 = new Date(startDate).toISOString().split("T")[0];
    let d2 = new Date(endDate).toISOString().split("T")[0];
    const diffTime = Math.abs(new Date(d2) - new Date(d1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalCost(diffDays === 0 ? 1 * product.price : diffDays * product.price);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    userCtx.setSnackBar(false);
  };

  let fetchProductHandler = async (productId) => {
    try {
      const res = await fetch(baseUrl + "/getsellerid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productid: productId }),
      });
      if (res.status === 200) {
        const udata = await res.json();
        console.log("SELLER ID - ", udata[0]["UserID"]);
        setSellerId(udata[0]["UserID"]);
      } else if (res.status === 401) {
        console.log("Unauthorized");
      }

      const response = await fetch(
        baseUrl + `/getproduct?productid=${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setProduct(data);
        console.log("PRODUCT - ", data);
        setAddress(
          data.SIStreet +
            " " +
            data.SICity +
            " " +
            data.SIState +
            " " +
            data.SICountry +
            " " +
            data.SIZip
        );
        setSeller({
          id: sellerId,
          name: data.SIName,
          welcomeMessage: "Hey there!",
          role: "default",
        });
      } else if (response.status === 401) {
        console.log("Unauthorized");
      } else if (response.status === 403) {
        console.log("Forbidden");
      }
    } catch (error) {
      console.log(error);
    }

    const productStatus = await fetch(
      baseUrl +
        `/getrentedproductstatus?id=${userInCookie["user_id"]}&product_id=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (productStatus.status === 200) {
      const pstatus = await productStatus.json();
      setProductStatus(pstatus[0]["Result"]);
    } else if (productStatus.status === 401) {
      console.log("Unauthorized");
    }
  };

  return (
    <Container
      sx={{ height: "100vh", pt: "3rem", px: "3rem", pb: "0rem" }}
      maxWidth="lg"
    >
      {(product !== 0) & (address !== "") && (
        <Box>
          <Box
            // sx={{ paddingTop: "2rem" }}
            display="flex"
            flexDirection={{ xs: "column", sm: "column", md: "row", md: "row" }}
            justifyContent={{
              xs: "center",
              sm: "center",
              md: "center",
              lg: "center",
            }}
            alignItems={{
              xs: "center",
              sm: "center",
              md: "initial",
              lg: "initial",
            }}
            // border="2px solid red"
            mb="1rem"
            sx={{
              maxHeight: "100%",
            }}
          >
            <Box
              sx={{
                // aspectRatio: "16/9",
                // boxShadow: "rgb(0 0 0 / 0.06) 0px 0px 20px 6px",
                height: "100%",
                // border: "2px solid red",
              }}
              marginBottom={{ xs: "4rem", sm: "4rem" }}
              maxWidth={{ xs: "400px", sm: "400px", md: "580px", lg: "580px" }}
              // aspectRatio="16/9"
              // border="2px solid red"
            >
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {/* <SwiperSlide style={{ height: "300px", weight: "600px" }}>
                  <img
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={product.img}
                  />
                </SwiperSlide>
                <SwiperSlide style={{ height: "300px", weight: "600px" }}>
                  <img
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={product.img}
                  />
                </SwiperSlide> */}

                {product["img"].map((img) => (
                  <SwiperSlide style={{ height: "300px", weight: "600px" }}>
                    <img
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={img}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box
              sx={{
                // paddingTop: "0.2rem",
                // border: "2px solid red",
                width: "100%",
                flexDirection: "column",
                // boxShadow: "rgb(0 0 0 / 0.06) 0px 0px 20px 6px",
              }}
              pl={{ xs: "0px", sm: "0px", md: "4rem", lg: "4rem" }}
              mt={{
                xs: "0px",
                sm: "0px",
                md: "1rem",
                lg: "1rem",
              }}
              // border="2px solid red"
            >
              <h1>{product.pname}</h1>
              {productStatus == 1 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AddReviewModalButton
                    userid={userInCookie["user_id"]}
                    productid={product.pid}
                  />
                  <AddUserComplaintModalButton
                    userid={userInCookie["user_id"]}
                    productid={product.pid}
                  />
                </Box>
              ) : (
                console.log("user not logged in")
              )}
              <Rating
                readOnly
                name="precision-rating"
                value={product.rating ? product.rating : 0}
                precision={0.5}
                sx={{
                  fontSize: "1.5rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "#555",
                }}
              />
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                Price: ＄{product.price}.00
              </Box>
              <Box
                sx={{
                  fontSize: "1rem",
                  marginTop: "0.7rem",
                  marginBottom: "0.7rem",
                }}
              >
                <b>Category:</b> &nbsp;{product.category}
              </Box>

              <Box
                sx={{
                  fontSize: "1rem",
                  marginTop: "0.7rem",
                  marginBottom: "0.7rem",
                }}
              >
                <b>Description:</b> &nbsp;{product.desc}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <RentModalButton
                  price={product.price}
                  productId={product.pid}
                  productStatus={productStatus}
                />
                {isUserLoggedIn ? (
                  <ChatButton otherUser={seller} />
                ) : (
                  console.log("chat not available")
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: "1.2rem",
              marginBottom: "0.7rem",
            }}
            pt={{ xs: "3rem", sm: "3rem", md: "0", lg: "0" }}
            mt={{ xs: "0rem", sm: "0rem", md: "-2rem", lg: "-2rem" }}
          >
            <Box sx={{ fontWeight: "bold" }}>Seller Information:</Box>
            <Box
              sx={{
                fontSize: "1rem",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <b>Name:</b>
              &nbsp;{product.SIName}
            </Box>
            <Box
              sx={{
                fontSize: "1rem",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <b>Contact Info:</b>
              &nbsp;{product.SIContact}
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: "1.2rem",
              // fontWeight: "bold",
              marginBottom: "0.7rem",
              mt: "4rem",
            }}
          >
            <b>Seller Location:</b>
            <Box
              sx={{
                fontSize: "1rem",
                marginTop: "0.7rem",
                marginBottom: "0.7rem",
              }}
            >
              {address}
            </Box>
            <br></br>
            <LocationMap lat={product.SILat} lon={product.SILon} />
          </Box>
          <Box>
            <Comments productID={product.pid} />
          </Box>
          <Box>
            <Recommendation
              productCategory={product.category}
              productId={product.pid}
            />
          </Box>
          {/* {isUserLoggedIn ? (
            <Box
              sx={{
                fontSize: "1rem",
                marginTop: "0.7rem",
                marginBottom: "0.7rem",
                position: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AddReviewModalButton
                userid={userInCookie["user_id"]}
                productid={product.pid}
              />
            </Box>
          ) : (
            console.log("user not logged in")
          )}*/}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackBar}
              sx={{
                width: "100%",
                color: "#fff",
                backgroundColor: "#333",
                borderRadius: "15px",
              }}
            >
              Product Added Succesfully!
            </Alert>
          </Snackbar>
        </Box>
      )}
    </Container>
  );
}
