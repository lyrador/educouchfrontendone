import React, { useEffect, useState } from "react";
import "./carousel.css";
import LearnerViewReelComponent from "./LearnerViewReelComponent";
import ReelCardItem from "./ReelCardItem";
import ViewReelComponent from "./ViewReelComponent";
import { useAuth } from "../../context/AuthProvider";
import set from "date-fns/set";
import { useNavigate } from "react-router-dom";

const Carousel = (props) => {
  const auth = useAuth();
  const user = auth.user;
  const learnerId = user.userId;
  const [children, setChildren] = React.useState([]);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [newReelsFetched, setNewReelsFetched] = useState(false);

  // Set the length to match current children from props
  useEffect(() => {
    fetch("http://localhost:8080/reel/findReelsForLearner/" + learnerId)
      .then((res) => res.json())
      .then((result) => {
        console.log("Carousel fetched: ", result);
        setLength(result.length);
        setChildren(result);
      });
  }, []);

  function fetchMoreReels() {
    fetch("http://localhost:8080/reel/findReelsForLearner/" + learnerId)
      .then((res) => res.json())
      .then((result) => {
        // const tempArray = [...children];
        // for (var i = 0; i < result.length; i++) {
        //   tempArray.push(result[i]);
        // }
        // console.log("merged array: ", tempArray);
        // setChildren(tempArray);
        setLength(result.length);
        setChildren(result);
        console.log("MORE REELS fetched: ", result);
      })
      // .then(setCurrentIndex((prevState) => prevState + 1));
      .then(setNewReelsFetched(!newReelsFetched))
      .then(setCurrentIndex(0));
  }

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
      console.log("viewed ", children[currentIndex].reelId);
      fetch(
        "http://localhost:8080/reel/viewReel/" +
          children[currentIndex].reelId +
          "/" +
          learnerId,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("successfully viewed reel: ", result);
          console.log("just read index: ", currentIndex);
        });
    } else {
      console.log("viewed ", children[currentIndex].reelId);
      fetch(
        "http://localhost:8080/reel/viewReel/" +
          children[currentIndex].reelId +
          "/" +
          learnerId,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("successfully viewed reel: ", result);
        })
        .then(fetchMoreReels());
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      setRefresh(!refresh);
    }
  };

  function refreshCallback() {
    setRefresh(!refresh);
  }

  return (
    <div className="carousel-container">
      <h1> learner reels</h1>

      <div className="carousel-wrapper">
        {/* You can alwas change the content of the button to other things */}
        {currentIndex > 0 && (
          <button onClick={prev} className="left-arrow">
            &lt;
          </button>
        )}
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children.map((reel) => (
              <LearnerViewReelComponent
                reelId={reel.reelId}
                reelTitle={reel.reelTitle}
                reelCaption={reel.reelCaption}
                reelStatusEnum={reel.reelApprovalStatusEnum}
                reelNumLikes={reel.numLikes}
                reelNumViews={reel.numViews}
                video={reel.video}
                reelCreator={reel.reelCreator.name}
                refreshCallback={refreshCallback}
                newReelsFetched={newReelsFetched}
              />
            ))}
          </div>
        </div>

        {/* You can alwas change the content of the button to other things */}
        {currentIndex < length && (
          <button onClick={next} className="right-arrow">
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
