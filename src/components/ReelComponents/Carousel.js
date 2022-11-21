import React, { useEffect, useState } from "react";
import "./carousel.css";
import LearnerViewReelComponent from "./LearnerViewReelComponent";
import ReelCardItem from "./ReelCardItem";
import ViewReelComponent from "./ViewReelComponent";

const Carousel = (props) => {
  const children = props.reels;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  // Set the length to match current children from props
  useEffect(() => {
    console.log("here's the children ", children);
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

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
