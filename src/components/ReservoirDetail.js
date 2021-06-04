import { React, useState, useEffect, useRef } from "react";
import { API_GET_RESERVOIR_REALTIME_INFO } from "../global/contants";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import water from "../image/Water-droplets.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import LiquidFillGauge from "react-liquid-gauge";
import { interpolateRgb } from "d3-interpolate";
import { color } from "d3-color";

library.add(faTint);

async function fetchData(setData, StationNo) {
  try {
    const res = await fetch(API_GET_RESERVOIR_REALTIME_INFO + "StationNo%20eq%20'" + StationNo + "'");
    // const { data } = await res.json();
    const data = await res.json();
    data[0].PercentageOfStorage = data[0].PercentageOfStorage.toFixed(2);
    setData(data);
  } catch (error) {}
}

const ReservoirDetail = ({ reservoirItem, StationNo }) => {
  const [data, setData] = useState([0]);
  useEffect(() => {
    fetchData(setData, StationNo);
  }, []);

  let color1 = "#3f98c7";
  let waterWarningClass = "topTitle";
  let waterWarningText = "水量正常";
  if (data[0].PercentageOfStorage <= 20) {
    color1 = "#ff5e00db";
    waterWarningText = "水量不足";
  }

  const radius = 75;
  const interpolate = interpolateRgb(color1, color1);
  const fillColor = interpolate(50 / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  return (
    <div className="detail">
      <table className="table">
        <thead>
          {/* <tr>
            <td className="topTitle" colSpan="2">
              詳細資料
            </td>
          </tr> */}
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" className="progressBar">
              <LiquidFillGauge
                style={{ margin: "0 auto" }}
                width={radius * 2}
                height={radius * 2}
                value={data[0].PercentageOfStorage}
                percent="%"
                textSize={1}
                textOffsetX={0}
                textOffsetY={0}
                textRenderer={(props) => {
                  const value = Math.round(props.value);
                  const radius = Math.min(props.height / 2, props.width / 2);
                  const textPixels = (props.textSize * radius) / 2;
                  const valueStyle = {
                    fontSize: textPixels,
                  };
                  const percentStyle = {
                    fontSize: textPixels * 0.6,
                  };

                  return (
                    <tspan>
                      <tspan className="value" style={valueStyle}>
                        {value}
                      </tspan>
                      <tspan style={percentStyle}>{props.percent}</tspan>
                    </tspan>
                  );
                }}
                riseAnimation
                waveAnimation
                waveFrequency={2}
                waveAmplitude={1}
                gradient
                gradientStops={gradientStops}
                circleStyle={{
                  fill: fillColor,
                }}
                waveStyle={{
                  fill: fillColor,
                }}
                textStyle={{
                  fill: color("#444").toString(),
                  fontFamily: "Arial",
                }}
                waveTextStyle={{
                  fill: color("#fff").toString(),
                  fontFamily: "Arial",
                }}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2" style={{ backgroundColor: color1, color: "white" }} className={waterWarningClass}>
              {waterWarningText}
            </td>
          </tr>
          <tr>
            <td className="title">蓄水百分比</td>
            <td className="data">{data[0].PercentageOfStorage} %</td>
          </tr>
          <tr>
            <td className="title">水位高</td>
            <td className="data">{data[0].WaterHeight} 公尺</td>
          </tr>
          {/* <tr>
            <td className="title">有效蓄水量</td>
            <td className="data">{data[0].EffectiveStorage} 萬立方公尺</td>
          </tr>
          <tr>
            <td className="title">有效容量</td>
            <td className="data">{reservoirItem.EffectiveCapacity} 萬立方公尺</td>
          </tr>
          <tr>
            <td className="title">總蓄水量</td>
            <td className="data">{reservoirItem.Storage} 萬立方公尺</td>
          </tr> */}
          <tr>
            <td className="title">流域名稱</td>
            <td className="data">{reservoirItem.BasinName}</td>
          </tr>
          <tr>
            <td className="title">更新時間</td>
            <td className="data">{data[0].Time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReservoirDetail;
