import {
  Button,
  DialogContent,
  DialogTitle,
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
  DialogContentText,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Alert, Breadcrumbs, Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { Box } from "@mui/system";
import ViewReelComponent from "./ViewReelComponent";
import UploadService from "../../services/UploadFilesService";
import { useAuth } from "../../context/AuthProvider";

export default function InstructorViewReel(props) {
  const auth = useAuth();
  const user = auth.user;
  const instructorId = user.userId;
  const location = useLocation();
  const [courses, setCourses] = React.useState([]);
  const [courseSelected, setCourseSelected] = React.useState("");
  const [reelId, setReelId] = useState(location.state.reelId);
  const [reelTitle, setReelTitle] = useState({
    name: " ",
  });
  const [reelCaption, setReelCaption] = useState({
    name: " ",
  });
  const [reelNumLikes, setReelNumLikes] = useState(location.state.reelNumLikes);
  const [reelNumViews, setReelNumViews] = useState(location.state.reelNumViews);
  const [reelStatusEnum, setReelStatusEnum] = useState(
    location.state.reelStatusEnum
  );
  const [video, setVideo] = useState(location.state.video);
  const [reelCreator, setReelCreator] = useState(location.state.reelCreator);
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const REELTITLE_LIMIT = 30;
  const REELCAPTION_LIMIT = 400;
  const [currentPage, setCurrentPage] = useState([]);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  //edit reel stuff
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(
    "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
  );
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedAttachmentId, setUploadedAttachmentId] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/reel/getReel/" + location.state.reelId)
      .then((res) => res.json())
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
      )
      .then((result) => {
        setCurrentPage(result);
        console.log("setcurrentPage as: ", result);
        if (result.video) {
          console.log("fileURl: ", result.video.fileURL);
        }
        setReelId(location.state.reelId);
        if (!result.reelTitle) {
          setReelTitle({
            name: " ",
          });
        } else {
          setReelTitle({
            name: result.reelTitle,
          });
        }
        if (!result.reelCaption) {
          setReelCaption({
            name: " ",
          });
        } else {
          setReelCaption({
            name: result.reelCaption,
          });
        }
        setReelStatusEnum(result.reelStatusEnum);
        setVideo(result.video);
        setReelCreator(result.reelCreator);
        setCourseSelected(result.courseId);
      });
  }, [refresh]);

  const handleClickErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };
  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };
  const [openUploadThumbnailDialog, setOpenUploadThumbnailDialog] =
    React.useState(false);
  const handleOpenUploadThumbnailDialog = () => {
    setOpenUploadThumbnailDialog(true);
  };
  const handleCloseUploadThumbnailDialog = () => {
    setOpenUploadThumbnailDialog(false);
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

  const handleSelectCourse = (e) => {
    setCourseSelected(e.target.value);
    console.log("selecting: ", e.target.value);
  };

  //delete reel stuff
  const handleClickDeleteSnackbar = () => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteSnackbar(false);
  };

  const handleClickDeleteDialogOpen = (event) => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const deleteReel = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/reel/deleteReel/" + location.state.reelId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // body:JSON.stringify(newComment)
    }).then(() => {
      console.log("Reel Deleted Successfully!");
      handleDeleteDialogClose();
      handleClickDeleteSnackbar();
      handleBack();
    });
  };

  function handleBack() {
    navigate(`/instructorReels`);
  }

  const renderVideoImageHolder = () => {
    if (video) {
      return (
        <div style={{ height: "500px", flex: "6" }}>
          {" "}
          <ReactPlayer
            className="video"
            width="100%"
            height="100%"
            controls
            url={video.fileURL}
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
        <div style={{ height: "500px", flex: "5" }}>
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
    }).then(() => navigate(`/instructorReels`));
    //       .then((response) => response.json())
    //       .then((res) => {
    //         console.log("called uploadVideoToReel: ", res);
    //       });
  }

  function handleSubmitReel() {
    if (video && reelCaption.name && reelTitle.name) {
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
        // .then((res) => res.json())
        // .then((result) => {
        //   console.log("successfully saved reel: ", result);
        // })
        .then(() => navigate(`/instructorReels`));
    } else {
      console.log("handleSaveReel validation failed");
      if (!video) {
        setMissingVideoError(true);
      }
      if (!reelTitle.name) {
        setMissingTitleError(true);
      }
      if (!reelCaption.name) {
        setMissingCaptionError(true);
      }
    }
  }

  return (
    <>
      <Snackbar
        open={openDeleteSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseDeleteSnackbar}
      >
        <Alert
          onClose={handleCloseDeleteSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Reel Deleted Succesfully!
        </Alert>
      </Snackbar>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          color="primary"
          variant={"contained"}
          onClick={handleBack}
          style={{ marginLeft: "50px", marginTop: "10px" }}
        >
          Back to View all Reels
        </Button>
        <Button
          color="secondary"
          variant={"contained"}
          onClick={handleClickDeleteDialogOpen}
          style={{ marginLeft: "50px", marginTop: "10px" }}
        >
          Delete this reel
        </Button>
      </div>
      {!(currentPage.reelApprovalStatusEnum == "INCOMPLETE") ? (
        <ViewReelComponent
          reelId={reelId}
          reelTitle={location.state.reelTitle}
          reelCaption={location.state.reelCaption}
          reelStatusEnum={location.state.reelApprovalStatusEnum}
          reelNumLikes={reelNumLikes}
          reelNumViews={location.state.reelNumViews}
          video={location.state.video}
          reelCreator={location.state.reelCreator}
          rejectionReason={location.state.rejectionReason}
        ></ViewReelComponent>
      ) : (
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
                <FormControl style={{ width: "80%" }}>
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
                  style={{ width: "80%", fontSize: 20, marginBottom: 10 }}
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
                  style={{ width: "80%", fontSize: 20 }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
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
                <Paper elevation={3} style={{ width: "80%", height: "60%" }}>
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
                    <div style={{ width: "20px" }}></div>
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
                    width: "80%",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Save Reel
                </Button>
                <Button
                  className="btn-upload"
                  color="blue"
                  component="span"
                  variant="contained"
                  onClick={handleSubmitReel}
                  style={{
                    width: "80%",
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
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Reel"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            These will delete the Reel and cannot be reversed. Are you sure you
            want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={deleteReel}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
