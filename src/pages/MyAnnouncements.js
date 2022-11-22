import * as React from "react";
import "../App.css";
import "../css/TeachingFileList.css";

import {
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import DashboardDrawer from "../components/DashboardDrawer";

export default function MyAnnouncements() {
  const [enrolledClassruns, setEnrolledClassruns] = useState([]);

  const auth = useAuth();
  const user = auth.user;

  React.useEffect(() => {
    var listOfEnrolledCourses =
      "http://localhost:8080/classRun/getEnrolledClassRun/" + user.userId;

    fetch(listOfEnrolledCourses)
      .then((res) => res.json())
      .then((result) => {
        setEnrolledClassruns(result);
      });
  }, [enrolledClassruns]);

  const [currAnnouncements, setCurrAnnouncements] = useState([]);

  function setAnnouncementsForCurrentClassrun(courseId) {
    fetch(
      "http://localhost:8080/announcement/getAllAnnouncementsByCourseId/" +
        courseId
    )
      .then((res) => res.json())
      .then((result) => {
        setCurrAnnouncements(result);
      });
  }

  const renderEmptyRowMessage = () => {
    if (enrolledClassruns.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} style={{ textAlign: "center" }}>
            You are currently not enrolled in any classruns!
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <DashboardDrawer></DashboardDrawer>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">My Announcements</Typography>
          <divider></divider>
          <br />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#B0C4DE" }}>
                  <TableCell>
                    <b>Course Code</b>
                  </TableCell>
                  <TableCell>
                    <b>Course Title</b>
                  </TableCell>
                  <TableCell>
                    <b>New Announcements</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderEmptyRowMessage()}
                {enrolledClassruns.map((classrun) => (
                  <TableRow
                    key={classrun.classRunId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{classrun.course.courseCode}</TableCell>
                    <TableCell>{classrun.course.courseTitle}</TableCell>
                    {setAnnouncementsForCurrentClassrun(
                      classrun.course.courseId
                    )}
                    {currAnnouncements.length !== 0 && (
                      <TableCell component="th" scope="row">
                        <Link
                          to={`/learnerCourseDetails/${classrun.course.courseId}/announcements`}
                          style={{ textDecoration: "none" }}
                        >
                          Click to view for this course
                        </Link>
                      </TableCell>
                    )}
                    {currAnnouncements.length == 0 && (
                      <TableCell component="th" scope="row">
                        No announcements
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={2} style={{ padding: "10px" }}></Grid>
      </Grid>
    </div>
  );
}
