import * as React from "react";

import Paper from "@mui/material/Paper";
import { Typography } from "@material-ui/core";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  LinearProgress,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { useAuth } from "../context/AuthProvider";
import TechnicalSupportRequestDrawer from "./TechnicalSupportRequestDrawer";
import UploadFilesService from "../services/UploadFilesService";

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
export default function CreateTechnicalSupportRequest(props) {
  React.useEffect(() => {}, []);

  const auth = useAuth();
  const user = auth.user;

  const navigate = useNavigate();
  const location = "/technicalSupport";

  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");

  const [requestTitleError, setRequestTitleError] = useState({
    value: false,
    errorMessage: "",
  });
  const [requestDescriptionError, setRequestDescriptionError] = useState({
    value: false,
    errorMessage: "",
  });

  function cleanupFields() {
    setRequestTitle("");
    setRequestDescription("");
  }

  function validateNewRequest() {
    setRequestTitleError({ value: false, errorMessage: "" });
    setRequestDescriptionError({ value: false, errorMessage: "" });

    if (requestTitle == "") {
      setRequestTitleError({
        value: true,
        errorMessage: "Field cannot be empty!",
      });
    }
    if (requestDescription == "") {
      setRequestDescriptionError({
        value: true,
        errorMessage: "Field cannot be empty!",
      });
    }

    if (requestTitle && requestDescription) {
      return true;
    }
  }

  function createReport() {
    if (validateNewRequest()) {
      var createdByUserId = user.userId;
      var createdByUserName = user.username;
      var createdByUserType = user.userType;
      const newRequest = {
        requestTitle: requestTitle,
        requestDescription: requestDescription,
        imageUrl: imageUrl,
        requestStatus: "PENDING",
        createdByUserId,
        createdByUserName,
        createdByUserType,
      };

      fetch(
        "http://localhost:8080/technicalSupportRequest/createTechnicalSupportRequest/" +
          user.userId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRequest),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          cleanupFields();
        });

      navigate(`${location}/myRequests`);
    }
  }

  // image upload
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://www.darren-young.com/wp-content/uploads/2015/04/default-placeholder.png"
  );
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  // selecting file
  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
  };

  const uploadImage = () => {
    setProgress(0);
    UploadFilesService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setImageUrl(response.data.fileURL);
      })
      .catch((err) => {
        setProgress(0);
        setCurrentFile(undefined);
      });
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TechnicalSupportRequestDrawer></TechnicalSupportRequestDrawer>
        </Grid>
        <Grid item xs={10}>
          <div style={{ justifyContent: "center" }}>
            <center>
              <Typography variant="h4">
                <b>Submit a Request</b>
              </Typography>
            </center>
          </div>
          <div style={{ padding: "2%" }}>
            <Grid
              container
              style={{
                marginLeft: 350,
                marginTop: 20,
                marginBottom: 20,
                width: "60%",
              }}
              flexDirection={"column"}
              alignItems="center"
            >
              <Paper style={{ width: "70%" }}>
                <TextField
                  required
                  error={requestTitleError.value}
                  helperText={requestTitleError.errorMessage}
                  id="outlined-basic"
                  label="Issue found"
                  variant="outlined"
                  fullWidth
                  style={{ margin: "6px 0" }}
                  value={requestTitle}
                  onChange={(e) => setRequestTitle(e.target.value)}
                />
                <TextField
                  required
                  multiline
                  maxRows={100}
                  error={requestDescriptionError.value}
                  helperText={requestDescriptionError.errorMessage}
                  id="outlined-basic"
                  label="Please provide us with more details"
                  variant="outlined"
                  fullWidth
                  style={{ margin: "6px 0" }}
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                />
                {previewImage && (
                  <div>
                    <center>
                      <img
                        className="preview my20"
                        src={previewImage}
                        alt=""
                        style={{ height: "200px", width: "200px" }}
                        onClick={() => {
                          openInNewTab(previewImage);
                        }}
                      />
                    </center>
                  </div>
                )}
                {currentFile && (
                  <Box className="my20" display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                      <ThemeProvider theme={theme}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                        />
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
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={selectFile}
                  />
                  <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span"
                  >
                    Choose Screenshot
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
              </Paper>

              <Grid
                container
                direction="row"
                justifyContent={"center"}
                alignContent={"center"}
                style={{ marginTop: 60 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  onClick={createReport}
                >
                  Submit Report
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
