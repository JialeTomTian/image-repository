import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Background from "../assets/home.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
  },
}));

let Authentication = () => {
  const { loginWithRedirect, isAuthenticated} = useAuth0();
  if (isAuthenticated) {
    return (
      <Link to="/upload" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" size="large">
          Upload Picture
        </Button>
      </Link>
    );
  } else {
    return(
    <Button
      onClick={() => loginWithRedirect()}
      variant="contained"
      color="primary"
      size="large"
    >
      Log In
    </Button>
    )
  }
};

let Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div
        style={{
          display: "inline-block",
          textAlign: "center",
          marginBottom: "10%",
        }}
      >
        <Typography variant="h2" style={{ color: "#004E64" }}>
          Pet Moments
        </Typography>
        <Typography variant="h4" style={{ color: "#004E64" }}>
          An image repository for your favoriate pet pictures
        </Typography>
        <div style={{ marginTop: "2%" }}>
          <Link to="/image" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="large">
              View Pictures
            </Button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Authentication/>
        </div>
      </div>
    </div>
  );
};

export default Home;
