import React from "react";
import "../../App.css";
import "../../css/CardItem.css";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Divider } from "@mui/material";

function ReelCardItem(props) {
  return (
    <>
      <div className="card-flex-item">
        <Link
          to={`/instructorViewReel`}
          className="cards-item-link"
          state={{
            reelId: props.reelId,
            reelTitle: props.reelTitle,
            reelCaption: props.reelCaption,
            reelApprovalStatusEnum: props.reelApprovalStatusEnum,
            reelNumLikes: props.reelNumLikes,
            reelNumViews: props.reelNumViews,
            video: props.video,
            reelCreator: props.reelCreator,
            rejectionReason: props.rejectionReason
          }}
        >
          <figure
            className="cards-item-pic-wrap"
            data-category={props.reelApprovalStatusEnum}
          >
            <img src={props.src} alt="picture" className="cards-item-img" />
          </figure>
          <div className="cards-item-info">
            <h5 style={{ fontSize: "20px" }} className="cards-item-text">
              {props.reelTitle}
            </h5>
            <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
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
                }}
                className="cards-item-text"
              >
                <FavoriteIcon style={{ color: "red" }} /> {props.reelNumLikes}{" "}
                likes
              </p>
              <p
                style={{
                  fontSize: "20px",
                  paddingBottom: "5px",
                  paddingTop: "5px",
                }}
                className="cards-item-text"
              >
                <VisibilityIcon /> {props.reelNumViews} views
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ReelCardItem;
