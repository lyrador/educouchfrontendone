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

  React.useEffect(() => {
    fetch("http://localhost:8080/reel/findReelsForLearner/" + learnerId)
      .then((res) => res.json())
      .then((result) => {
        setReels(result);
        console.log("reels fetched: ", result);
      });
  }, []);


  return (
    <>
      <h1> learner reels</h1>
      <Carousel reelsProp={reels}/>
    </>
  );
}
