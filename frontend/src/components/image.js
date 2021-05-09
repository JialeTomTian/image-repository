import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { getPicture, searchPicture } from "../utilities/utilities";
import Carousel from "react-material-ui-carousel";
import "./home.css";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  other: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const DisplayImage = ({ data, index }) => {
  const [name, setName] = React.useState("");
  const [user, setUser] = React.useState("");
  const [labels, setLabels] = React.useState("");
  React.useEffect(() => {
    if (data.name === undefined) {
      setName("No Name");
    } else {
      setName(data.name);
    }

    if (data.user === undefined) {
      setUser("No User");
    } else {
      setUser(data.user);
    }

    if (data.descriptors.length === 0) {
      setLabels("No Labels Found");
    } else {
      let tempString = "";
      for (let descriptor of data.descriptors) {
        tempString += descriptor;
        tempString += " ";
      }
      setLabels(tempString);
    }
  }, [setName, setUser, setLabels, data]);

  return (
    <React.Fragment>
      <Paper>
        <Carousel>
          {data.images.map((image, index) => {
            return (
              <div
                style={{
                  height: "300px",
                  width: "600px",
                  marginRight: "10px",
                }}
              >
                <img
                  alt=""
                  style={{
                    maxHeight: "300px",
                    maxWidth: "600px",
                    height: "auto",
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    margin: "auto",
                  }}
                  src={image}
                  key={index}
                />
              </div>
            );
          })}
        </Carousel>
        <div style={{ display: "inline-block", marginLeft: "10px" }}>
          <Typography style={{ display: "inline-block" }}>
            Uploaded By: {user}
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Typography style={{ display: "inline-block" }}>
            Name: {name}
          </Typography>
        </div>
        <Typography style={{ marginLeft: "10px" }}>Labels: {labels}</Typography>
      </Paper>
      <br></br>
    </React.Fragment>
  );
};

const Image = () => {
  const [data, setData] = React.useState([]);
  const { getAccessTokenSilently, isAuthenticated} = useAuth0();
  const [filter, setFilter] = React.useState([]);

  const classes = useStyles();

  const getAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://image-repository/api`,
        scope: "read:current_user",
      });
      return accessToken;
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const getResult = async () => {
      let result = await getPicture();
      setData(result.data.images);
    };
    getResult();
  }, [setData]);

  const fetchData = async () => {
    let accessToken = await getAccessToken();
    console.log(accessToken)
    let result = await searchPicture({ filter: filter }, accessToken);
    console.log(result);
    setData(result.data.images);
  };

  const processData = (event) => {
    let input = event.target.value.replace(/\s/g, '');
    let result = input.split(",");
    setFilter(result);

  };

  const handleEvent = (event) => {
    if(event.key === "Enter"){
      fetchData();
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline>
        <div>
          {isAuthenticated ? (
            <center>
              <Typography>Search for Result Based on Animal Label</Typography>
              <Paper className={classes.other}>
                <InputBase
                  className={classes.input}
                  placeholder="Use ',' to seperate filters"
                  onChange={(event) => processData(event)}
                  onKeyPress={handleEvent}
                />
                <IconButton
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={fetchData}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <br></br>
            </center>
          ) : (
            <center>
              <Typography>Login To Search By Animal Label</Typography>
            </center>
          )}
          {data.map((data, index) => {
            return <DisplayImage data={data} index={index}></DisplayImage>;
          })}
        </div>
      </CssBaseline>
    </div>
  );
};

export default Image;
