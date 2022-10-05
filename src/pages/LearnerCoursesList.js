import * as React from 'react';
import Grid from '@mui/material/Grid';
import TeachingCoursesCards from '../components/TeachingCoursesCards';
import { Button, Typography } from '@mui/material';
import LearnerCourseDrawer from '../components/LearnerCourseDrawer';
import ClassRunCards from '../components/ClassRunCards';

export default function LearnerCoursesList() {
  // const [currPage, setCurrPage] = useState("course");
  // function handleChange(newCurrPage) {
  //   setCurrPage(newCurrPage);
  // }

  return (
    <>
      <div>
        <Typography variant="h4" style={{ paddingLeft: '8.5rem' }}>
          List of my courses
        </Typography>
        <ClassRunCards></ClassRunCards>

      </div>
    </>
  );
}