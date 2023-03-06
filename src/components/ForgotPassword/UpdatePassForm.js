import {
  Avatar,
  Box,
  Container,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
} from "@mui/material";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";

export const UpdatePassForm = (props) => {
  const [newPassError, setNewPassError] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [dontMatchError, setDontMatchError] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const emailId = router.query.emailId;

  const newPassRef = useRef();
  const confirmPassRef = useRef();

  useEffect(() => {
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setNewPassError(false);
    setConfirmPassError(false);
    setDontMatchError(false);
  }, []);

  const isInputError = () => {
    let errorFlag = false;
    const newpass = newPassRef.current.value;
    const confirmpass = confirmPassRef.current.value;

    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setNewPassError(false);
    setConfirmPassError(false);
    setDontMatchError(false);

    if (newpass === "") {
      errorFlag = true;
      setNewPassError(true);
    } else if (
      !/[a-z]/.test(newpass) ||
      !/[A-Z]/.test(newpass) ||
      !/[0-9]/.test(newpass)
    ) {
      errorFlag = true;
      setNewPassError(true);
    }

    if (confirmpass === "") {
      errorFlag = true;
      setConfirmPassError(true);
    } else if (
      !/[a-z]/.test(confirmpass) ||
      !/[A-Z]/.test(confirmpass) ||
      !/[0-9]/.test(confirmpass)
    ) {
      errorFlag = true;
      setConfirmPassError(true);
    } else if (confirmpass !== newpass) {
      errorFlag = true;
      setDontMatchError(true);
    }

    return errorFlag;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const isError = isInputError();

    if (!isError) {
      const userData = {
        emailId: emailId,
        newpass: newPassRef.current.value,
        confirmpass: confirmPassRef.current.value,
      };
      setNewPassError(false);
      setConfirmPassError(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setDontMatchError(false);

      props.onUpdatePassFormSubmit(userData);
    }
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <h1>Update Password</h1>

      {props.invalidError && (
        <Alert severity="error">Please enter valid credentials!</Alert>
      )}
      {props.responseError && (
        <Alert severity="error">There was some error. Try again!</Alert>
      )}

      <Container maxWidth="sm">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
          mt={2}
          px={6}
        >
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <TextField
              // className={passwordError ? classes.errorText : classes.inpuText}
              sx={{
                "& label.Mui-focused": {
                  color: "#000",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#000",
                },
              }}
              id="outlined-adornment-password1"
              type={showNewPassword ? "text" : "password"}
              label="New Password *"
              variant="filled"
              fullWidth
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={newPassError}
              helperText={newPassError && "Must Contain (a-z, A-z, 0-9)"}
              inputRef={newPassRef}
            />
            <TextField
              // className={passwordError ? classes.errorText : classes.inpuText}
              sx={{
                "& label.Mui-focused": {
                  color: "#000",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#000",
                },
              }}
              id="outlined-adornment-password2"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password *"
              variant="filled"
              fullWidth
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={confirmPassError || dontMatchError}
              helperText={
                (confirmPassError && "Must Contain (a-z, A-z, 0-9)") ||
                (dontMatchError && "Password doesn't match")
              }
              inputRef={confirmPassRef}
            />
          </Stack>

          <Box
            mt={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "5px !important",
                marginBottom: "2rem !important",
                fontSize: "18px !important",
                backgroundColor: "#000 !important",
                fontWeight: "bold !important",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
