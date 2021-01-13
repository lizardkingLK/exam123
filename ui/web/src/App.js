import React from 'react';
import axios from "axios";

// Configs
import { apiBaseUrl } from "./configs/config";

// Material UI
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography
} from '@material-ui/core';

// Styles
import { makeStyles } from '@material-ui/core/styles';

// Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Common components
import Snackbar from "./components/common/Sncakbar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Interview Exam Full Stack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const successMsg = "Successfully Logged In!";
  const successSer = "success";
  const errorMsg = "email or password Incorrect";
  const errorSer = "error";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [message, setMessage] = React.useState(successMsg);
  const [severity, setSeverity] = React.useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs(email, password)) {
      await axios.post(apiBaseUrl, { username: email, password })
        .then((result) => {
          if (result.data !== null || result.data !== "undefined") {
            setMessage(successMsg);
            setSeverity(successSer);
            setDisplay(true);
          } else {
            setMessage(errorMsg);
            setSeverity(errorSer);
            setDisplay(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const validateInputs = (email, password) => {
    if (email.length !== 0) {
      if (password.length !== 0) {
        return true;
      }
    }

    return false;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Snackbar display={display} message={message} severity={severity} />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}