import React from "react";
import { useState, useEffect, useRef } from "react";
import ReservoirDetail from "./ReservoirDetail.js";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus);

const ReservoirItem = ({ idx, StationName, StationNo, reservoirItem }) => {
  //console.log("cityName", cityName);

  const [showResults, setShowResults] = useState([false, false]);

  const show = (StationNo) => {
    setShowResults(function (prev) {
      console.log("prev", prev);
    });
    const showResults = [true, true];
    setShowResults(showResults);
    // console.log("StationNo", StationNo);
    // console.log("showResults", showResults);
  };

  const hide = (StationNo) => {
    const showResults = [false, false];
    setShowResults(showResults);
    // console.log("StationNo", StationNo);
    // console.log("showResults", showResults);
  };

  return (
    <div key={StationNo} className="itemsOutter">
      <div className="items">
        <p>
          {idx + 1}. {StationName}
        </p>
        {showResults[0] ? (
          // <button onClick={() => hide(StationNo)}>隱藏</button>
          <div onClick={() => hide(StationNo)}>
            <FontAwesomeIcon icon="minus" />
          </div>
        ) : (
          // <button onClick={() => show(StationNo)}>詳細</button>
          <div onClick={() => show(StationNo)}>
            <FontAwesomeIcon icon="plus" />
          </div>
        )}
      </div>
      {showResults[1] ? (
        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={true}>
          <ReservoirDetail reservoirItem={reservoirItem} StationNo={StationNo} />
        </Animated>
      ) : null}
    </div>
  );
};

export default ReservoirItem;
