import React from "react";
import { Formik, Field, Form, validateYupSchema, ErrorMessage } from "formik";
import * as Yup from "yup";
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
  CircularProgress,Snackbar,Alert
} from "@mui/material";
import axios from "axios";

const Signup = (props) => {
  //states
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // to alternate b/w login and sing up
  function handleClick() {
    props.setLogin(true);
  }
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
              // borderColor: "gray",
              borderWidth: "2px",
            },
          },
        },
      },
    },
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validateYupSchema = Yup.object().shape({
    name: Yup.string().required("What is your name?"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("What is your email?"),
    password: Yup.string().min(8, "Poor").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Not a match")
      .required("Required"),
  });

  // submitting the form
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  async function onSubmit(values, props) {
    console.log(values);
    try {
      const headers = {
        "Content-Type": "application/json",
        username: JSON.stringify(values.name),
        email: JSON.stringify(values.email),
        password: JSON.stringify(values.password),
      };
      const body = {};
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/admin/signup", body, {
        headers,
      });
      const data = JSON.parse(res.request.response);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      if (res.request.status == 201) navigate("/about");
    } catch (error) {
      setSnackbarOpen(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

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
          <Formik
            initialValues={initialValues}
            validationSchema={validateYupSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Box height={"100px"}>
                  <Field
                    as={TextField}
                    name="name"
                    helperText={props.touched.name && props.errors.name}
                    // error={props.touched.name && Boolean(props.errors.name)}
                    label={"Name"}
                    type="text"
                    s
                    placeholder="Enter your name"
                    autoComplete="name"
                    style={{ width: "400px", margin: "1em 0" }}
                    disabled={isLoading}
                  >
                    {" "}
                  </Field>
                </Box>
                <Box height={"100px"}>
                  <Field
                    as={TextField}
                    name="email"
                    helperText={props.touched.email && props.errors.email}
                    // error={props.touched.email && Boolean(props.errors.email)}
                    label={"Email"}
                    type="mail"
                    placeholder="Enter your email"
                    autoComplete="email"
                    style={{ width: "400px", margin: "1em 0" }}
                    disabled={isLoading}
                  ></Field>
                </Box>
                <Box height={"100px"}>
                  <Field
                    as={TextField}
                    helperText={props.touched.password && props.errors.password}
                    // error={props.touched.password && Boolean(props.errors.password)}
                    name="password"
                    label={"Password"}
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="password"
                    style={{ width: "400px", margin: "1em 0" }}
                    disabled={isLoading}
                  ></Field>
                </Box>
                <Box height={"100px"}>
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label={"Confirm password"}
                    helperText={
                      props.touched.confirmPassword &&
                      props.errors.confirmPassword
                    }
                    // error={props.touched.confirmPassword && Boolean(props.errors.confirmPassword)}
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="password"
                    style={{ width: "400px", margin: "1em 0" }}
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
                      margin: "1em",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Sign up"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
        <Box marginTop={"1em"}>
          <Typography variant="p" color={"grey"}>
            Already have an account?{" "}
            <Button
              onClick={handleClick}
              disableRipple
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                padding: "0",
                minWidth: "unset",
                textTransform: "none",
              }}
            >
              Log in
            </Button>
          </Typography>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Unable to Create account
          </Alert>
        </Snackbar>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
