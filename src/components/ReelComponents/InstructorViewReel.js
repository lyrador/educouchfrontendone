import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
} from "@material-ui/core";
import { Alert, Breadcrumbs, Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { Box } from "@mui/system";
import ViewReelComponent from "./ViewReelComponent";
export default function InstructorViewReel(props) {
  const location = useLocation();
  const reelId = location.state.reelId;
  const reelNumLikes = location.state.reelNumLikes;
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("received reelId prop: ", reelId);
  //   console.log("received reelNumLikes prop: ", reelNumLikes);
  //   console.log("received caption prop: ", location.state.reelCaption);
  // }, []);

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleClickDeleteSnackbar = () => {
    setOpenDeleteSnackbar(true);
  };

  const handleCloseDeleteSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenDeleteSnackbar(false);
  };

  const handleClickDeleteDialogOpen = (event) => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const deleteReel = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/reel/deleteReel/" + reelId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // body:JSON.stringify(newComment)
    }).then(() => {
      console.log("Reel Deleted Successfully!");
      handleDeleteDialogClose();
      handleClickDeleteSnackbar();
      handleBack();
    });
  };

  function handleBack() {
    navigate(`/instructorReels`);
  }

  return (
    <>
      <Snackbar
        open={openDeleteSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseDeleteSnackbar}
      >
        <Alert
          onClose={handleCloseDeleteSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Assessment Deleted Succesfully!
        </Alert>
      </Snackbar>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          color="secondary"
          variant={"contained"}
          onClick={handleBack}
          style={{ marginLeft: "50px", marginTop: "10px" }}
        >
          Back to View all Reels
        </Button>
        <Button
          color="primary"
          variant={"contained"}
          onClick={handleClickDeleteDialogOpen}
          style={{ marginLeft: "50px", marginTop: "10px" }}
        >
          Delete this reel
        </Button>
      </div>
      <ViewReelComponent
        reelId={reelId}
        reelTitle={location.state.reelTitle}
        reelCaption={location.state.reelCaption}
        reelStatusEnum={location.state.reelApprovalStatusEnum}
        reelNumLikes={reelNumLikes}
        reelNumViews={location.state.reelNumViews}
        video={location.state.video}
        reelCreator={location.state.reelCreator}
      ></ViewReelComponent>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Reel"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            These will delete the Reel and cannot be reversed. Are you sure you
            want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={deleteReel}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
