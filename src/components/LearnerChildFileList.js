import * as React from "react";
import "../App.css";
import "../css/TeachingFileList.css";
import { useParams } from "react-router-dom";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";
import {
  Grid,
  LinearProgress,
  ThemeProvider,
  createTheme,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
} from "@mui/material";
import TeachingFileComponent from "./TeachingFileComponent";
import AttachmentComponent from "./AttachmentComponent";
import { useState } from "react";

import InstantErrorMessage from "./InstantErrorMessage";
import InstantSuccessMessage from "./InstantSuccessMessage";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import UploadService from "../services/UploadFilesService";

function LearnerChildFileList() {
  var courseId = useParams();
  courseId = courseId.moduleCode;

  var folderId = useParams();
  folderId = folderId.folderId;

  const [folderList, setFolderList] = useState([]);
  const [attachmentList, setAttachmentList] = useState([]);

  function changeFolderIdWrapper(num) {
    console.log("Reach " + num);
    fetch("http://localhost:8080/folder/getFolderByFolderId/" + num)
      .then((res) => res.json())
      .then((result) => {
        var fol = result;
        setFolderList(fol.childFolders);
        setAttachmentList(fol.attachments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  React.useEffect(() => {
    fetch("http://localhost:8080/folder/getFolderByFolderId/" + folderId)
      .then((res) => res.json())
      .then((result) => {
        var fol = result;
        setFolderList(fol.childFolders);
        setAttachmentList(fol.attachments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const refresh = () => {
    fetch("http://localhost:8080/folder/getFolderByFolderId/" + folderId)
      .then((res) => res.json())
      .then((result) => {
        var fol = result;
        console.log(JSON.stringify(fol));
        setFolderList(fol.childFolders);
        setAttachmentList(fol.attachments);
        console.log("Length of folder is " + folderList.length);
        console.log("Length of attachment is " + attachmentList.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
        </Grid>
        <Grid item xs = {10}>
          <Typography variant="h5">Lesson Content</Typography>
          <divider></divider>
          <br />
          <div>
            {folderList &&
              folderList.length > 0 &&
              folderList.map((folder) => (
                <TeachingFileComponent
                  folder={folder}
                  courseId={courseId}
                  changeFolderIdWrapper={changeFolderIdWrapper}
                  isLearner= {true}
                ></TeachingFileComponent>
              ))}
            {attachmentList &&
              attachmentList.length > 0 &&
              attachmentList.map((attachment) => (
                <AttachmentComponent
                  attachment={attachment}
                  courseId={courseId}
                  isLearner = {true}
                ></AttachmentComponent>
              ))}
            {(!folderList || folderList.length <= 0) &&
              (!attachmentList || attachmentList.length <= 0) && (
                <p>This folder doesn't have any content currently.</p>
              )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LearnerChildFileList;
