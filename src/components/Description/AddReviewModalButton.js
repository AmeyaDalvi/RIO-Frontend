import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Modal, IconButton, Divider, TextField, Rating, Snackbar, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";
import { baseUrl } from 'utils/baseUrl';

const AddReviewModalButton = ({userid, productid}) => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    const submitBtnHandler = async() => {

        if(rating == 0 || !review) {
            setErrorSnackbar(true);
            return;
        }

        const res = await fetch(
            baseUrl + `/insertprodreviews?id=${userid}`,{
              method:"POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                {
                    productid: productid,
                    rating: rating,
                    comment: review
                }),
            }
          )
          if (res.status === 200) {
            console.log("review added successfully")
            setSuccessSnackbar(true);
            setSubmitted(true)
          } else if (res.status === 401) {
            console.log("Unauthorized");
          }
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false);
    };

    const addReviewHandler = () => {
        handleOpen();
    };

    return (
        <Box>
            <Button
                sx=
                {{
                    color: "black",
                    border: "1px solid black",
                    fontSize: "18px",
                    fontWeight: "bold",
                    ":hover": {
                        background: "black",
                        color: "white",
                    },
                    width: "200px",
                }}
                onClick={addReviewHandler}
                >Add Review
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
                    width: 600,
                    height: 420,
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
                    }}
                >
                    <h2>Add Your Review</h2>
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
                        id="outlined-basic-desc"
                        label="Write your review"
                        variant="outlined"
                        placeholder="For ex. Good product"
                        fullWidth
                        type="text"
                        multiline
                        rows={4}
                        font="inherit"
                        value={review}
                        onChange={(e) => {
                          setReview(e.target.value);
                        }}
                        disabled={submitted}
                    />
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Rating name="rating" value={rating} disabled={submitted} size="large"
                         sx={{
                            fontSize: '2.5rem'
                            }} 
                        onChange={(event, newValue) => setRating(newValue)}
                        />
                    </Box>
                    <Button variant="contained" color="primary" disabled={submitted} onClick={submitBtnHandler}
                    sx={{
                      background: "#000000",
                      color: "#ffffff",
                      ":hover": {
                        background: "#000000",
                        color: "#ffffff",
                      },
                    }}>Submit</Button>
                    </Box>
                </Box>
                <Snackbar open={successSnackbar} autoHideDuration={2000} 
                    sx={{ 
                        width: '100%'
                    }}
                    anchorOrigin={{
                        vertical: 'bottom', horizontal: 'center'
                    }} 
                    onClose={() => setSuccessSnackbar(false)}
                    >
                        <Alert severity="success">
                            Rating and comment added successfully!
                        </Alert>
                </Snackbar>
                <Snackbar open={errorSnackbar} autoHideDuration={2000} 
                    sx={{
                        width: '100%'
                    }} 
                    anchorOrigin={{
                        vertical: 'bottom', horizontal: 'center'
                    }}
                    onClose={() => setErrorSnackbar(false)}>
                        <Alert severity="error">
                            All fields are compulsory!
                        </Alert>
                </Snackbar>
                </Box>
            </Modal>
      </Box>
    )
};

export default AddReviewModalButton;