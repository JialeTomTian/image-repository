import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Background from "../assets/home.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useMemo } from "react";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import uploadFireBase from "../utilities/firebase";
import { uploadPicture } from "../utilities/utilities";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const DropImage = ({ images, handleForm }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      handleForm(acceptedFiles);
    },
    [handleForm]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [showResult, setShowResult] = React.useState(false);

  useEffect(() => {
    if (images.length === 0) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  }, [images]);

  const style = useMemo(
    () => ({
      ...baseStyle,
    }),
    []
  );

  const uploadPicture = () => {
    if (showResult) {
      return (
        <div className="container">
          <div {...getRootProps(style)}>
            <input {...getInputProps()} />
            {images.map((image, index) => {
              console.log(image.name);
              return (
                <div key={index}>
                  <p>{image.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>
      );
    }
  };

  return <React.Fragment>{uploadPicture()}</React.Fragment>;
};

const Upload = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [during, setDuring] = React.useState(false);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
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

  let [images, setImages] = React.useState([]);
  let [imageName, setImageName] = React.useState("");

  const handleImages = (acceptedFiles) => {
    console.log(acceptedFiles);
    setImages(images.concat(acceptedFiles));
    console.log(images);
  };

  const handleSubmit = async (event) => {
    try {
      setDuring(true);
      let accessToken = await getAccessToken();
      let imageURL = [];
      for (let image of images) {
        let result = await uploadFireBase(
          accessToken,
          URL.createObjectURL(image),
          `${image.name}_${Date.now()}`
        );
        imageURL.push(result);
      }
      console.log(imageURL);
      let obj = {
        name: imageName,
        image: imageURL,
        user: user.name,
      };
      await uploadPicture(obj, accessToken);
      setOpen(true);
      setDuring(false);
      event.preventDefault();
      setImages([]);
    } catch {
      console.log("an error has occured");
    }
  };
  if (isAuthenticated) {
    return (
      <React.Fragment>
       <Collapse in={open}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Image Successfully Uploaded
        </Alert>
      </Collapse>
      <div className={classes.root}>
        <CssBaseline />
        <center>
          <Card>
            <CardContent>
              <Typography variant="h3" style={{ color: "#004E64" }}>
                Upload Images
              </Typography>
              <br></br>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  id="filled-required"
                  label="Name of Image"
                  defaultValue="Name of Image"
                  variant="filled"
                  onChange={(event) => {
                    setImageName(event.target.value);
                  }}
                />
                <br></br>
                <br></br>
                <DropImage images={images} handleForm={handleImages} />
                <br></br>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Upload Picture
                </Button>
                {during && <CircularProgress />}
              </form>
            </CardContent>
          </Card>
        </center>
      </div>
      </React.Fragment>
    );
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <h3> log in to view this content</h3>
      </div>
    );
  }
};

export default Upload;
