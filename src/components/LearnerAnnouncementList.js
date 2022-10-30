import * as React from "react";

import { useLocation } from "react-router-dom";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

  const [query, setQuery] = useState("");

  function handleMarkAsRead(announcementId) {
    fetch(
      "http://localhost:8080/announcement/markAnnouncementAsRead/" +
        announcementId,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then();
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <div style={{ justifyContent: "center" }}>
            <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
              Announcements
            </h1>
          </div>

          <div className="search">
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
          </div>
          <div style={{ padding: "3%" }}>
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
                    .filter(
                      (announcement) =>
                        announcement.announcementTitle
                          .toLowerCase()
                          .includes(query) ||
                        announcement.announcementBody
                          .toLowerCase()
                          .includes(query) ||
                        announcement.createdByUserName
                          .toLowerCase()
                          .includes(query) ||
                        announcement.createdDateTime
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
                        <TableCell>{announcement.announcementTitle}</TableCell>
                        <TableCell>{announcement.announcementBody}</TableCell>
                        <TableCell>{announcement.createdByUserName}</TableCell>
                        <TableCell>{announcement.createdDateTime}</TableCell>
                        <TableCell>
                          {announcement.isRead == "READ" && (
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox defaultChecked disabled />}
                                label="Read"
                              />
                            </FormGroup>
                          )}
                          {announcement.isRead == "UNREAD" && (
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                onChange={handleMarkAsRead(
                                  announcement.announcementId
                                )}
                                label="Mark As Read"
                              />
                            </FormGroup>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LearnerAnnouncementList;