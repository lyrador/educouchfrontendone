import * as React from "react";

import { useLocation } from "react-router-dom";
import {
  Button,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";

import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";

import { useState } from "react";

import { useAuth } from "../context/AuthProvider";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";

function LearnerAnnouncementList(props) {
  const auth = useAuth();
  const user = auth.user;

  //paths
  const location = useLocation();

  const courseId = location.pathname.split("/")[2];

  const [announcements, setAnnouncements] = useState([]);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");
  const [editAnnouncementTitle, setEditAnnouncementTitle] = useState("");
  const [editAnnouncementBody, setEditAnnouncementBody] = useState("");
  const [announcementIdToRead, setAnnouncementIdToRead] = useState("");

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

  const [readDialogueOpen, setReadDialogueOpen] = React.useState(false);

  const [query, setQuery] = useState("");

  const [openReadSnackbar, setOpenReadSnackbar] = React.useState(false);

  const handleClickReadSnackbar = () => {
    setOpenReadSnackbar(true);
  };

  const handleCloseReadSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenReadSnackbar(false);
  };

  function handleClickReadAnnouncement(
    event,
    announcementId,
    announcementTitle,
    announcementBody
  ) {
    setEditAnnouncementTitle(announcementTitle);
    setEditAnnouncementBody(announcementBody);
    setAnnouncementIdToRead(announcementId);
    setReadDialogueOpen(true);
  }

  const handleReadDialogueClose = () => {
    setReadDialogueOpen(false);
  };

  const readAnnouncement = (e) => {
    e.preventDefault();
    var announcementTitle = editAnnouncementTitle;
    var announcementBody = editAnnouncementBody;
    var isRead = "READ";
    const newEditedAnnouncement = {
      announcementTitle,
      announcementBody,
      isRead,
    };
    fetch(
      "http://localhost:8080/announcement/updateAnnouncementById/" +
        announcementIdToRead,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEditedAnnouncement),
      }
    ).then((res) => res.json());
    setRefreshPage(true);
    // then close dialogue
    handleReadDialogueClose();
    // then open snackbar for successful release
    handleClickReadSnackbar();
  };

  const renderExtraActions = (
    announcementId,
    announcementTitle,
    announcementBody,
    isRead
  ) => {
    if (isRead === "UNREAD") {
      return (
        <div>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={(event) =>
              handleClickReadAnnouncement(
                event,
                announcementId,
                announcementTitle,
                announcementBody
              )
            }
          >
            <MarkChatReadIcon />
            <div style={{ fontSize: "18px" }}>Mark As Read</div>
          </IconButton>
        </div>
      );
    }
    if (isRead === "READ") {
      return (
        <div>
          <IconButton edge="end" aria-label="delete">
            <MarkChatReadIcon />
            <div style={{ fontSize: "18px" }}>Read</div>
          </IconButton>
        </div>
      );
    }
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <Snackbar
            open={openReadSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseReadSnackbar}
          >
            <Alert
              onClose={handleCloseReadSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Announcement marked as Read!
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

          <div style={{ padding: "3%" }}>
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
                  announcement.createdDateTime.toLowerCase().includes(query) ||
                  announcement.isRead.toLowerCase().includes(query)
              )
              .reverse()
              .map((announcement) => (
                <List sx={{ width: "100%", bgcolor: "#F0F8FF" }}>
                  <ListItem
                    key={announcement.announcementId}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="avatar"
                        src={announcement.profilePictureURL}
                      />
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
                      announcement.isRead
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))}
          </div>
        </Grid>
      </Grid>
      <div>
        <Dialog
          open={readDialogueOpen}
          onClose={handleReadDialogueClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Mark this announcement as read?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleReadDialogueClose}>Cancel</Button>
            <Button onClick={readAnnouncement} autoFocus>
              Mark as Read
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default LearnerAnnouncementList;
