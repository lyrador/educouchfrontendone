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
  const assessmentsPath = location.state.assessmentsPathProp;
  const createAssessmentPath = location.state.createAssessmentPathProp;
  const createQuizFormPath = location.pathname;

  const [formQuestions, setFormQuestions] = useState([]);
  const [textField, setTextField] = useState("");
  const question = {
    id: "",
    questionTitle: " ",
    questionType: "",
    questionContent: "",
    options: [], //array of string to store mcq options OR trueFalse options
  };

  function editQuestionTitle(questionId, questionTitle) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.id == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionTitle = questionTitle;
      setFormQuestions(tempFormQuestions);
    }
  }

  function editQuestionType(questionId, questionType) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.id == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionType = questionType;
      setFormQuestions(tempFormQuestions);
    }
  }

  function editQuestionContent(questionId, questionContent) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.id == questionId
    );
    if (questionIndex > -1) {
      tempFormQuestions[questionIndex].questionContent = questionContent;
      setFormQuestions(tempFormQuestions);
    }
  }

  function addQuestionOption(questionId, option) {
    const tempFormQuestions = [...formQuestions];
    const questionIndex = tempFormQuestions.findIndex(
      (f) => f.id == questionId
    );
    if (option && option != "") {
      tempFormQuestions[questionIndex].options.push(option);
      setFormQuestions(tempFormQuestions);
      setTextField("");
    }
  }

  const addQuestion = () => {
    const questionNumber = formQuestions.length + 1;
    const question = {
      id: "question" + questionNumber,
      questionTitle: "Question " + questionNumber,
      questionType: "shortAnswer",
      questionContent: "Type Question Body here...",
      options: [],
    };
    setFormQuestions([...formQuestions, question]);
    console.log("added question: " + question.questionType);
  };

  const removeQuestion = (questionId) => {
    const questionIndex = formQuestions.findIndex((f) => f.id == questionId);
    const tempFormQuestions = [...formQuestions];
    if (questionIndex > -1) {
      setFormQuestions(
        tempFormQuestions.filter((question) => {
          return question.id !== questionId;
        })
      );
    }
    console.log("removed question: " + questionId);
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
            to={`${assessmentsPath}`}
            style={{ textDecoration: "none", color: "grey" }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Assessments
            </LinkMaterial>
          </Link>
          <Link
            to={`${createAssessmentPath}`}
            style={{ textDecoration: "none", color: "grey" }}
            state={{
              createAssessmentPathProp: { createAssessmentPath },
              assessmentsPathProp: { assessmentsPath },
            }}
          >
            <LinkMaterial underline="hover" color="inherit">
              Create Assessment
            </LinkMaterial>
          </Link>
          <Link
            to={`${createQuizFormPath}`}
            style={{ textDecoration: "none", color: "grey" }}
          >
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

          {formQuestions.length == 0 && (
            <Paper elevation={3} style={{ margin: 50, padding: 30 }}>
              <h3>Currently no questions!</h3>
              <br />
              <p>Start adding questions by clicking on "Add Question" Button</p>
            </Paper>
          )}

          {formQuestions.map((question, index) => {
            return (
              <Paper elevation={3} style={{ margin: 50, padding: 30 }}>
                <QuizQuestionComponent
                  textFieldProp={textField}
                  setTextFieldProp={setTextField}
                  questionProp={question}
                  editQuestionTitleProp={editQuestionTitle}
                  editQuestionTypeProp={editQuestionType}
                  addQuestionOptionProp={addQuestionOption}
                  editQuestionContentProp={editQuestionContent}
                  removeQuestionProp={removeQuestion}
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
            <Link to={assessmentsPath}>
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
