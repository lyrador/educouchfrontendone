import { AppBar, Grid, Paper } from "@mui/material";
import React, { useRef, useState } from "react";

export default function QuizAttemptTimer(props) {
  const [quizTimeLimit, setQuizTimeLimit] = useState();
  const [timer, setTimer] = useState("00:00:00");
  const [panic, setPanic] = useState("");
  const Ref = useRef(null);

  React.useEffect(() => {
    clearTimer(getDeadTime());
    //need to figure out how to set time < 1 min set panic to true
    if (Date.parse(getDeadTime()) - Date.parse(new Date())) {
      setPanic("false");
    } else {
      setPanic("true");
    }
  }, []);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    // This is where you need to adjust if
    // you entend to add more time
    var timeLimit = props.timeLimitProp * 60;
    deadline.setSeconds(deadline.getSeconds() + timeLimit);
    return deadline;
  };
  return (
    <Paper
      style={{
        height: 110,
        width: 250,
        position: "fixed",
        marginTop: 50,
        marginLeft: 50,
        backgroundColor: "#6495ED"
      }}
    >
      <Grid container justifyContent={"center"} paddingTop={3}>
        <p style={{fontSize: "40px", color: "white"}}>{timer}</p></Grid>
    </Paper>
  );
}
