import { useState, useEffect, useRef } from "react";
import ReservoirDetail from "./ReservoirDetail.js";
import { Animated } from "react-animated-css";

const ReservoirItem = ({ idx, StationName, StationNo, reservoirItem }) => {
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
          {idx + 1}.{StationName}
        </p>
        {showResults[0] ? (
          <button onClick={() => hide(StationNo)}>隱藏</button>
        ) : (
          <button onClick={() => show(StationNo)}>詳細</button>
        )}
      </div>
      {showResults[1] ? (
        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={true}>
          <ReservoirDetail reservoirItem={reservoirItem} />
        </Animated>
      ) : null}
    </div>
  );
};

export default ReservoirItem;
