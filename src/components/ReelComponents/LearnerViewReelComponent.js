import { Button, Divider, Paper, TextField } from "@material-ui/core";
import { Breadcrumbs, Grid, IconButton, Link } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { Box } from "@mui/system";
import { useAuth } from "../../context/AuthProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function LearnerViewReelComponent(props) {
  const auth = useAuth();
  const user = auth.user;
  const learnerId = user.userId;
  const location = useLocation();
  const navigate = useNavigate();
  const [currentReel, setCurrentReel] = useState();
  const [liked, setLiked] = useState(false);
  const renderVideoImageHolder = () => {
    return (
      <>
        {props.video ? (
          <div style={{ height: "500px" }}>
            <ReactPlayer
              className="video"
              width="100%"
              height="100%"
              controls
              url={props.video.fileURL}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div>There is no current file!</div>
          </div>
        )}
      </>
    );
  };

  const renderVideoImageHolder2 = () => {
    console.log("rendervideo2");
    return (
      <>
        {currentReel && currentReel.video ? (
          <div style={{ height: "500px" }}>
            <ReactPlayer
              className="video"
              width="100%"
              height="100%"
              controls
              url={currentReel.video.fileURL}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div>There is no current file!</div>
          </div>
        )}
      </>
    );
  };

  function handleViewCourse() {
    console.log("navigating to courseId: " + currentReel.courseId);
    navigate(`/learnerCourseDetails/` + currentReel.courseId);
  }

  useEffect(() => {
    fetch("http://localhost:8080/reel/getReel/" + props.reelId)
      .then((res) => res.json())
      .then((result) => {
        setCurrentReel(result);
        console.log("learnerViewReelComponent fetched: ", result);
      });
  }, [liked, props.newReelsFetched]);

  function handleLike() {
    fetch(
      "http://localhost:8080/reel/likeReel/" +
        currentReel.reelId +
        "/" +
        learnerId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("successfully liked reel: ", result);
        setLiked(true);
        props.refreshCallback();
      });
  }

  return (
    <>
      {currentReel && (
        <Grid
          container
          className="cards"
          style={{
            direction: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              backgroundImage: "linear-gradient(to right, #FF8300, #A3C4BC)",
              color: "white",
              padding: "5px",
              width: "60%",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            Reels
          </h1>
          <Box sx={{ width: "100%" }}>
            <div style={{ paddingLeft: "3%" }}>
              <Grid
                container
                style={{
                  direction: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  elevation={3}
                  style={{
                    justifySelf: "center",
                    width: "1000px",
                    height: "1000px",
                  }}
                >
                  {renderVideoImageHolder2()}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "20px",
                        paddingBottom: "5px",
                        paddingTop: "5px",
                        marginLeft: "20px",
                        marginTop: "20px",
                      }}
                      className="cards-item-text"
                    >
                      <IconButton
                        aria-label="settings"
                        onClick={() => handleLike()}
                      >
                        <FavoriteIcon style={{ color: "red" }} />
                        &nbsp;{currentReel.numLikes} likes
                      </IconButton>
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        paddingBottom: "5px",
                        paddingTop: "5px",
                        marginRight: "20px",
                        marginTop: "20px",
                      }}
                      className="cards-item-text"
                    >
                      <IconButton aria-label="settings">
                        <VisibilityIcon></VisibilityIcon>&nbsp;
                        {currentReel.numViews} views
                      </IconButton>
                    </p>
                  </div>

                  <Divider style={{ marginTop: "20px" }}></Divider>
                  <Grid style={{ padding: "20px" }}>
                    <Button onClick={handleViewCourse}>
                      <p>
                        <b style={{ color: "#296d98" }}>
                          {currentReel.creatorName}
                        </b>
                      </p>
                    </Button>
                    &nbsp;<u>{currentReel.reelTitle}</u>

                    <br></br>
                    <p>{currentReel.reelCaption}</p>
                  </Grid>
                </Paper>
              </Grid>
            </div>
          </Box>
        </Grid>
      )}
    </>
  );
}
