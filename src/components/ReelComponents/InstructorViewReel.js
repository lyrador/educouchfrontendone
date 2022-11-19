import { Button, Paper } from "@material-ui/core";
import { Breadcrumbs, Grid, Link } from "@mui/material";
import { useEffect } from "react";
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

  useEffect(() => {
    console.log("received reelId prop: ", reelId);
    console.log("received reelNumLikes prop: ", reelNumLikes);
    console.log("received caption prop: ", location.state.reelCaption);

  }, []);

  function handleBack() {
    navigate(`/instructorReels`);
  }
  return (
    <>
      <Button
        color="secondary"
        variant={"contained"}
        onClick={handleBack}
        style={{ marginLeft: "50px" }}
      >
        Back to View all Reels
      </Button>
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
    </>
  );
}
