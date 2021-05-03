import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Background from "../assets/home.png";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {useDropzone} from 'react-dropzone';
import {useCallback, useEffect, useMemo} from 'react';
import Button from '@material-ui/core/Button';


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
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

const DropImage = ({images, handleForm}) => {
    const onDrop = useCallback(acceptedFiles => {
        handleForm(acceptedFiles);
    }, [handleForm])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const [showResult, setShowResult] = React.useState(false); 

    useEffect(()=>{
    if(images.length === 0){
        setShowResult(false);
    }  else {
        setShowResult(true);
    }
   }, [images])

    const style = useMemo(() => ({
        ...baseStyle,
    }), []);

    const uploadPicture = () => {
      if(showResult){
          return(
              <div className="container">
            <div {...getRootProps(style)}>
            <input {...getInputProps()} />
           {
               images.map((image, index)=>{
                  console.log(image.name);
                  return(
                  <div key={index}>
                      <p>{image.name}</p>
                    </div>
                   )
               })
           }
           </div>
           </div>
          )
        } else {
          return (
                <div className="container">
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                </div>
          )
      }
    }

    return(
        <React.Fragment>
            {uploadPicture()}
        </React.Fragment>
    )
}

const Upload = () => {
  const classes = useStyles();

  let [images, setImages] = React.useState([]);

  const handleImages = (acceptedFiles) => {
      console.log(acceptedFiles);
      setImages([]);
      console.log(images);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <center>
      <Card>
        <CardContent>
          <Typography variant="h3" style={{ color: "#004E64" }}>
            Upload Images
          </Typography>
          <br></br>
          <TextField
            required
            id="filled-required"
            label="Name of Image"
            defaultValue="Name of Image"
            variant="filled"
          />
          <br></br>
          <br></br>
          <DropImage images={images} handleForm={handleImages}/>
          <br></br>
          <Button variant="contained" color="primary" size="large">
          Upload Picture
        </Button>
        </CardContent>
      </Card>
      </center>
    </div>
  );
};

export default Upload;
