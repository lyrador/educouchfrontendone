import React, { useState, useEffect } from "react";
import "../App.css";
import CardItem from "./CardItem";
import "../css/CardItem.css";
import { useAuth } from "../context/AuthProvider";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import RegisterOrganisationAdminPage from "../pages/RegisterOrganisationAdminPage";

function TeachingCoursesCards() {
  const auth = useAuth();
  const user = auth.user;

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
  const [courses, setCourses] = useState([]);
  const [learnerCourses, setLearnerCourses] = React.useState([]);
  const [instructorCourses, setInstructorCourses] = React.useState([]);
  const [instructor, setInstructor] = React.useState(''); 
  const [organisation, setOrganisation] = React.useState(''); 


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/educator/findInstructor?instructorUsername=" + user.username)
    .then((res) => res.json())
    .then((result) => {
      setInstructor(result)
      console.log(instructor)
    })
  }, []); 

  console.log(instructor.instructorId)


  React.useEffect(() => {
    fetch("http://localhost:8080/course/instructors/" + instructor.instructorId + "/courses")
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      })
      .then(
        courses
          .filter((course) => course.courseStatus === "Live")
          .map((liveCourse) =>
            setLearnerCourses([...learnerCourses, liveCourse])
          )
      )
      .then(
        courses
          .filter((course) => course.courseStatus === "Accepted")
          .map((approvedCourse) =>
            setInstructorCourses([...instructorCourses, approvedCourse])
          )
      );
  }, [instructor]);

  console.log(courses);

  return (
    <>
      <div className="cards">
        <div className="cards-container">
          <Box sx={{ width: "100%" }}>
            <div style={{ paddingLeft: "3%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                {((user.userType === "ORG_ADMIN") || (user.userType === "INSTRUCTOR")) && (
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    {/*<Tab label="Drafts" {...a11yProps(0)} />
                     <Tab label="Ongoing" {...a11yProps(1)} />
                            <Tab label="Completed" {...a11yProps(2)} /> */}
                  </Tabs>
                )}
              </Box>
            </div>
            <TabPanel value={value} index={0}>
              <div className="cards-wrapper">
                {((user.userType === "ORG_ADMIN") || (user.userType === "INSTRUCTOR")) && (
                  <ul className="cards-items">
                    {courses.map((course) => (
                      <CardItem
                        src="images/computing.jpg"
                        text={course.courseTitle}
                        label={course.courseCode}
                        courseId={course.courseId}
                      />
                    ))}
                  </ul>
                )}

                {user.userType === "LEARNER" && (
                  <ul className="cards-items">
                    {learnerCourses.map((course) => (
                      <CardItem
                        src="images/computing.jpg"
                        text={course.courseTitle}
                        label={course.courseCode}
                        courseId={course.courseId}
                      />
                    ))}
                    {learnerCourses.values.length === 0 && (
                      <h3>You don't have any courses!</h3>
                    )}
                  </ul>
                )}
              </div>
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
                        <div className='cards-wrapper'>
                          <ul className='cards-items'>
                              <CardItem 
                              src="images/soc.jpg"
                              text="SC1233 Society and Sociology"
                              label='Sociology'
                              // moduleCode="SC1233"
                              />
                          </ul>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <div className='cards-wrapper'>
                        <ul className='cards-items'>
                            <CardItem 
                            src="images/computing.jpg"
                            text="CS1010 Introduction to Computer Science"
                            label='Computing'
                            // moduleCode="CS1010"
                            />
                        </ul>
                      </div>
                    </TabPanel> */}
          </Box>
        </div>
      </div>
    </>
  );
}

export default TeachingCoursesCards;
