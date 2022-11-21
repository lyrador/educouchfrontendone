import { Button, Divider, Paper, TextField } from "@material-ui/core";
import { Breadcrumbs, Grid, IconButton, Link } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function LearnerViewReelComponent(props) {
  const location = useLocation();
  const [currentReel, setCurrentReel] = useState();

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

  useEffect(() => {
    fetch("http://localhost:8080/reel/getReel/" + props.reelId)
      .then((res) => res.json())
      .then((result) => {
        setCurrentReel(result);
        console.log("learnerViewReelComponent fetched: ", result);
      });
  }, []);

  function handleLike() {}

  return (
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
              {renderVideoImageHolder()}
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
                    &nbsp;{props.reelNumLikes} likes
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
                    <VisibilityIcon></VisibilityIcon>&nbsp;{props.reelNumViews}{" "}
                    views
                  </IconButton>
                </p>
              </div>

              <Divider style={{ marginTop: "20px" }}></Divider>
              <Grid style={{ padding: "20px" }}>
                <p>
                  <b style={{ color: "#296d98" }}>{props.reelCreator} </b>
                  <u>{props.reelTitle}</u>
                </p>
                <br></br>
                <p>{props.reelCaption}</p>
              </Grid>
            </Paper>
          </Grid>
        </div>
      </Box>
    </Grid>
  );
}
