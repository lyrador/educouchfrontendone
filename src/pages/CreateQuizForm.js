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
import { Padding } from "@mui/icons-material";

export default function CreateQuizForm(props) {
  React.useEffect(() => {
    console.log("assessment path: " + assessmentPath);
  }, []);

  const auth = useAuth();
  const user = auth.user;
  const location = useLocation();
  const assessmentPath = location.pathname.split("/").slice(0, 4).join("/");

  const [formContent, setFormContent] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
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
      name: "question"+questionNumber,
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

          {formContent.map((field, index) => {
            return (
              <Paper elevation={3} style={{ margin: 50, padding: 30 }}>
                <Grid
                  container
                  style={{ margin: 20 }}
                  direction="row"
                  justifyContent={"space-between"}
                >
                  <Grid item key={field.name} style={{marginBottom: 30}}>
                    {onEdit ? (
                      <input
                        type="text"
                        style={{ fontSize: 30 }}
                        value={field.questionTitle}
                        onChange={(e) => editFieldTitle(field.name, e.target.value)}
                        onBlur={() => setOnEdit(false)}
                      />
                    ) : (
                      <label
                        style={{ fontSize: 30 }}
                        onClick={() => setOnEdit(true)}
                      >
                        {field.questionTitle}
                      </label>
                    )}
                  </Grid>
                  <Grid item>
                    <select style={{ fontSize: 20 }}
                    value={field.questionType}
                    onChange={(e) => editFieldType(field.name, e.target.value)}>
                      <option value="shortAnswer">Short Answer</option>
                      <option value="mcq">Multiple Choice</option>
                    </select>
                  </Grid>

                  <Grid container direction="column">
                    <Grid item>
                      {field.questionType == "shortAnswer" && (
                        <input type="text" placeholder={field.questionType} style={{ width: 600, fontSize: 20, padding: 6 }} />
                      )}
                      {field.questionType == "mcq" && (
                        <div>
                          <select style={{ width: 600,  fontSize: 20, padding: 6 }}>
                            {field.list.map((item) => (
                              <option key={item} value={item} >
                                {item}
                              </option>
                            ))}
                          </select>
                          <div>
                            <input
                              type="text"
                              onChange={(e) => setTextField(e.target.value)}
                              value={textField}
                              placeholder="Add Option"
                              style={{ width: 600,  fontSize: 20, padding: 6, marginTop: 10 }}
                            />
                            <Button onClick={ () => addFieldOption(field.name, textField)}>Add</Button>
                          </div>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}

          <div>
            <Button onClick={() => addQuestion()}>Add Question</Button>
          </div>
          <Button variant="contained" onClick={handleSave}>
            Submit
          </Button>
          <Link to={assessmentPath}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </Container>
      </Grid>
    </Grid>
  );
}
