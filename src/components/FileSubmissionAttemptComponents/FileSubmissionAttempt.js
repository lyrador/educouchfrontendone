import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function FileSubmissionAttempt(props) {
    const navigate = useNavigate();
    var location = useLocation(props);
    var courseId = location.state.courseIdProp;
    var learnerStatus = location.state.learnerStatusProp;
    var fileSubmissionId = location.state.fileSubmissionIdProp;
    var auth = useAuth();
    var user = auth.user;
    var learnerId = user.userId;
    //
    React.useEffect(() => {
        fetch("http://localhost:8080/assessment/getFileSubmissionById/" + fileSubmissionId)
          .then((res) => res.json())
          .then((result) => {
            console.log("retrieved fileSubmission:", result);
          });
    }, []);
    

    return (
        <p>dis file submission</p>
    )
}   