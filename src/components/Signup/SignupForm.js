// import {
//   Avatar,
//   Box,
//   Container,
//   Stack,
//   IconButton,
//   InputAdornment,
//   Typography,
//   Alert,
// } from "@mui/material";
// import { Button, TextField } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useState, useRef, useEffect } from "react";

// import theme from "theme";
// import { useRouter } from "next/router";
// // import { makeStyles } from "@mui/styles";

// // const useStyles = makeStyles((theme) => ({
// // inpuText: {
// // "& label.Mui-focused": {
// //   color: "#832BE0",
// // },
// // "& .MuiFilledInput-underline:after": {
// //   borderBottomColor: "#832BE0",
// // },
// //   },

// //   errorText: {
// //     "& label.Mui-focused": {
// //       color: "red",
// //     },

// //     "& .MuiFilledInput-underline:after": {
// //       borderBottomColor: "red",
// //     },
// //   },

// //   signupButton: {
// //     borderRadius: "28px !important",
// //     paddingLeft: "30px !important",
// //     paddingRight: "30px !important",
// //     fontSize: "18px !important",
// //     backgroundColor: "#832BE0 !important",
// //   },
// // }));

// export const SignupForm = (props) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const router = useRouter();
//   //   const classes = useStyles();
//   //   const navigate = useNavigate();

//   const emailRef = useRef();
//   const passwordRef = useRef();

//   useEffect(() => {
//     setShowPassword(false);
//     setEmailError(false);
//     setPasswordError(false);
//   }, []);

//   const isInputError = () => {
//     let errorFlag = false;
//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;

//     setEmailError(false);
//     setPasswordError(false);

//     if (email === "") {
//       errorFlag = true;
//       setEmailError(true);
//     } else if (
//       (email.match(/@/g) || []).length !== 1 ||
//       (email.match(/\./g) || []).length < 1
//     ) {
//       errorFlag = true;
//       setEmailError(true);
//     } else if (
//       email.indexOf(".") === 0 ||
//       email.indexOf("@") === 0 ||
//       email.indexOf("-") === 0 ||
//       email.indexOf("_") === 0
//     ) {
//       errorFlag = true;
//       setEmailError(true);
//     } else if (/[^a-zA-Z0-9.@_-]/.test(email)) {
//       errorFlag = true;
//       setEmailError(true);
//     }

//     if (password === "") {
//       errorFlag = true;
//       setPasswordError(true);
//     } else if (
//       !/[a-z]/.test(password) ||
//       !/[A-Z]/.test(password) ||
//       !/[0-9]/.test(password)
//     ) {
//       errorFlag = true;
//       setPasswordError(true);
//     }
//     return errorFlag;
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     const isError = isInputError();

//     if (!isError) {
//       const userData = {
//         emailId: emailRef.current.value,
//         password: passwordRef.current.value,
//       };
//       setEmailError(false);
//       setPasswordError(false);

//       props.onLoginSubmit(userData);
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//         width: "100%",
//       }}
//     >
//       <h1>Sign Up</h1>

//       {props.invalidError && (
//         <Alert severity="error">Please enter valid credentials!</Alert>
//       )}
//       {props.responseError && (
//         <Alert severity="error">There was some error. Try again!</Alert>
//       )}

//       <Container maxWidth="sm">
//         <Box
//           component="form"
//           noValidate
//           autoComplete="off"
//           onSubmit={submitHandler}
//           mt={2}
//           px={6}
//         >
//           <Stack justifyContent="center" alignItems="center" spacing={2}>
//             <TextField
//               //   className={emailError ? classes.errorText : classes.inpuText}
//               sx={{
//                 "& label.Mui-focused": {
//                   color: "#000",
//                 },
//                 "& .MuiFilledInput-underline:after": {
//                   borderBottomColor: "#000",
//                 },
//               }}
//               required
//               id="outlined-required3"
//               label="Email Id"
//               fullWidth
//               variant="filled"
//               inputProps={{
//                 autoComplete: "new-password",
//                 form: {
//                   autoComplete: "off",
//                 },
//               }}
//               error={emailError}
//               helperText={emailError && "Incorrect Entry."}
//               inputRef={emailRef}
//             />
//             <TextField
//               //   className={passwordError ? classes.errorText : classes.inpuText}
//               sx={{
//                 "& label.Mui-focused": {
//                   color: "#000",
//                 },
//                 "& .MuiFilledInput-underline:after": {
//                   borderBottomColor: "#000",
//                 },
//               }}
//               id="outlined-adornment-password"
//               type={showPassword ? "text" : "password"}
//               label="Password *"
//               variant="filled"
//               fullWidth
//               className={theme.inputText}
//               InputProps={{
//                 autoComplete: "new-password",
//                 form: {
//                   autoComplete: "off",
//                 },
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               error={passwordError}
//               helperText={passwordError && "Must Contain (a-z, A-z, 0-9)"}
//               inputRef={passwordRef}
//             />
//           </Stack>
//           <Box
//             mt={6}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               flexDirection: "column",
//             }}
//           >
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               sx={{
//                 borderRadius: "5px !important",
//                 // paddingLeft: "195px !important",
//                 // paddingRight: "195px !important",
//                 marginBottom: "2rem !important",
//                 fontSize: "18px !important",
//                 backgroundColor: "#000 !important",
//                 fontWeight: "bold !important",
//               }}
//             >
//               Sign Up
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//       <Stack direction="row" spacing={1} mt={4}>
//         <Typography variant="h6" sx={{ fontWeight: "regular" }}>
//           Not registered yet?
//         </Typography>
//         <Typography
//           onClick={() => router.push("/login")}
//           variant="h6"
//           sx={{ fontWeight: "bold", color: "#275F69", cursor: "pointer" }}
//         >
//           Get Started
//         </Typography>
//       </Stack>
//     </Box>
//   );
// };

import {
  Avatar,
  Box,
  Container,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Autocomplete,
  Popper,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
// import { makeStyles } from "@mui/styles";
// import { genres } from "./genres";

// const useStyles = makeStyles((theme) => ({
//   inpuText: {
//     "& label.Mui-focused": {
//       color: "#832BE0",
//     },

//     "& .MuiFilledInput-underline:after": {
//       borderBottomColor: "#832BE0",
//     },
//   },

//   errorText: {
//     "& label.Mui-focused": {
//       color: "red",
//     },

//     "& .MuiFilledInput-underline:after": {
//       borderBottomColor: "red",
//     },
//   },

//   signupButton: {
//     borderRadius: "28px !important",
//     paddingLeft: "30px !important",
//     paddingRight: "30px !important",
//     fontSize: "18px !important",
//     backgroundColor: "#832BE0 !important",
//   },
// }));

export const SignupForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstNameError, setFistNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    setShowPassword(false);
    setFistNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
  }, []);

  const isInputError = () => {
    let errorFlag = false;
    const fname = fNameRef.current.value;
    const lname = lNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setShowPassword(false);
    setFistNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);

    if (fname === "") {
      errorFlag = true;
      setFistNameError(true);
    }

    if (lname === "") {
      errorFlag = true;
      setLastNameError(true);
    }

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
        firstName: fNameRef.current.value,
        lastName: lNameRef.current.value,
        emailId: emailRef.current.value,
        password: passwordRef.current.value,
      };

      setShowPassword(false);
      setFistNameError(false);
      setLastNameError(false);
      setEmailError(false);
      setPasswordError(false);

      console.log("userdata:", userData);

      props.onSignUpSubmit(userData);
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
      <h1>Sign Up</h1>
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
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            <TextField
              // className={firstNameError ? classes.errorText : classes.inpuText}
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
              label="First Name"
              fullWidth
              variant="filled"
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              error={firstNameError}
              helperText={firstNameError && "Incorrect Entry."}
              inputRef={fNameRef}
            />
            <TextField
              // className={lastNameError ? classes.errorText : classes.inpuText}
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
              label="Last Name"
              fullWidth
              variant="filled"
              InputProps={{
                autoComplete: "new-password",
                form: {
                  autCcomplete: "off",
                },
              }}
              error={lastNameError}
              helperText={lastNameError && "Incorrect Entry."}
              inputRef={lNameRef}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            mt={2}
          >
            <TextField
              // className={emailError ? classes.errorText : classes.inpuText}
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
              // className={passwordError ? classes.errorText : classes.inpuText}
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
              helperText={passwordError && "Must Contain (a-z, A-z, 0-9)"}
              inputRef={passwordRef}
            />
          </Stack>
          <Stack mt={2}>
            <TextField
              // className={emailError ? classes.errorText : classes.inpuText}
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
              label="What is your Mother's Maiden name?"
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
          </Stack>
          <Stack mt={2}>
            <TextField
              // className={emailError ? classes.errorText : classes.inpuText}
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
              label="Who is your favorite Artist?"
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
          </Stack>

          <Box
            mt={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              // className={classes.signupButton}
              fullWidth
              sx={{
                borderRadius: "5px !important",
                // paddingLeft: "195px !important",
                // paddingRight: "195px !important",
                marginBottom: "2rem !important",
                fontSize: "18px !important",
                backgroundColor: "#000 !important",
                fontWeight: "bold !important",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>

      <Stack direction="row" spacing={1} mt={4}>
        <Typography variant="h6" sx={{ fontWeight: "regular" }}>
          Already have an account?
        </Typography>
        <Typography
          onClick={() => router.push("/login")}
          variant="h6"
          sx={{ fontWeight: "bold", color: "#275F69", cursor: "pointer" }}
        >
          Login
        </Typography>
      </Stack>
    </Box>
  );
};
