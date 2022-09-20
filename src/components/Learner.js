import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import {
  Paper,
  Button,
  Typography,
  LinearProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import UploadService from "../services/UploadFilesService";

export default function Learner() {
  const theme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 15,
            borderRadius: 5,
          },
          colorPrimary: {
            backgroundColor: "#EEEEEE",
          },
          bar: {
            borderRadius: 5,
            backgroundColor: "#1a90ff",
          },
        },
      },
    },
  });

  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [username, setUsername] = useState("");
  const [learners, setLearners] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const learner = {
      name,
      address,
      email,
      password,
      username,
      profilePictureURL,
    };
    console.log(learner);
    fetch("http://localhost:8080/learner/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(learner),
    });
    console.log("New Learner added");
  };

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const uploadImage = () => {
    setProgress(0);
    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage("Succesfully Uploaded!");
        setProfilePictureURL(response.data.fileURL);
        setIsError(false);
        setIsUploaded(true);
        console.log(response);
      })
      .catch((err) => {
        setMessage("Could not upload the image!");
        setIsError(true);
        setProgress(0);
        setCurrentFile(undefined);
      });
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/learner/getAll")
      .then((res) => res.json())
      .then((result) => {
        setLearners(result);
      });
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          //m: 1,
          // width: '25ch'
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1>
            <u>Add Learner</u>
          </h1>
          {/* <form className={classes.root} noValidate autoComplete="off"> */}
          <TextField
            id="outlined-basic"
            label="Learner Name"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Learner Address"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Learner Email"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Learner Password"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Learner Username"
            variant="outlined"
            fullWidth
            style={{ paddingBottom: "10px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* </form> */}
          {previewImage && (
            <div>
              <img
                className="preview my20"
                src={previewImage}
                alt=""
                style={{ height: "40%", width: "40%" }}
              />
            </div>
          )}
          {currentFile && (
            <Box className="my20" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <ThemeProvider theme={theme}>
                  <LinearProgress variant="determinate" value={progress} />
                </ThemeProvider>
              </Box>
              <Box minWidth={35}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${progress}%`}</Typography>
              </Box>
            </Box>
          )}
          {message && (
            <Typography
              variant="subtitle2"
              className={`upload-message ${isError ? "error" : ""}`}
            >
              {message}
            </Typography>
          )}
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={selectFile}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose Profile Image
            </Button>
          </label>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!currentFile}
            onClick={uploadImage}
          >
            Upload
          </Button>
          <br />
          {name}
          <br />
          {address}
          <br />
          {email}
          <br />
          {password}
          <br />
          {username}
          <br />
          {profilePictureURL}
          <br />
          <br />
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={!isUploaded}
          >
            Submit
          </Button>
        </Paper>

        <h1>
          <u>Display All Learners</u>
        </h1>
        <Paper elevation={3} style={paperStyle}>
          {learners.map((learner) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              key={learner.learnerId}
            >
              LearnerId: {learner.learnerId}
              <br />
              Name: {learner.name}
              <br />
              Address: {learner.address}
              <br />
              Email: {learner.email}
              <br />
              Password: {learner.password}
              <br />
              Username: {learner.username}
              <br />
              Profile Picture:
              <img
                className="preview my20"
                src={learner.profilePictureURL}
                alt=""
                style={{ height: "10%", width: "10%" }}
              />
            </Paper>
          ))}
        </Paper>
      </Container>
    </Box>
  );
}
