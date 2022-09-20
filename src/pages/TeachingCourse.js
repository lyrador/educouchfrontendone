import * as React from 'react';
import { useState } from 'react';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import Grid from '@mui/material/Grid';

import { useParams } from 'react-router-dom';

export default function TeachingCourse(props) {

  let { courseId } = useParams();
  const[course, setCourse] = useState('')

  React.useEffect(() => {
    fetch("http://localhost:8080/course/courses/" + courseId).
    then(res=>res.json()).then((result)=>{
        setCourse(result); 
      }
    )
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={ courseId }></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs={10}>
          <h1>{course.courseTitle}</h1>
        </Grid>
      </Grid>

    </>
  );
}
