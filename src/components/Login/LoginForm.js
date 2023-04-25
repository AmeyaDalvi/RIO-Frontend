import {
  Avatar,
  Box,
  Container,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Divider,
  Chip,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useRef, useEffect } from "react";
import GoogleLog from "./GoogleLog";
import Or from "components/extras/Or";
import theme from "theme";
import { useRouter } from "next/router";
// import axios from "axios";

export const LoginForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    setShowPassword(false);
    setEmailError(false);
    setPasswordError(false);
  }, []);

  const isInputError = () => {
    let errorFlag = false;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setEmailError(false);
    setPasswordError(false);

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

    if (password === "") {
      errorFlag = true;
      setPasswordError(true);
    } else if (
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      errorFlag = true;
      setPasswordError(true);
    }
    return errorFlag;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const isError = isInputError();

    if (!isError) {
      const userData = {
        emailId: emailRef.current.value,
        password: passwordRef.current.value,
      };
      setEmailError(false);
      setPasswordError(false);

      props.onLoginSubmit(userData);

      // axios.put(
      //   'https://api.chatengine.io/users/',
      //   {"username" : "dummy", "secret" : "dummy"},
      //   {headers: {"Private-key": '4d50e251-748f-49e2-8d84-7c8adec36be0'}}
      // )
      // .then(r => router.push('/chat'))
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
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
      <h1>Login</h1>

      {props.invalidError && (
        <Alert severity="error">Please enter valid credentials!</Alert>
      )}
      {props.responseError && (
        <Alert severity="error">You haven't signed up!</Alert>
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
          <GoogleLog />
          <Divider
            sx={{
              my: "2rem",
              "& .MuiDivider-root": {
                backgroundColor: "#000",
              },
            }}
          >
            <Typography color="text.secondary">Or</Typography>
          </Divider>
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
              id="outlined-required3"
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
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label="Password *"
              variant="filled"
              fullWidth
              className={theme.inputText}
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={passwordError}
              helperText={passwordError && "Incorrect Entry."}
              inputRef={passwordRef}
            />
          </Stack>
          <Box sx={{ paddingTop: "1rem", textAlign: "right" }}>
            <Typography
              onClick={() => router.push("/forgotpass")}
              variant="h7"
              sx={{
                fontWeight: "bold",
                color: "#275F69",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </Typography>
          </Box>

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
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
      <Stack direction="row" spacing={1} mt={4}>
        <Typography variant="h6" sx={{ fontWeight: "regular" }}>
          Not registered yet?
        </Typography>
        <Typography
          onClick={() => router.push("/signup")}
          variant="h6"
          sx={{ fontWeight: "bold", color: "#275F69", cursor: "pointer" }}
        >
          Get Started
        </Typography>
      </Stack>
    </Box>
  );
};
