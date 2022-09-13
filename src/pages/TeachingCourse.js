import * as React from 'react';
import { useState } from 'react';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import TeachingFileComponent from '../components/TeachingFileComponent';
import TeachingForumList from '../components/TeachingForumList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { useParams } from 'react-router-dom';

export default function TeachingCourse(props) {

  let { moduleCode } = useParams();

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer moduleCode={ moduleCode }></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <h1>{moduleCode}</h1>
        </Grid>
      </Grid>

    </>
  );
}
