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
import axios from "axios";

export default function FileSubmissionDisplayComponent(props) {

  const fileAttempt = props.fileSubmissionProp;
  const attachment = props.attachmentProp;
  const fileType = attachment.fileType;
  const arr = fileType.split("/")
  var fileExt = arr[1]
  if(fileExt === "vnd.openxmlformats-officedocument.wordprocessingml.document") {
    fileExt = "docx"
  }
  const assessmentTotal = props.assessmentTotal
  const learnerScore = fileAttempt.obtainedScore
  const [feedbackInput, setFeedbackInput] = useState(fileAttempt.feedback);
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
    props.handleOnChangeFeedback("");
    setFeedbackInput("");
  };

  const togglePdfViewer = () => {
    setPdfViewBool(!pdfViewerBool);
  };

  const handleDownload= async (event) => {
    event.preventDefault();
    console.log(fileAttempt)

    console.log(attachment)

    console.log(attachment.fileStorageName)
    try {
      const response = await axios.get(
          `http://localhost:8080/downloadFileFromName/${attachment.fileStorageName}`, {
            responseType: 'arraybuffer'
        }
        );
        const file = new Blob([(response.data)], {type: {fileType}})
        const element = document.createElement('a');
        element.href = window.URL.createObjectURL(file, {type: {fileType}})
        element.download = "ReqAttachment-" + Date.now() + `.${fileExt}`


    // Append to html link element page
    document.body.appendChild(element);

    // Start download
    element.click();

    // Clean up and remove the link
    element.parentNode.removeChild(element);

  } catch (error) {
      // Handle error here
      console.log(error.message)
  }
  }

  const handlePDFViewerasync = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
          `http://localhost:8080/downloadFileFromName/${attachment.fileStorageName}`, {
            responseType: 'arraybuffer'
        }
        );
        const file = new Blob([(response.data)], {type: "application/pdf"})
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload= (e)=> {
          setPdfFile(e.target.result)
          togglePdfViewer()
        }
  } catch (error) {
      // Handle error here
      console.log(error.message)
  }
  }

  return (
    <>

        <Box>
          <Button disabled={fileExt !== "pdf"} onClick={handlePDFViewerasync}>View PDF Submission</Button>
          <Button onClick={handleDownload}>Download File Submission</Button>
        </Box>
        {pdfViewerBool && <div>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        </div> }
                    {/* max point */}
                    <Grid item style={{ marginTop: 50 }}>
              <Grid item style={{ marginBottom: 30, width: "Auto" }}>
                <div>Question Max Points</div>
                <TextField
                  type="text"
                  value={assessmentTotal}
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
                  value={learnerScore}
                  style={{ fontSize: 20, width: "15%" }}
                  onChange={(e) => props.handleOnChange(e.target.value)}
                />
                  {(!fileAttempt.errorMessage || fileAttempt.errorMessage.length > 0) && (
                  <div style={{color: "red"}}>{fileAttempt.errorMessage}</div>
                )}
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
                        props.handleOnChangeFeedback(e.target.value)
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
                <div>
                <Button onClick={props.handleOnCompleteGrading}>Complete Grading</Button>
                </div>
              </Grid>
              </Grid>


    </>
  );
}
