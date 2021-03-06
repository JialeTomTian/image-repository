import Home from "./components/home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route , Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Upload from "./components/upload";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "./components/image";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#00A5CF" },
    secondary: {main : "#004E64"},
    text: {
          primary: "#004E64"
    } 
  },
  typography: {
    flexGrow: 1,
    align: "center",
  },
});

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {loginWithRedirect, isAuthenticated} = useAuth0();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    loginWithRedirect();
    handleClose();
  }
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color="primary">
          <div>
            <div style={{ float: "left", marginLeft: "1%" }}>
              <Link to="/" style={{textDecoration: "none"}}>
              <Typography
                variant="h5"
                style={{ marginTop: "10%", color: "#004E64"}}
              >
                Pet Moments
              </Typography>
              </Link>
            </div>
            <div style={{ float: "right", marginRight: "1%" }}>
              <IconButton color="default" onClick={handleClick}>
                <SortIcon color="secondary" fontSize="large" />
              </IconButton>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/" style={{textDecoration: "none"}}><MenuItem onClick={handleClose}>Home</MenuItem></Link>
              <Link to="/image" style={{textDecoration: "none"}}><MenuItem onClick={handleClose}>Pictures</MenuItem></Link>
              {isAuthenticated ? (<Link to="/upload" style={{textDecoration: "none"}}><MenuItem onClick={handleClose}>Upload</MenuItem></Link>) :
               (<MenuItem onClick={handleLogin} >Login</MenuItem>)}
            </Menu>
          </div>
        </AppBar>
      <Switch>
        <Route path='/image'>
          <Image/>
        </Route>
        <Route path="/upload">
          <Upload/>
          </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
