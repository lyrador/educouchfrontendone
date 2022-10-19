import {
  Alert,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Snackbar,
} from "@mui/material";
import LinkMaterial from "@mui/material/Link";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PartialCreateAssessment from "../components/PartialCreateAssessment";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";

export default function CreateAssessment(props) {
  const location = useLocation();
  const assessmentsPath = location.state.assessmentsPathProp;
  const createAssessmentPath = location.pathname
    .split("/")
    .slice(0, 5)
    .join("/");
  const courseId = location.pathname.split("/")[2];

  //need to have callback func to update assessment list
  const [assessments, setAssessments] = useState([]);

  const assessment = {
    assessmentTitle: "",
    assessmentDescription: "",
    assessmentMaxScore: "",
    assessmentStartDate: "",
    assessmentFileSubmissionEnum: "",
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <TeachingCoursesDrawer></TeachingCoursesDrawer>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent={"space-between"}
        width="100%"
        alignContent={"center"}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to={`${assessmentsPath}`}
            state={{
              assessmentsPathProp: { assessmentsPath },
            }}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Assessments
            </LinkMaterial>
          </Link>
          <Link
            to={`${createAssessmentPath}`}
            state={{
              assessmentsPathProp: { assessmentsPath },
            }}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Create Assessment
            </LinkMaterial>
          </Link>
        </Breadcrumbs>
        <h1>Assessment Creation</h1>

        <PartialCreateAssessment
          assessmentPathProp={assessmentsPath}
          createAssessmentPathProp={createAssessmentPath}
          courseIdProp={courseId}
        />
      </Grid>
    </Grid>
  );
}
