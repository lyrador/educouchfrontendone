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
  const location = useLocation();
  const assessmentPath = location.pathname.split("/").slice(0, 4).join("/");

  const [formContent, setFormContent] = useState([]);
  const [textField, setTextField] = useState("");
  const question = {
    id: "",
    questionTitle: " ",
    questionType: "",
    options: [],
  };

  function editQuestionTitle(questionId, questionTitle) {
    const formQuestions = [...formContent];
    const questionIndex = formQuestions.findIndex(
      (f) => f.id == questionId
    );
    if (questionIndex > -1) {
      formQuestions[questionIndex].questionTitle = questionTitle;
      setFormContent(formQuestions);
    }
  }

  function editQuestionType(questionId, questionType) {
    const formQuestions = [...formContent];
    const questionIndex = formQuestions.findIndex(
      (f) => f.id == questionId
    );
    if (questionIndex > -1) {
      formQuestions[questionIndex].questionType = questionType;
      setFormContent(formQuestions);
    }
  }

  function addQuestionOption(questionId, option) {
    const formQuestions = [...formContent];
    const questionIndex = formQuestions.findIndex(
      (f) => f.id == questionId
    );
    if (option && option != "") {
      formQuestions[questionIndex].options.push(option);
      setFormContent(formQuestions);
      setTextField("");
    }
  }

  const addQuestion = () => {
    const questionNumber = formContent.length + 1;
    const question = {
      id: "question" + questionNumber,
      questionTitle: "Question " + questionNumber,
      questionType: "shortAnswer",
      options: [],
    };
    setFormContent([...formContent, question]);
    console.log("added question: " + question.questionType);
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
          <h1>Quiz Creation</h1>
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

          {formContent.map((question, index) => {
            return (
              <Paper elevation={3} style={{ margin: 50, padding: 30 }}>
                <QuizQuestionComponent
                  questionProp={question}
                  editQuestionTitleProp={editQuestionTitle}
                  editQuestionTypeProp={editQuestionType}
                  addQuestionOptionProp={addQuestionOption}
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
