import * as React from 'react';
import { useState } from 'react';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import TeachingFileComponent from '../components/TeachingFileComponent';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function TeachingCourses() {
  const [currPage, setCurrPage] = useState("course");
  function handleChange(newCurrPage) {
    setCurrPage(newCurrPage);
  }
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer value={currPage} onChange={handleChange}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <h1>{currPage}</h1>
          {currPage === "Files" &&
            <TeachingFileComponent></TeachingFileComponent>
          }
        </Grid>
      </Grid>

    </>
  );
}
