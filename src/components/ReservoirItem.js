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
      <div className="items" onClick={() => (showResults[0] ? hide(StationNo) : show(StationNo))}>
        <p>
          {idx + 1}. {StationName}
        </p>
        <div>{showResults[0] ? <FontAwesomeIcon icon="minus" /> : <FontAwesomeIcon icon="plus" />}</div>
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
