import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const mockedEmail = "admin@admin.com";
  const mockedPassword = "admin";

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    let formIsValid = true;

    if (!email) {
      tempErrors.email = t("signInEmailRequired");
      formIsValid = false;
    } else if (email.toLowerCase() !== mockedEmail) {
      tempErrors.email = t("signInEmailInvalid");
      formIsValid = false;
    }

    if (!password) {
      tempErrors.password = t("signInPasswordRequired");
      formIsValid = false;
    } else if (password !== mockedPassword) {
      tempErrors.password = t("signInPasswordInvalid");
      formIsValid = false;
    }

    if (email.toLowerCase() === mockedEmail && password === mockedPassword) {
      tempErrors.email = "";
      tempErrors.password = "";
      formIsValid = true;
    } else {
      formIsValid = false;
    }

    setErrors(tempErrors);
    return (
      formIsValid &&
      email.toLowerCase() === mockedEmail &&
      password === mockedPassword
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      sessionStorage.setItem("auth", "true");
      navigate("/app");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <Box className={classes.mainWrapper}>
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h4" className={classes.title}>
          {t("signInTitle")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className={classes.form}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("signInEmail")}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
            className={classes.field}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("signInPassword")}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
            className={classes.field}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t("signInButton")}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
