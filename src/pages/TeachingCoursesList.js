import * as React from 'react';
import { useState } from 'react';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import TeachingFileComponent from '../components/TeachingFileComponent';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TeachingCoursesCards from '../components/TeachingCoursesCards';
import { useAuth } from "../context/AuthProvider";


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TeachingCoursesList() {
  // const [currPage, setCurrPage] = useState("course");
  // function handleChange(newCurrPage) {
  //   setCurrPage(newCurrPage);
  // }

  const auth = useAuth();
  const user = auth.user;

  return (
    <>
      <div>
        <Grid container>
          <Grid item>
            <h1 style={{textAlign: 'left', padding: '0 4rem'}}>List of Courses</h1>
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            { ((user.userType === "ORG_ADMIN") || (user.userType === "INSTRUCTOR")) &&
              <Link to='/myTeachingCourse/new' style={{ textDecoration: 'none' }}>
                <Button
                  className="btn-upload"
                  color="primary"
                  variant="contained"
                  component="span"
                //onClick={uploadImage}
                >
                  Create New Course
                </Button>
              </Link>
            }
          </Grid>
        </Grid>
        <TeachingCoursesCards></TeachingCoursesCards>
      </div>
    </>
  );
}