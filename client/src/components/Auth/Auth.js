// Auth.js
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
// ⬇️ NEW: используем новую библиотеку GIS
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"; // уже есть в deps
// ⬆️ УДАЛИ: import { GoogleLogin } from "react-google-login";
// ⬆️ УДАЛИ: import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // ⬇️ NEW: обработчики для новой кнопки Google
  const googleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse?.credential; // это ID Token (JWT)
      if (!token) throw new Error("No Google credential");

      // Декодим, чтобы сохранить совместимость с прежним shape (profileObj)
      const decoded = jwt_decode(token);
      const result = {
        email: decoded?.email,
        name: decoded?.name,
        givenName: decoded?.given_name,
        familyName: decoded?.family_name,
        imageUrl: decoded?.picture,
        googleId: decoded?.sub,
      };

      // Сохраняем так же, как раньше: { result, token }
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try it again later");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autofocus
                  half
                />
                <Input
                  name="secondName"
                  label="Second Name"
                  handleChange={handleChange}
                  autofocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              lable="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          {/* ⬇️ NEW: заменили старый <GoogleLogin ...render> на GIS-кнопку */}
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            useOneTap
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
