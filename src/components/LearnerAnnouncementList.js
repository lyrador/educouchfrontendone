import * as React from "react";

import { useLocation } from "react-router-dom";
import {
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

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

  const [query, setQuery] = useState("");

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
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
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LearnerAnnouncementList;
