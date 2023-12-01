import {
  Grid,
  Paper,
  Box,
  Stack,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
  colors,
  Tabs,
  Tab,
  Alert,Snackbar, CircularProgress
} from "@mui/material";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {


  const navigate = useNavigate();

  // to change to sign up form
  function handleClick() {
    props.setLogin(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };



  // states
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [isEmailBlank, setIsEmailBlank] = React.useState(false);
  const [isPasswordBlank, setIsPasswordBlank] = React.useState(false);
  const [initialValues, setEmail] = React.useState({
    username: "",
    password: "",
  });

  const [snackbarOpen,setSnackbarOpen] = React.useState(false)

  // border of the textfield
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#000000",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& fieldset": {
              borderColor: "gray",
              borderWidth: "2px",
            },
          },
        },
      },
    },
  });

  async function onSubmit(values, props) {
    if (!values.username) setIsEmailBlank(true);

    if (!values.password) setIsPasswordBlank(true);
    console.log(values)
    try {
    const headers = {
      "Content-Type": "application/json",
      username: JSON.stringify(values.username),
      password: JSON.stringify(values.password),
    };
    const body = {};
    const res = await axios.post("http://localhost:3000/admin/login", body, {
      headers,
    });
    setIsLoading(true)
    console.log(res);
    const data = JSON.parse(res.request.response);
    console.log(data.token);
    localStorage.setItem("token", data.token);
    console.log(res.request.status);
    if (res.request.status == 200) navigate("Home");
    else if(res.request.status == 400) {
      setSnackbarOpen(true)
    }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  // const initialValues = {
  //   email : "",
  //   password : ""
  // }

  return (
    <ThemeProvider theme={theme}>
      <Grid textAlign={"center"}>
        <Typography variant="h1" fontWeight={600} fontSize={70}>
          Hello there !
        </Typography>
        <Typography variant="h5" margin={"1em 0"}>
          Welcome to Area
        </Typography>
        <Grid width={"100%"}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(props) => (
              <Form>
                <Box height={"100px"}>
                  <Field
                    as={TextField}
                    label={"Username"}
                    type="text"
                    name="username"
                    helperText={
                      emailError
                        ? `User doesn't exist`
                        : isEmailBlank && "Enter you username"
                    }
                    // error={isEmailBlank || emailError}
                    // helperText = {'use doent exist'}
                    placeholder="Enter your email"
                    autoComplete="email"
                    style={{ width: "400px", marginTop: "1em" }}
                    disabled={isLoading}
                  ></Field>
                </Box>
                <Box height={"100px"}>
                  <Field
                    as={TextField}
                    label={"Password"}
                    name="password"
                    type="password"
                    helperText={
                      passwordError
                        ? `Incorrect password`
                        : isPasswordBlank && "Enter you password"
                    }
                    // error={isPasswordBlank || passwordError}
                    placeholder="Enter your password"
                    style={{ width: "400px", marginTop: "0.5em" }}
                    disabled={isLoading}
                  ></Field>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                    sx={{
                      width: "400px",
                      borderRadius: 8,
                      padding: "1.2em 0em",
                      margin: "0.5em",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Log in"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>

        <Box marginTop={"1em"} sx={{ marginBottom: "2em" }}>
          <Typography variant="p" color={"grey"}>
            Don't have an account?{" "}
            <Button
              disableRipple
              onClick={handleClick}
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                padding: "0",
                minWidth: "unset",
                textTransform: "none",
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "3em",
            display: "flex",
            justifyContent: "center",
            gap: "6em",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{
              width: "200px",
              bgcolor: "gray",
              padding: "1.2em 0em",
              margin: "0.5em",
              fontSize: "12.5px",
              fontWeight: "bold",
            }}
          >
            Log in as User
          </Button>
          <Snackbar  anchorOrigin={{ vertical:'bottom', horizontal:"center" }}   open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Invalid Credentials
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};
