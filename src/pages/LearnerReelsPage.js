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
  const [reels, setReels] = React.useState([]);
  const [currentReel, setCurrentReel] = React.useState();

  return (
    <>
      <Carousel />
    </>
  );
}
