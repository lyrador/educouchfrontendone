import * as React from "react";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthProvider";
import {
  Breadcrumbs,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Dialog,
  LinearProgress,
  DialogActions,
  Paper,
  Snackbar,
  Alert,
  DialogContentText,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import PropTypes from "prop-types";
import { TabPanel } from "@material-ui/lab";
import ReelCardItem from "../components/ReelComponents/ReelCardItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { useState } from "react";
import ReactPlayer from "react-player";
import UploadService from "../services/UploadFilesService";
import { ConstructionOutlined } from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@material-ui/core";

export default function CreateReelPage(props) {
  const auth = useAuth();
  const user = auth.user;
  const instructorId = user.userId;

  const location = useLocation();
  const reelId = location.state.reelId;
  const navigate = useNavigate();

  const REELTITLE_LIMIT = 30;
  const REELCAPTION_LIMIT = 400;

  const [courses, setCourses] = React.useState([]);
  const [courseSelected, setCourseSelected] = React.useState("");
  const [reels, setReels] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const [reelTitle, setReelTitle] = React.useState({
    name: " ",
  });
  const [reelCaption, setReelCaption] = React.useState({
    name: " ",
  });
  //upload video stuff
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
  const [currentPage, setCurrentPage] = useState([]);
  const [currentFile, setCurrentFile] = React.useState(undefined);
  const [previewImage, setPreviewImage] = React.useState(
    "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
  );
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedAttachmentId, setUploadedAttachmentId] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  React.useEffect(() => {
    fetch("http://localhost:8080/reel/getReel/" + reelId)
      .then((res) => res.json())
      .then((result) => {
        setCurrentPage(result);
        console.log("setcurrentPage as: ", result);
        //console.log(JSON.stringify(result.pageQuiz))
      })
      .then(
        fetch(
          "http://localhost:8080/reel/getCoursesUnderInstructor/" + instructorId
        )
          .then((res) => res.json())
          .then((result) => {
            setCourses(result);
            console.log("setCourses as: ", result);
            //console.log(JSON.stringify(result.pageQuiz))
          })
      );
  }, [refresh]);

  const handleOpenTermsDialog = () => {
    setOpenTermsDialog(true)
  }

  const handleCloseTermsDialog = () => {
    setOpenTermsDialog(false)
  }

  const handleClickErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };
  const [missingVideoError, setMissingVideoError] = useState(false);
  const handleMissingVideoSnackbar = () => {
    setMissingVideoError(true);
  };
  const handleCloseMissingVideo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMissingVideoError(false);
  };
  const [missingTitleError, setMissingTitleError] = useState(false);
  const handleMissingTitleSnackbar = () => {
    setMissingTitleError(true);
  };
  const handleCloseMissingTitle = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMissingTitleError(false);
  };
  const [missingCaptionError, setMissingCaptionError] = useState(false);
  const handleMissingCaptionSnackbar = () => {
    setMissingCaptionError(true);
  };
  const handleCloseMissingCaption = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMissingCaptionError(false);
  };
  const [missingCourseError, setMissingCourseError] = useState(false);
  const handleMissingCourseSnackbar = () => {
    setMissingCourseError(true);
  };
  const handleCloseMissingCourse = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMissingCourseError(false);
  };
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };
  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };
  const [openUploadThumbnailDialog, setOpenUploadThumbnailDialog] = React.useState(false);
  const handleOpenUploadThumbnailDialog = () => {
    setOpenUploadThumbnailDialog(true);
  };
  const handleCloseUploadThumbnailDialog = () => {
    setOpenUploadThumbnailDialog(false);
  };

  const handleSelectCourse = (e) => {
    setCourseSelected(e.target.value);
    console.log("selecting: ", e.target.value);
  };

  const renderVideoImageHolder = () => {
    if (currentPage && currentPage.video) {
      return (
        <div style={{ height: "500px", flex:"6" }}>
          <ReactPlayer
            className="video"
            width="100%"
            height="100%"
            controls
            url={currentPage.video.fileURL}
          />
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <div>There is no current Video!</div>
        </div>
      );
    }
  };

  const renderThumbnailHolder = () => {
    if (currentPage && currentPage.thumbnail) {
      return (
        <div style={{ height: "500px" , flex:"5"}}>
          <img
            src={currentPage.thumbnail.fileURL}
            alt="Interactive Page Image"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <div>There is no current Thumbnail!</div>
        </div>
      );
    }
  };

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    console.log("selected file: ", event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
  };

  const uploadFile = () => {
    setProgress(0);
    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage("Succesfully Uploaded!");
        setUploadedAttachmentId(response.data.fileId);
        setIsError(false);
        setIsUploaded(true);
        console.log("uploaded file: ", response);
      })
      .catch((err) => {
        setMessage("Could not upload the image!");
        setIsError(true);
        setProgress(0);
        setCurrentFile(undefined);
      });
  };

  const [saveReelSuccess, setSaveReelSuccess] = useState(false);
  const handleSaveReelSucess = () => {
    console.log("trigger handle save reel")
    setSaveReelSuccess(true);
  };
  const handleCloseSaveReelSucess = () => {
    setSaveReelSuccess(false);
  };

  const [submitReelSuccess, setSubmitReelSucess] = useState(false);
  const handleSubmitSuccess = () => {
    setSubmitReelSucess(true);
  };
  const handleCloseSubmitSucess= () => {
    setSubmitReelSucess(false);
  };


  //need to change out API
  const createNewFileItem = async (e) => {
    e.preventDefault();
    var attachmentId = uploadedAttachmentId;
    console.log("attachmentId: ", attachmentId + " reelId: ", reelId);
    try {
      const response = await fetch(
        "http://localhost:8080/reel/uploadVideoToReel/" +
          reelId +
          "/" +
          attachmentId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("called uploadVideoToReel: ", response);
      if (response.ok == false) {
        console.log("Error");
        handleClickErrorSnackbar();
      } else {
        console.log("New File Item Created Successfully!");
        handleClickSnackbar();
        setCurrentFile(undefined);
        setPreviewImage(
          "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
        );
        setProgress(0);
        setMessage("");
        setIsError(false);
        setIsUploaded(false);
        setUploadedAttachmentId("");
      }
    } catch (err) {
      console.log(err);
      handleClickErrorSnackbar();
    }
    setRefresh(!refresh);
    // props.setRefreshInteractivePage(true);
    handleCloseUploadDialog();
  };
  
  const createNewThumbnailItem = async (e) => {
    e.preventDefault();
    var attachmentId = uploadedAttachmentId;
    console.log("attachmentId: ", attachmentId + " reelId: ", reelId);
    try {
      const response = await fetch(
        "http://localhost:8080/reel/uploadThumbnailToReel/" +
          reelId +
          "/" +
          attachmentId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("called uploadThumbnailToReel: ", response);
      if (response.ok == false) {
        console.log("Error");
        handleClickErrorSnackbar();
      } else {
        console.log("New Thumbnail Item Created Successfully!");
        handleClickSnackbar();
        setCurrentFile(undefined);
        setPreviewImage(
          "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
        );
        setProgress(0);
        setMessage("");
        setIsError(false);
        setIsUploaded(false);
        setUploadedAttachmentId("");
      }
    } catch (err) {
      console.log(err);
      handleClickErrorSnackbar();
    }
    setRefresh(!refresh);
    // props.setRefreshInteractivePage(true);
    handleCloseUploadThumbnailDialog();
  };

  const handleChange = (name) => (event) => {
    setReelTitle({ ...reelTitle, [name]: event.target.value });
  };

  const handleCaptionChange = (name) => (event) => {
    setReelCaption({ ...reelCaption, [name]: event.target.value });
  };

  function handleSaveReel() {
    if (!courseSelected) {
      setMissingCourseError(true);
    } else {
      const incompleteDTO = {
        reelTitle: reelTitle.name,
        reelCaption: reelCaption.name,
        courseId: courseSelected,
        instructorId: "",
      };
      console.log("body: ", incompleteDTO);
      fetch("http://localhost:8080/reel/updateReel/" + reelId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incompleteDTO),
      })
        .then((res) => res.json())
        .then((response) => console.log("saved: ", response))
        .then(handleSaveReelSucess)
        .then(() => navigate(`/instructorReels`));
    }
  }

  function handleSubmitReel() {
    if (
      currentPage &&
      currentPage.video &&
      (reelTitle.name!=" ") &&
      (reelCaption.name!=" ") &&
      courseSelected
    ) {
      const incompleteDTO = {
        reelTitle: reelTitle.name,
        reelCaption: reelCaption.name,
        courseId: courseSelected,
        instructorId: "",
      };
      console.log("body: ", incompleteDTO);
      //do submit stuff
      fetch("http://localhost:8080/reel/submitReel/" + reelId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incompleteDTO),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("successfully saved reel: ", result);
          //console.log(JSON.stringify(result.pageQuiz))
        })
        .then(handleSaveReelSucess)
        .then(() => navigate(`/instructorReels`));
    } else {
      console.log("handleSaveReel validation failed");
      console.log("video: ", currentPage.video)
      console.log("title: ", reelTitle.name)
      console.log("caption: ", reelCaption.name)

      if (!currentPage.video) {
        console.log("fail video val")
        setMissingVideoError(true);
      }
      if (reelTitle.name == " ") {
        console.log("fail title val")
        setMissingTitleError(true);
      }
      if (reelCaption.name == " ") {
        console.log("fail caption val")
        setMissingCaptionError(true);
      }
      if (!courseSelected) {
        console.log("fail course selected val")
        setMissingCourseError(true);
      }
    }
  }

  return (
    <>
      <h1 style={{ width: "72%" }}>Create Reel</h1>
      <div className="cards">
        <Box sx={{ width: "100%" }}>
          <div style={{ paddingLeft: "3%" }}>
            <Snackbar
              open={missingVideoError}
              autoHideDuration={3000}
              onClose={handleCloseMissingVideo}
            >
              <Alert
                onClose={handleCloseMissingVideo}
                severity="error"
                sx={{ width: "100%" }}
              >
                Please Upload a Video!
              </Alert>
            </Snackbar>
            <Snackbar
              open={missingTitleError}
              autoHideDuration={3000}
              onClose={handleCloseMissingTitle}
            >
              <Alert
                onClose={handleCloseMissingTitle}
                severity="error"
                sx={{ width: "100%" }}
              >
                Please write a title!
              </Alert>
            </Snackbar>
            <Snackbar
              open={missingCaptionError}
              autoHideDuration={3000}
              onClose={handleCloseMissingCaption}
            >
              <Alert
                onClose={handleCloseMissingCaption}
                severity="error"
                sx={{ width: "100%" }}
              >
                Please write a caption!
              </Alert>
            </Snackbar>
            <Snackbar
              open={missingCourseError}
              autoHideDuration={3000}
              onClose={handleCloseMissingCourse}
            >
              <Alert
                onClose={handleCloseMissingCourse}
                severity="error"
                sx={{ width: "100%" }}
              >
                Please select a Course Tag!
              </Alert>
            </Snackbar>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                to={`/instructorReels`}
                state={{
                  viewAllReelsPath: "/instructorReels",
                }}
                style={{ textDecoration: "none", color: "grey" }}
              >
                <LinkMaterial underline="hover" color="inherit">
                  View All Reels
                </LinkMaterial>
              </Link>
              <Link
                to={`/createReel`}
                state={{
                  viewAllReelsPath: "/instructorReels",
                }}
                style={{ textDecoration: "none", color: "grey" }}
              >
                <LinkMaterial underline="hover" color="inherit">
                  Create Reel
                </LinkMaterial>
              </Link>
            </Breadcrumbs>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 5 }}
            >
              <Tabs
                value={value}
                // onChange={handleChange}
                aria-label="basic tabs example"
              ></Tabs>
            </Box>

            <Grid container direction={"row"} display={"flex"}>
              <Grid
                style={{
                  backgroundColor: "",
                  flex: 1,
                }}
              >
                <p styl={{ color: "grey" }}>Select Course Tag</p>
                <FormControl style={{ width: "70%" }}>
                  <Select
                    style={{
                      width: "100%",
                      fontSize: 16,
                      marginBottom: "20px",
                      backgroundColor: "ButtonFace",
                    }}
                    onChange={handleSelectCourse}
                    value={courseSelected}
                  >
                    {courses.map((item) => (
                      <MenuItem key={item.courseCode} value={item.courseId}>
                        {item.courseCode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br></br>
                <TextField
                  multiline
                  inputProps={{
                    maxLength: REELTITLE_LIMIT,
                  }}
                  type="text"
                  placeholder="Reel Title"
                  value={reelTitle.name}
                  helperText={`${reelTitle.name.length}/${REELTITLE_LIMIT}`}
                  onChange={handleChange("name")}
                  style={{ width: "70%", fontSize: 20, marginBottom: 10 }}
                />
                <TextField
                  multiline
                  inputProps={{
                    maxLength: REELCAPTION_LIMIT,
                  }}
                  type="text"
                  placeholder="Reel Caption"
                  value={reelCaption.name}
                  helperText={`${reelCaption.name.length}/${REELCAPTION_LIMIT}`}
                  onChange={handleCaptionChange("name")}
                  style={{ width: "70%", fontSize: 20 }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <Button
                    className="btn-upload"
                    color="primary"
                    component="span"
                    variant="contained"
                    onClick={handleOpenUploadDialog}
                    style={{
                      width: "20%",
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                    startIcon={<InsertPhotoIcon />}
                  >
                    Upload Reel Video
                  </Button>
                  <Button
                    className="btn-upload"
                    color="primary"
                    component="span"
                    variant="contained"
                    onClick={handleOpenTermsDialog}
                    style={{
                      width: "20%",
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                    startIcon={<InsertPhotoIcon />}
                  >
                    Community Guidelines
                  </Button>
                  <Button
                    className="btn-upload"
                    color="primary"
                    component="span"
                    variant="contained"
                    onClick={handleOpenUploadThumbnailDialog}
                    style={{
                      width: "20%",
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                    startIcon={<InsertPhotoIcon />}
                  >
                    Upload Reel Thumbnail
                  </Button>
                </div>
                <Paper elevation={3} style={{ width: "70%", height: "60%" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {renderVideoImageHolder()}
                    <div style={{width:"20px"}}></div>
                    {renderThumbnailHolder()}
                  </div>
                </Paper>

                <Button
                  className="btn-upload"
                  color="primary"
                  component="span"
                  variant="contained"
                  onClick={handleSaveReel}
                  style={{
                    width: "70%",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Save Reel
                </Button>
                <Button
                  className="btn-upload"
                  color="success"
                  component="span"
                  variant="contained"
                  onClick={handleSubmitReel}
                  style={{
                    width: "70%",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Submit Reel For Approval
                </Button>
                <Dialog
                  open={openUploadDialog}
                  onClose={handleCloseUploadDialog}
                >
                  <DialogTitle>Upload File</DialogTitle>
                  <DialogContent>
                    <h3 style={{ fontWeight: "normal" }}>Current File</h3>
                    {renderVideoImageHolder()}
                    <br></br>
                    <h3 style={{ fontWeight: "normal" }}>New File</h3>
                    <div>
                      {previewImage && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            className="preview my20"
                            src={previewImage}
                            alt=""
                            style={{
                              height: "40%",
                              width: "40%",
                              justifySelf: "center",
                            }}
                          />
                        </div>
                      )}
                      {currentFile && (
                        <Box
                          className="my20"
                          display="flex"
                          alignItems="center"
                        >
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
                      {message && (
                        <Typography
                          variant="subtitle2"
                          className={`upload-message ${isError ? "error" : ""}`}
                        >
                          {message}
                        </Typography>
                      )}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <label htmlFor="btn-upload">
                          <input
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: "none" }}
                            type="file"
                            accept="/*"
                            onChange={selectFile}
                          />
                          <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span"
                          >
                            Choose File
                          </Button>
                        </label>
                        <Button
                          className="btn-upload"
                          color="primary"
                          variant="contained"
                          component="span"
                          disabled={!currentFile}
                          onClick={uploadFile}
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseUploadDialog}>Cancel</Button>
                    <Button onClick={createNewFileItem}>Update</Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openUploadThumbnailDialog}
                  onClose={handleCloseUploadThumbnailDialog}
                >
                  <DialogTitle>Upload Thumbnail</DialogTitle>
                  <DialogContent>
                    <h3 style={{ fontWeight: "normal" }}>Current File</h3>
                    {renderThumbnailHolder()}
                    <br></br>
                    <h3 style={{ fontWeight: "normal" }}>New File</h3>
                    <div>
                      {previewImage && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            className="preview my20"
                            src={previewImage}
                            alt=""
                            style={{
                              height: "40%",
                              width: "40%",
                              justifySelf: "center",
                            }}
                          />
                        </div>
                      )}
                      {currentFile && (
                        <Box
                          className="my20"
                          display="flex"
                          alignItems="center"
                        >
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
                      {message && (
                        <Typography
                          variant="subtitle2"
                          className={`upload-message ${isError ? "error" : ""}`}
                        >
                          {message}
                        </Typography>
                      )}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <label htmlFor="btn-upload">
                          <input
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: "none" }}
                            type="file"
                            accept="/*"
                            onChange={selectFile}
                          />
                          <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span"
                          >
                            Choose File
                          </Button>
                        </label>
                        <Button
                          className="btn-upload"
                          color="primary"
                          variant="contained"
                          component="span"
                          disabled={!currentFile}
                          onClick={uploadFile}
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseUploadDialog}>Cancel</Button>
                    <Button onClick={createNewThumbnailItem}>Update</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
      <Dialog
        open={openTermsDialog}
        onClose={handleCloseTermsDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Educouch Reels Community Guidelines"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please do not post reels containing sexual, religious or illegal undertones. Users found guilty will have their accounts permanently banned.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
