import * as React from "react";
import Box from "@mui/material/Box";
import { useScrollTrigger } from "@material-ui/core";
import { useAuth } from "../context/AuthProvider";
import Carousel from "../components/ReelComponents/Carousel";
import ReelCardItem from "../components/ReelComponents/ReelCardItem";

export default function LearnerReelsPage(props) {
  const auth = useAuth();
  const user = auth.user;
  const learnerId = user.userId;
  var reelIndex = 0;
  const [reels, setReels] = React.useState([]);
  const [currentReel, setCurrentReel] = React.useState();
  const array = React.useEffect(() => {
    fetch("http://localhost:8080/reel/findReelsForLearner/" + learnerId)
      .then((res) => res.json())
      .then((result) => {
        for (var i = 0; i < result.length; i++) {
          reels.push(result[i]);
        }
        setReels(reels);
        console.log("reels fetched: ", result);
      });
  }, []);

  function likeReel() {}

  function unlikeReel() {}

  function nextReel() {
    //if current reel
  }

  function fetchMoreReels() {
    //append fetched reels into current reel array
  }

  function viewCourse() {}

  return (
    <>
      <h1> learner reels</h1>
      <Carousel reels={reels}>
      </Carousel>
    </>
  );
}
