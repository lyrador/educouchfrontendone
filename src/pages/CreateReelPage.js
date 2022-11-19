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
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import PropTypes from "prop-types";
import { TabPanel } from "@material-ui/lab";
import ReelCardItem from "../components/ReelCardItem";
import { Link, useLocation } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { useState } from "react";
import ReactPlayer from "react-player";
import UploadService from "../services/UploadFilesService";

export default function CreateReelPage(props) {
  const auth = useAuth();
  const user = auth.user;
  const instructorId = user.userId;

  const location = useLocation();
  const reelId = location.state.reelId;

  const REELTITLE_LIMIT = 30;
  const REELCAPTION_LIMIT = 100;

  const [reels, setReels] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [refresh, setRefresh] = React.useState(false);
  const [reelTitle, setReelTitle] = React.useState({
    name: "",
  });
  const [reelCaption, setReelCaption] = React.useState({
    name: "",
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
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };
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
  const handleClickErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/reel/getReel/" + reelId)
      .then((res) => res.json())
      .then((result) => {
        setCurrentPage(result);
        console.log("setcurrentPage as: ", result);
        //console.log(JSON.stringify(result.pageQuiz))
      });
  }, [refresh]);

  const renderVideoImageHolder = () => {
    if (currentPage && currentPage.video) {
      return (
        <div style={{ height: "200px" }}>
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
        <div style={{ textAlign: "center" }}>
          <div>There is no current file!</div>
        </div>
      );
    }
  };

  //   const renderFileRemovalButton = () => {
  //     if (currentPage.video) {
  //       return (
  //         <div
  //           style={{
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <Button
  //             className="btn-upload"
  //             color="primary"
  //             variant="contained"
  //             component="span"
  //             onClick={removeFileItem}
  //           >
  //             Remove File
  //           </Button>
  //         </div>
  //       );
  //     }
  //   };

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
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

  //need to change out API
  //   const removeFileItem = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8080/interactivePage/" +
  //           props.pageId +
  //           "/removeFileItem",
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );
  //       console.log(response);
  //       if (response.ok == false) {
  //         console.log("Error");
  //         handleClickErrorSnackbar();
  //       } else {
  //         console.log("File Item Removed Successfully!");
  //         handleClickSnackbar();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       handleClickErrorSnackbar();
  //     }
  //     //setRefreshToolbar(true)
  //     props.setRefreshInteractivePage(true);
  //     handleCloseUploadDialog();
  //   };

  const handleChange = (name) => (event) => {
    setReelTitle({ ...reelTitle, [name]: event.target.value });
  };

  const handleCaptionChange = (name) => (event) => {
    setReelCaption({ ...reelCaption, [name]: event.target.value });
  };

  return (
    <>
      <h1>Create Reel</h1>
      <div className="cards">
        <Box sx={{ width: "100%" }}>
          <div style={{ paddingLeft: "3%" }}>
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
                    maxLength: REELTITLE_LIMIT,
                  }}
                  type="text"
                  placeholder="Reel Caption"
                  value={reelCaption.name}
                  helperText={`${reelCaption.name.length}/${REELCAPTION_LIMIT}`}
                  onChange={handleCaptionChange("name")}
                  style={{ width: "70%", fontSize: 20 }}
                />
                <Button
                  className="btn-upload"
                  color="primary"
                  component="span"
                  variant="contained"
                  onClick={handleOpenUploadDialog}
                  style={{ width: "80%", marginTop: "10px" }}
                  startIcon={<InsertPhotoIcon />}
                >
                  Upload Video
                </Button>
                <Paper elevation={3} style={{ width: "100%", height: "100%" }}>
                  <div style={{ width: "100%", height: "100%" }}>
                    {renderVideoImageHolder()}
                  </div>
                </Paper>

                <Dialog
                  open={openUploadDialog}
                  onClose={handleCloseUploadDialog}
                >
                  <DialogTitle>Upload File</DialogTitle>
                  <DialogContent>
                    <h3 style={{ fontWeight: "normal" }}>Current File</h3>
                    {renderVideoImageHolder()}
                    {/* {renderFileRemovalButton()} */}
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
              </Grid>
              <Grid
                style={{
                  backgroundColor: "orange",
                  flex: 1,
                }}
              >
                do the preview here (maybe)
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
    </>
  );
}
