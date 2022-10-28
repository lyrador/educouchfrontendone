import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useLocation, useParams } from "react-router-dom";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";
import { Grid } from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { Button } from "@mui/material";

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

  const deleteForum = (e) => {
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
    var announcementTitle = editAnnouncementTitle;
    var announcementBody = editAnnouncementBody;
    const newEditedAnnoucement = { announcementTitle, announcementBody };
    fetch(
      "http://localhost:8080/announcement/updateAnnouncementById/" +
        announcementIdToEdit,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEditedAnnoucement),
      }
    ).then(() => {
      console.log("Announcement Edited Successfully!");
      setRefreshPage(true);
      handleEditDialogClose();
      handleClickEditSnackbar();
    });
  };

  const renderEmptyRowMessage = () => {
    if (announcements.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: "center" }}>
            There are currently no announcements in this course!
          </TableCell>
        </TableRow>
      );
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
          <Breadcrumbs aria-label="breadcrumb">
            <LinkMaterial
              underline="hover"
              color="inherit"
              href={`${announcementPath}`}
            >
              Announcements
            </LinkMaterial>
          </Breadcrumbs>

          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              style={{ float: "right", marginLeft: "auto" }}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div style={{ justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              Announcements
            </h1>
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
          </div>
          <div style={{ padding: "5%" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ backgroundColor: "#B0C4DE" }}>
                  <TableRow>
                    <TableCell>
                      <b>Announcement Title</b>
                    </TableCell>
                    <TableCell>
                      <b>Announcement Content</b>
                    </TableCell>
                    <TableCell>
                      <b>Created By</b>
                    </TableCell>
                    <TableCell>
                      <b>Created On</b>
                    </TableCell>
                    <TableCell>
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderEmptyRowMessage()}
                  {announcements
                    .filter((announcement) =>
                      announcement.announcementTitle
                        .toLowerCase()
                        .includes(query)
                    )
                    .map((announcement) => (
                      <TableRow
                        key={announcement.announcementId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Link
                            to={`${announcementPath}/${announcement.announcementId}`}
                            state={{
                              announcementTitle: announcement.announcementTitle,
                            }}
                            style={{ textDecoration: "none" }}
                          >
                            {announcement.announcementTitle}
                          </Link>
                        </TableCell>
                        <TableCell>{announcement.announcementBody}</TableCell>
                        <TableCell>{announcement.createdByUserName}</TableCell>
                        <TableCell>{announcement.createdDateTime}</TableCell>
                        <TableCell>
                          <div>
                            {renderExtraActions(
                              announcement.announcementId,
                              announcement.announcementTitle,
                              announcement.announcementBody,
                              announcement.createdByUserId
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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
              maxRows={10}
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
            {"Delete this forum?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              These will delete all the discussions and comments inside the
              forum. You will not be able to undo this action. Are you sure you
              want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={deleteForum} autoFocus>
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
              label="Discussion Title"
              variant="outlined"
              fullWidth
              style={{ margin: "6px 0" }}
              value={editAnnouncementTitle}
              onChange={(e) => setEditAnnouncementTitle(e.target.value)}
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
