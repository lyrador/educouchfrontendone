import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

import { Link, useLocation, useParams } from "react-router-dom";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingAnnouncementList(props) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

  const handleClickDeleteSnackbar = () => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteSnackbar(false);
  };

  const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);

  const handleClickEditSnackbar = () => {
    setOpenEditSnackbar(true);
  };

  const handleCloseEditSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenEditSnackbar(false);
  };

  const auth = useAuth();
  const user = auth.user;

  //paths
  const location = useLocation();
  const announcementPath = location.pathname.split("/").slice(0, 4).join("/");

  const courseId = location.pathname.split("/")[2];

  const [announcements, setAnnouncements] = useState([]);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");
  const [announcementIdToDelete, setAnnouncementIdToDelete] = useState("");

  const [announcementTitleError, setAnnouncementTitleError] = useState({
    value: false,
    errorMessage: "",
  });
  const [announcementBodyError, setAnnouncementBodyError] = useState({
    value: false,
    errorMessage: "",
  });

  const [refreshPage, setRefreshPage] = useState("");

  React.useEffect(() => {
    setRefreshPage(false);
    fetch(
      "http://localhost:8080/announcement/getAllAnnouncementsByCourseId/" +
        courseId
    )
      .then((res) => res.json())
      .then((result) => {
        setAnnouncements(result);
        console.log(result);
      });
  }, [refreshPage]);

  const [open, setOpen] = React.useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const [editAnnouncementTitle, setEditAnnouncementTitle] = useState("");
  const [editAnnouncementBody, setEditAnnouncementBody] = useState("");
  const [announcementIdToEdit, setAnnouncementIdToEdit] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDeleteDialogOpen = (event, announcementId) => {
    setAnnouncementIdToDelete(announcementId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleClickEditDialogOpen = (
    event,
    announcementId,
    announcementTitle,
    announcementBody
  ) => {
    setEditAnnouncementTitle(announcementTitle);
    setEditAnnouncementBody(announcementBody);
    setAnnouncementIdToEdit(announcementId);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const createNewAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncementTitleError({ value: false, errorMessage: "" });
    setAnnouncementBodyError({ value: false, errorMessage: "" });
    if (announcementTitle == "") {
      setAnnouncementTitleError({
        value: true,
        errorMessage: "Announcement Title cannot be empty!",
      });
    }
    if (announcementBody == "") {
      setAnnouncementBodyError({
        value: true,
        errorMessage: "Announcement Body cannot be empty!",
      });
    }
    if (announcementTitle && announcementBody) {
      var createdByUserId = user.userId;
      var createdByUserName = user.username;
      var createdByUserType = user.userType;
      const newAnnouncement = {
        announcementTitle: announcementTitle,
        announcementBody: announcementBody,
        isRead: "UNREAD",
        createdByUserId,
        createdByUserName,
        createdByUserType,
      };
      console.log(newAnnouncement);
      fetch(
        "http://localhost:8080/announcement/addAnnouncementToCourseByCourseId/" +
          courseId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnnouncement),
        }
      ).then(() => {
        console.log("New Announcement Created Successfully!");
        setRefreshPage(true);
        setAnnouncementTitle("");
        setAnnouncementBody("");
        handleClose();
        handleClickSnackbar();
      });
    }
  };

  const deleteAnnouncement = (e) => {
    e.preventDefault();
    fetch(
      "http://localhost:8080/announcement/deleteAnnouncementById/" +
        announcementIdToDelete,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    ).then(() => {
      console.log("Announcement Deleted Successfully!");
      setRefreshPage(true);
      handleDeleteDialogClose();
      handleClickDeleteSnackbar();
    });
  };

  const editAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncementTitleError({ value: false, errorMessage: "" });
    setAnnouncementBodyError({ value: false, errorMessage: "" });
    if (editAnnouncementTitle == "") {
      setAnnouncementTitleError({
        value: true,
        errorMessage: "Announcement Title cannot be empty!",
      });
    }
    if (editAnnouncementBody == "") {
      setAnnouncementBodyError({
        value: true,
        errorMessage: "Announcement Body cannot be empty!",
      });
    }
    if (editAnnouncementTitle && editAnnouncementBody) {
      var announcementTitle = editAnnouncementTitle;
      var announcementBody = editAnnouncementBody;
      const newEditedAnnouncement = { announcementTitle, announcementBody };
      fetch(
        "http://localhost:8080/announcement/updateAnnouncementById/" +
          announcementIdToEdit,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEditedAnnouncement),
        }
      ).then(() => {
        console.log("Announcement Edited Successfully!");
        setRefreshPage(true);
        handleEditDialogClose();
        handleClickEditSnackbar();
      });
    }
  };

  const renderExtraActions = (
    announcementId,
    announcementTitle,
    announcementBody,
    createdByUserId
  ) => {
    if (createdByUserId === user.userId) {
      return (
        <div>
          <IconButton
            aria-label="settings"
            onClick={(event) =>
              handleClickDeleteDialogOpen(event, announcementId)
            }
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="settings"
            onClick={(event) =>
              handleClickEditDialogOpen(
                event,
                announcementId,
                announcementTitle,
                announcementBody
              )
            }
          >
            <EditIcon />
          </IconButton>
        </div>
      );
    }
  };

  const [query, setQuery] = useState("");

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Announcement Created Succesfully!
            </Alert>
          </Snackbar>
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
              Announcement Deleted Succesfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openEditSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseEditSnackbar}
          >
            <Alert
              onClose={handleCloseEditSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Announcement Updated Succesfully!
            </Alert>
          </Snackbar>

          <div style={{ justifyContent: "center" }}>
            {announcements.length === 0 && (
              <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                This course currently doesn't have any announcements!
              </h1>
            )}
          </div>

          <div className="search">
            {announcements.length > 0 && (
              <input
                type="text"
                placeholder="Search..."
                style={{
                  float: "right",
                  marginLeft: "auto",
                  height: "30px",
                  fontSize: "12pt",
                }}
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
          </div>

          <div style={{ justifyContent: "center" }}>
            {announcements.length > 0 && (
              <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                List of Announcements
              </h1>
            )}
          </div>

          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            onClick={handleClickOpen}
            style={{ float: "right", marginLeft: "auto" }}
          >
            Create New Announcement
          </Button>

          <div style={{ padding: "5%" }}>
            {announcements
              .filter(
                (announcement) =>
                  announcement.announcementTitle
                    .toLowerCase()
                    .includes(query) ||
                  announcement.announcementBody.toLowerCase().includes(query) ||
                  announcement.createdByUserName
                    .toLowerCase()
                    .includes(query) ||
                  announcement.createdDateTime.toLowerCase().includes(query)
              )
              .reverse()
              .map((announcement) => (
                <List sx={{ width: "100%", bgcolor: "#F0F8FF" }}>
                  <ListItem
                    key={announcement.announcementId}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar alt="avatar" src={user.profilePictureURL} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="h6"
                          color="text.primary"
                        >
                          {announcement.announcementTitle}
                          <br />
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ whiteSpace: "pre-line", display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {announcement.createdDateTime}
                            <br />
                            by {announcement.createdByUserName}
                            <br /> <br />
                            {announcement.announcementBody}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    {renderExtraActions(
                      announcement.announcementId,
                      announcement.announcementTitle,
                      announcement.announcementBody,
                      announcement.createdByUserId
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))}
          </div>
        </Grid>
      </Grid>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Announcement</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Announcement Title"
              variant="outlined"
              fullWidth
              required
              style={{ margin: "6px 0" }}
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
              error={announcementTitleError.value}
              helperText={announcementTitleError.errorMessage}
            />
            <TextField
              id="outlined-basic"
              label="Announcement Body"
              variant="outlined"
              fullWidth
              required
              multiline
              maxRows={100}
              style={{ margin: "6px 0" }}
              value={announcementBody}
              onChange={(e) => setAnnouncementBody(e.target.value)}
              error={announcementBodyError.value}
              helperText={announcementBodyError.errorMessage}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createNewAnnouncement}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this announcement?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              These will delete the announcement for both you and Learners
              enrolled in this course. You will not be able to undo this action.
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={deleteAnnouncement} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Editing announcement"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Enter the new announcement details
            </DialogContentText>
            <TextField
              id="outlined-basic"
              label="New Announcement Title"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={editAnnouncementTitle}
              onChange={(e) => setEditAnnouncementTitle(e.target.value)}
              error={announcementTitleError.value}
              helperText={announcementTitleError.errorMessage}
            />
            <TextField
              id="outlined-basic"
              label="New Announcement Body"
              variant="outlined"
              fullWidth
              multiline
              maxRows={100}
              style={{ margin: "6px 0" }}
              value={editAnnouncementBody}
              onChange={(e) => setEditAnnouncementBody(e.target.value)}
              error={announcementBodyError.value}
              helperText={announcementBodyError.errorMessage}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={editAnnouncement} autoFocus>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default TeachingAnnouncementList;
