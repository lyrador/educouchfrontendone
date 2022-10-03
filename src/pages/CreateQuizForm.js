import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useAuth } from "../context/AuthProvider";
import { Link, useLocation, useParams } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";

import { Breadcrumbs, Grid } from "@mui/material";
import { Paper, Button, createTheme } from "@mui/material";
import { useState } from "react";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";

export default function CreateQuizForm(props) {
  React.useEffect(() => {
    console.log("assessment path: " + assessmentPath);
  }, []);

  const location = useLocation();
  const assessmentPath = location.pathname.split("/").slice(0, 4).join("/");

  const [formContent, setFormContent] = useState([]);
  const [textField, setTextField] = useState("");

  const editFieldTitle = (fieldName, questionTitle) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name == fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].questionTitle = questionTitle;
      setFormContent(formFields);
    }
  };

  const editFieldType = (fieldName, questionType) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name == fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].questionType = questionType;
      setFormContent(formFields);
    }
  };

  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name == fieldName);
    if (option && option != "") {
      formFields[fieldIndex].list.push(option);
      setFormContent(formFields);
      setTextField("");
    }
  };

  const addQuestion = () => {
    const questionNumber = formContent.length + 1;
    const field = {
      name: "question" + questionNumber,
      questionTitle: "Question " + questionNumber,
      questionType: "shortAnswer",
      list: [],
    };
    setFormContent([...formContent, field]);
    console.log("added question: " + field.questionType);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // fetch(
    //   "http://localhost:8080/educator/addInstructor?organisationId=" +
    //     user.organisationId,
    //   {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(educator),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then(props.closeModalProp())
    //   .then(props.refreshProp());
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <TeachingCoursesDrawer></TeachingCoursesDrawer>
      </Grid>
      <Grid item xs={10}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to={`${assessmentPath}`}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Assessments
            </LinkMaterial>
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "grey" }}>
            <LinkMaterial underline="hover" color="inherit">
              Create Quiz
            </LinkMaterial>
          </Link>
        </Breadcrumbs>

        <Container>
          <h1>
            <u>Quiz Creation</u>
          </h1>
          <br></br>
          <Grid container style={{ margin: 50 }}>
            <Button variant="contained" onClick={() => addQuestion()}>
              Add Question
            </Button>
          </Grid>

          {formContent.length == 0 && (
            <Paper elevation={3} style={{ margin: 50, padding: 30 }}>
              <h3>Currently no questions!</h3>
              <br />
              <p>Start adding questions by clicking on "Add Question" Button</p>
            </Paper>
          )}

          {formContent.map((field, index) => {
            return (
              <Paper elevation={3} style={{ margin: 50, padding: 30 }}>
                <QuizQuestionComponent
                  fieldProp={field}
                  editFieldTitleProp={editFieldTitle()}
                  editFieldTypeProp={editFieldType()}
                  addFieldOptionProp={addFieldOption()}
                  textFieldProp={textField}
                  setTextFieldProp={setTextField}
                />
              </Paper>
            );
          })}

          <Grid
            container
            style={{ margin: 20 }}
            direction="row"
            justifyContent={"space-between"}
          >
            <Link to={assessmentPath}>
              <Button variant="contained">Cancel</Button>
            </Link>
            <Button variant="contained" onClick={handleSave}>
              Submit
            </Button>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
