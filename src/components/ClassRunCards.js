import React, { useState, useEffect } from "react";
import "../App.css";
import ClassRunCardItem from "./ClassRunCardItem";
import "../css/CardItem.css";
import { useAuth } from "../context/AuthProvider";
import cloudComputing from "../assets/cloudComputing.png";
import PropTypes from "prop-types";

import { Box, Tabs, Tab, Typography, CircularProgress } from "@mui/material";

function ClassRunCards() {
  // user
  const auth = useAuth();
  const user = auth.user;
  console.log("User is " + user.userId);
  // error
  const [errorMessage, setErrorMessage] = useState("");
  const [messageNotification, setMessageNotification] = useState(false);

  // loadingData
  const [isLoading, setIsLoading] = useState(true);

  // status: enrolled
  const [listOfEnrolledCourses, setListOfEnrolledCourses] = useState([]);

  // status: deposit paid
  const [listOfReservedCourses, setListOfReservedCourses] = useState([]);

  // status: reserved (need payment)
  const [listOfNeedPaymentCourses, setListOfNeedPaymentCourses] = useState([]);

  // status: schedule change (need schedule change)
  const [listOfNeedScheduleChangeCourses, setListOfNeedScheduleChangeCourses] =
    useState([]);

  // status: refund request
  const [listOfRefundRequestCourses, setListOfRefundRequestCourses] = useState(
    []
  );

  const handleLoadingDone = () => {
    setIsLoading(false);
  };

  const [refreshPage, setRefreshPage] = useState("");

  React.useEffect(() => {
    setRefreshPage(false);

    var listOfDepositPaidCoursesUrl =
      "http://localhost:8080/classRun/getDepositPaidClassRuns/" + user.userId;
    fetch(listOfDepositPaidCoursesUrl)
      .then((res) => res.json())
      .then((result) => {
        setListOfReservedCourses(result);
      })
      .catch((err) => {
        setErrorMessage(err);
      });

    var listOfEnrolledCoursesUrl =
      "http://localhost:8080/classRun/getEnrolledClassRun/" + user.userId;

    fetch(listOfEnrolledCoursesUrl)
      .then((res) => res.json())
      .then((result) => {
        setListOfEnrolledCourses(result);
      })
      .catch((err) => {
        setErrorMessage(err);
      });

    var listOfNeedScheduleChangeUrl =
      "http://localhost:8080/classRun/getNeedScheduleChangeClassRuns/" +
      user.userId;
    fetch(listOfNeedScheduleChangeUrl)
      .then((res) => res.json())
      .then((result) => {
        setListOfNeedScheduleChangeCourses(result);
      })
      .catch((err) => {
        setErrorMessage(err);
      });

    var listOfNeedPaymentCourseUrl =
      "http://localhost:8080/classRun/getNeedPaymentClassRuns/" + user.userId;
    fetch(listOfNeedPaymentCourseUrl)
      .then((res) => res.json())
      .then((result) => {
        setListOfNeedPaymentCourses(result);
      })
      .catch((err) => {
        setErrorMessage(err);
      });

    var listOfRefundRequestCoursesUrl =
      "http://localhost:8080/classRun/getEnrolledRefundRequest/" + user.userId;
    fetch(listOfRefundRequestCoursesUrl)
      .then((res) => res.json())
      .then((result) => {
        setListOfRefundRequestCourses(result);
      })
      .catch((err) => {
        setErrorMessage(err);
      });

    handleLoadingDone();
  }, [refreshPage]);

  // Tab Panel
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <div className="cards">
          <div className="cards-container">
            <Box sx={{ width: "100%" }}>
              <div style={{ paddingLeft: "3%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Enrolled" {...a11yProps(0)} />
                    <Tab label="Reserved" {...a11yProps(1)} />
                    <Tab label="Pending Enrolment" {...a11yProps(2)} />
                    <Tab label="Schedule Change" {...a11yProps(3)} />
                    <Tab label="Refund Request" {...a11yProps(4)} />
                  </Tabs>
                </Box>
              </div>
              <TabPanel value={value} index={0}>
                {listOfEnrolledCourses && listOfEnrolledCourses.length <= 0 && (
                  <Typography style={{ paddingLeft: "2.5rem" }}>
                    Currently, you are not enrolled in any course.
                  </Typography>
                )}
                <div className="cards-wrapper">
                  <ul className="cards-items">
                    {listOfEnrolledCourses &&
                      listOfEnrolledCourses.map((classRun, id) => (
                        <ClassRunCardItem
                          key={id}
                          src={cloudComputing}
                          courseId={classRun.course.courseId}
                          courseCode={classRun.course.courseCode}
                          courseTitle={classRun.course.courseTitle}
                          isEnrolled="true"
                          courseAnnouncements={classRun.course.announcements}
                          classRunDaysOfWeek={classRun.classRunDaysOfTheWeek}
                          startDate={classRun.classRunStart}
                          endDate={classRun.classRunEnd}
                          classRunStartTime={classRun.classRunStartTime}
                          classRunEndTime={classRun.classRunEndTime}
                        />
                      ))}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {listOfReservedCourses && listOfReservedCourses.length <= 0 && (
                  <Typography style={{ paddingLeft: "2.5rem" }}>
                    Currently, you have not reserved any courses at all.
                  </Typography>
                )}

                <div className="cards-wrapper">
                  <ul className="cards-items">
                    {listOfReservedCourses &&
                      listOfReservedCourses.map((classRun, id) => (
                        <ClassRunCardItem
                          key={id}
                          src={cloudComputing}
                          courseId={classRun.course.courseId}
                          courseCode={classRun.course.courseCode}
                          courseTitle={classRun.course.courseTitle}
                          classRunDaysOfWeek={classRun.classRunDaysOfTheWeek}
                          startDate={classRun.classRunStart}
                          endDate={classRun.classRunEnd}
                          classRunStartTime={classRun.classRunStartTime}
                          classRunEndTime={classRun.classRunEndTime}
                        />
                      ))}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                {listOfNeedPaymentCourses &&
                  listOfNeedPaymentCourses.length <= 0 && (
                    <Typography style={{ paddingLeft: "2.5rem" }}>
                      Currently, you don't have any courses that are pending for
                      full payment.
                    </Typography>
                  )}
                {listOfNeedPaymentCourses &&
                  listOfNeedPaymentCourses.length > 0 && (
                    <Typography style={{ paddingLeft: "2.5rem" }}>
                      In order for you to confirm your enrolment, please pay the
                      remaining course fee.
                    </Typography>
                  )}
                <div className="cards-wrapper">
                  <ul className="cards-items">
                    {listOfNeedPaymentCourses &&
                      listOfNeedPaymentCourses.map((classRun, id) => (
                        <ClassRunCardItem
                          key={id}
                          src={cloudComputing}
                          courseId={classRun.course.courseId}
                          courseCode={classRun.course.courseCode}
                          courseTitle={classRun.course.courseTitle}
                          classRunDaysOfWeek={classRun.classRunDaysOfTheWeek}
                          startDate={classRun.classRunStart}
                          endDate={classRun.classRunEnd}
                          classRunStartTime={classRun.classRunStartTime}
                          classRunEndTime={classRun.classRunEndTime}
                        />
                      ))}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                {listOfNeedScheduleChangeCourses &&
                  listOfNeedScheduleChangeCourses.length <= 0 && (
                    <Typography style={{ paddingLeft: "2.5rem" }}>
                      Currently, you don't have any courses that need you to
                      change the schedule of your class run.
                    </Typography>
                  )}
                {listOfNeedScheduleChangeCourses &&
                  listOfNeedScheduleChangeCourses.length > 0 && (
                    <Typography style={{ paddingLeft: "2.5rem" }}>
                      In order for you to confirm your enrolment, please choose
                      a new class run schedule and pay the remaining course fee.
                    </Typography>
                  )}

                <div className="cards-wrapper">
                  <ul className="cards-items">
                    {listOfNeedScheduleChangeCourses &&
                      listOfNeedScheduleChangeCourses.map((classRun, id) => (
                        <ClassRunCardItem
                          key={id}
                          src={cloudComputing}
                          courseId={classRun.course.courseId}
                          courseCode={classRun.course.courseCode}
                          courseTitle={classRun.course.courseTitle}
                          classRunDaysOfWeek={classRun.classRunDaysOfTheWeek}
                          startDate={classRun.classRunStart}
                          endDate={classRun.classRunEnd}
                          classRunStartTime={classRun.classRunStartTime}
                          classRunEndTime={classRun.classRunEndTime}
                        />
                      ))}
                  </ul>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                {listOfRefundRequestCourses &&
                  listOfRefundRequestCourses.length <= 0 && (
                    <Typography style={{ paddingLeft: "2.5rem" }}>
                      Currently, you don't have any refund request for any
                      course fee deposit.
                    </Typography>
                  )}
                <div className="cards-wrapper">
                  <ul className="cards-items">
                    {listOfRefundRequestCourses &&
                      listOfRefundRequestCourses.map((classRun, id) => (
                        <ClassRunCardItem
                          key={id}
                          src={cloudComputing}
                          courseId={classRun.course.courseId}
                          courseCode={classRun.course.courseCode}
                          courseTitle={classRun.course.courseTitle}
                          classRunDaysOfWeek={classRun.classRunDaysOfTheWeek}
                          startDate={classRun.classRunStart}
                          endDate={classRun.classRunEnd}
                          classRunStartTime={classRun.classRunStartTime}
                          classRunEndTime={classRun.classRunEndTime}
                        />
                      ))}
                  </ul>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </>
    );
  }
}

export default ClassRunCards;
