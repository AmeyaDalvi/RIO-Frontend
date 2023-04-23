import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Modal, IconButton, Divider, TextField, Rating, Snackbar, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";
import { baseUrl } from 'utils/baseUrl';

const AddUserComplaintModalButton = ({userid, productid}) => {

    const [complaint, setComplaint] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);

    const submitBtnHandler = async() => {

        if(!complaint) {
            setErrorSnackbar(true);
            return;
        }

        const res = await fetch(
            baseUrl + `/fileacomplaint?id=${userid}&product_id=${productid}`,{
              method:"POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                {
                    description: complaint
                }),
            }
          )
          if (res.status === 200) {
            console.log("complaint added successfully")
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

    const addComplaintHandler = () => {
        handleOpen();
    };

    return (
        <Box>
            <Button
                sx=
                {{
                    backgroundColor: "inherit",
                    minWidth: 0,
                    width: 'auto',
                    color: "#D58219",
                    fontSize: "15px",
                    fontWeight: "bold",
                    position: "left",
                    display: 'flex',
                    justifyContent: 'left',
                    padding: 0,
                    ":hover": {
                        background: "inherit",
                        color: "#2E3E8C",
                    },
                }}
                onClick={addComplaintHandler}
                ><u>Add Complaint</u>
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
                    width: 500,
                    height: 380,
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
                    <h2>Add Your Complaint</h2>
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
                        label="Write your complaint"
                        variant="outlined"
                        placeholder="For ex. Bad product"
                        fullWidth
                        type="text"
                        multiline
                        rows={5}
                        font="inherit"
                        value={complaint}
                        onChange={(e) => {
                            setComplaint(e.target.value);
                        }}
                        disabled={submitted}
                    />
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
                            Complaint added.
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
                            Enter complaint before submitting.
                        </Alert>
                </Snackbar>
                </Box>
            </Modal>
      </Box>
    )
};

export default AddUserComplaintModalButton;