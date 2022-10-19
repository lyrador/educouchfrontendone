import { useEffect, useState } from "react";

export default function QuizInformation(props) {
  const [currentQuiz, setCurrentQuiz] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [maxScore, setMaxScore] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [hasTimeLimit, setHasTimeLimit] = useState("true");
  const [timeLimit, setTimeLimit] = useState();

  function handleSetTitle() {
    setTitle(props.assessmentTitle);
    console.log("assessment title:",title)
  }
  useEffect(() => {
    setCurrentQuiz(props.currentQuizProp);
    // setTitle(props.assessmentTitle);
    handleSetTitle();
    setDescription(props.assessmentDescription);
    setMaxScore(props.assessmentMaxScore);
    setStartDate(props.assessmentStartDate);
    setEndDate(props.assessmentEndDate);
    setHasTimeLimit(props.hasTimeLimit);
    setTimeLimit(props.timeLimit);
  }, []);
  return (
    <div>
      <h1> {title}</h1>
      <h1>Due Date: { endDate}</h1>
    </div>
  );
}
