import React from "react";
import "../App.css";
import "../css/CardItem.css";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Typography, Stack, Badge } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import IconButton from "@mui/material/IconButton";

//days of week
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function ClassRunCardItem({
  courseId,
  src,
  courseCode,
  courseTitle,
  courseAnnouncements,
  isEnrolled,
  classRunDaysOfWeek,
  startDate,
  endDate,
  classRunStartTime,
  classRunEndTime,
}) {
  const [unreadAnnouncements, setUnreadAnnouncements] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const refreshFunction = () => {
    setRefreshPage(!refreshPage);
  };

  React.useEffect(() => {
    setRefreshPage(false);
    fetch(
      "http://localhost:8080/announcement/getAllUnreadAnnouncementsByCourseId/" +
        courseId
    )
      .then((res) => res.json())
      .then((result) => {
        setUnreadAnnouncements(result);
      });
  }, [refreshFunction]);
  return (
    <>
      <div className="card-flex-item">
        <Link
          to={"/learnerCourseDetails/" + courseId}
          className="cards-item-link"
        >
          <figure
            className="cards-item-pic-wrap"
            data-category={courseCode.concat(" : ", courseTitle)}
          >
            <img src={src} alt="picture" className="cards-item-img" />
          </figure>
          <div className="cards-item-info">
            <Typography variant="h6" component="div" color="text.secondary">
              <Stack spacing={1}>
                {classRunDaysOfWeek.map((x) => {
                  return <Typography variant="h6">{weekday[x]} </Typography>;
                })}
              </Stack>
            </Typography>
            <Divider></Divider>
            <br />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {classRunStartTime} - {classRunEndTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start Date: {startDate}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              End Date: {endDate}
            </Typography>
            <br />

            {isEnrolled && (
              <Badge badgeContent={unreadAnnouncements.length} color="primary">
                <Link
                  to={"/learnerCourseDetails/" + courseId + "/announcements"}
                >
                  <IconButton aria-label="settings">
                    <CampaignIcon color="action" />
                  </IconButton>
                </Link>
              </Badge>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}

export default ClassRunCardItem;
