import { Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function QuizQuestionDisplayComponent(props) {
  const index = props.indexProp;
  const isQuiz = props.isQuiz;
  const questionAttempt = props.questionProp;
  const question = questionAttempt.questionAttempted;

  const [feedbackInput, setFeedbackInput] = useState(questionAttempt.feedback);
  const [feedbackbool, setFeedbackbool] = useState(feedbackInput.length > 0);
  const [pdfViewerBool, setPdfViewBool] = useState(false);

  //pdf viewer stuff
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const allowedFiles = ["application/pdf"]; // mimetype of pdf files

  const addFeedbackHandler = () => {
    setFeedbackbool(true);
  };

  const removeFeedback = () => {
    setFeedbackbool(false);
    props.handleOnChangeFeedback("", index);
    setFeedbackInput("");
  };

  const togglePdfViewer = () => {
    setPdfViewBool(!pdfViewerBool);
  };

  return (
    <>
      {!isQuiz && (
        <Box>
          <Button>View PDF Submission</Button>
          <Button>Download File Submission</Button>
        </Box>
      )}
      {pdfViewerBool && (
        <div>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        </div>
      )}
      {isQuiz && (
        <Grid
          container
          style={{ margin: 10 }}
          direction="row"
          justifyContent={"space-between"}
        >
          <Grid item style={{ marginBottom: 30 }}>
            <label style={{ fontSize: 30 }}>{question.questionTitle}</label>
          </Grid>

          <Grid container direction="column">
            <Grid>
              <Grid item style={{ marginBottom: 30, width: "Auto" }}>
                {/* content */}
                <div>Question Content</div>
                <TextField
                  multiline
                  type="text"
                  value={question.questionContent}
                  style={{ fontSize: 20, width: "70%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            {/* answer */}
            <Grid item>
              <div>Learner Answer</div>
              <TextField
                multiline
                type="text"
                value={questionAttempt.shortAnswerResponse}
                style={{ fontSize: 20, width: "70%" }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* max point */}
            <Grid item style={{ marginTop: 50 }}>
              <Grid item style={{ marginBottom: 30, width: "Auto" }}>
                <div>Question Max Points</div>
                <TextField
                  type="text"
                  value={question.questionMaxPoints}
                  style={{ fontSize: 20, width: "15%" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />

              </Grid>
              {/* Learner Score*/}

              <Grid item style={{ marginBottom: 30, width: "Auto" }}>
                <div>Learner Score</div>
                <TextField
                  type="text"
                  value={questionAttempt.questionAttemptScore}
                  style={{ fontSize: 20, width: "15%" }}
                  onChange={(e) => props.handleOnChange(e.target.value, index)}
                />
                  {props.questionProp.errorMessage.length > 0 && (
                  <div style={{color: "red"}}>{props.questionProp.errorMessage}</div>
                )}
              </Grid>

              {feedbackbool ? (
                <>
                  <Grid item style={{ marginBottom: 30, width: "Auto" }}>
                    <div>Feedback</div>
                    <TextField
                      multiline
                      type="text"
                      defaultValue={feedbackInput}
                      style={{ fontSize: 20, width: "70%" }}
                      onChange={(e) =>
                        props.handleOnChangeFeedback(e.target.value, index)
                      }
                    />
                  </Grid>
                  <Button
                    onClick={removeFeedback}
                    color="secondary"
                    variant="contained"
                  >
                    Remove Feedback
                  </Button>
                </>
              ) : (
                <Button
                  onClick={addFeedbackHandler}
                  color="secondary"
                  variant="contained"
                >
                  Add Feedback
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
