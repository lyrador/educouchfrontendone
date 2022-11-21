import React, { useEffect, useState } from "react";
import "./carousel.css";
import LearnerViewReelComponent from "./LearnerViewReelComponent";
import ReelCardItem from "./ReelCardItem";
import ViewReelComponent from "./ViewReelComponent";
import { useAuth } from "../../context/AuthProvider";

const Carousel = (props) => {
  const auth = useAuth();
  const user = auth.user;
  const learnerId = user.userId;
  const [children, setChildren] = React.useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [refresh, setRefresh] = useState(false);

  // Set the length to match current children from props
  useEffect(() => {
    console.log("Carousel received props: ", props.reelsProp);
    setLength(props.reelsProp.length);
    setChildren(props.reelsProp);
  }, [props.reelsProp, refresh]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
      console.log("viewed ", children[currentIndex].reelId);
      fetch(
        "http://localhost:8080/reel/viewReel/" + children[currentIndex].reelId
        + "/" + learnerId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("successfully viewed reel: ", result);
        });
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
                refreshCallback={ refreshCallback}
              />
            ))}
          </div>
        </div>

        {/* You can alwas change the content of the button to other things */}
        {currentIndex < length - 1 && (
          <button onClick={next} className="right-arrow">
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
