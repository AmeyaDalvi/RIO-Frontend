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
import { Button, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useRef, useEffect } from "react";
import GoogleLog from "./GoogleLog";
import Or from "components/extras/Or";
import theme from "theme";
import { useRouter } from "next/router";

export const ForgotForm = (props) => {
  const [emailError, setEmailError] = useState(false);
  const [maidenError, setMaidenError] = useState(false);
  const [artistError, setArtistError] = useState(false);
  const router = useRouter();

  const emailRef = useRef();
  const maidenRef = useRef();
  const artistRef = useRef();

  useEffect(() => {
    setEmailError(false);
    setMaidenError(false);
    setArtistError(false);
  }, []);

  const isInputError = () => {
    let errorFlag = false;
    const email = emailRef.current.value;
    const maiden = maidenRef.current.value;
    const artist = artistRef.current.value;

    setEmailError(false);
    setMaidenError(false);
    setArtistError(false);

    if (email === "") {
      errorFlag = true;
      setEmailError(true);
    } else if (
      (email.match(/@/g) || []).length !== 1 ||
      (email.match(/\./g) || []).length < 1
    ) {
      errorFlag = true;
      setEmailError(true);
    } else if (
      email.indexOf(".") === 0 ||
      email.indexOf("@") === 0 ||
      email.indexOf("-") === 0 ||
      email.indexOf("_") === 0
    ) {
      errorFlag = true;
      setEmailError(true);
    } else if (/[^a-zA-Z0-9.@_-]/.test(email)) {
      errorFlag = true;
      setEmailError(true);
    }

    if (maiden === "") {
      errorFlag = true;
      setMaidenError(true);
    }

    if (artist === "") {
      errorFlag = true;
      setArtistError(true);
    }

    return errorFlag;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const isError = isInputError();

    if (!isError) {
      const userData = {
        emailId: emailRef.current.value,
        maidenName: maidenRef.current.value,
        artistName: artistRef.current.value,
      };
      setEmailError(false);
      setMaidenError(false);
      setArtistError(false);

      props.onForgotFormSubmit(userData);
    }
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
      <h1>Forgot Password</h1>

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
              sx={{
                "& label.Mui-focused": {
                  color: "#000",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#000",
                },
              }}
              required
              id="outlined-required1"
              label="Email Id"
              fullWidth
              variant="filled"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              error={emailError}
              helperText={emailError && "Incorrect Entry."}
              inputRef={emailRef}
            />
            <TextField
              sx={{
                "& label.Mui-focused": {
                  color: "#000",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#000",
                },
              }}
              required
              id="outlined-required2"
              label="What is your Mother's Maiden Name?"
              fullWidth
              variant="filled"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              error={maidenError}
              helperText={maidenError && "Incorrect Entry."}
              inputRef={maidenRef}
            />
            <TextField
              sx={{
                "& label.Mui-focused": {
                  color: "#000",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#000",
                },
              }}
              required
              id="outlined-required3"
              label="Who is your favorite artist?"
              fullWidth
              variant="filled"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              error={artistError}
              helperText={artistError && "Incorrect Entry."}
              inputRef={artistRef}
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
