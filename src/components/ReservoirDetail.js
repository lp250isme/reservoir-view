import { useState, useEffect, useRef } from "react";
import { API_GET_RESERVOIR_REALTIME_INFO } from "../global/contants";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import water from "../image/Water-droplets.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTint } from "@fortawesome/free-solid-svg-icons";

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

  let color = "#3f98c7";
  let waterWarningClass = "topTitle";
  let waterWarningText = "水量正常";
  if (data[0].PercentageOfStorage <= 20) {
    color = "#ff5e00db";
    waterWarningText = "水量不足";
  }

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
            <td className="progressBar" colSpan="2">
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbarWithChildren
                  value={data[0].PercentageOfStorage}
                  styles={buildStyles({
                    pathColor: color,
                  })}
                >
                  {/* <img style={{ width: 20, marginTop: -5 }} src={water} alt="water" /> */}
                  <FontAwesomeIcon icon="tint" style={{ color: color }} size="2x" />
                  <div style={{ fontSize: 12, marginTop: 0 }}>
                    <strong>{data[0].PercentageOfStorage}%</strong>
                    {/* <br></br>
                    <strong>蓄水百分比</strong> */}
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ backgroundColor: color, color: "white" }} className={waterWarningClass}>
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
          <tr>
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
          </tr>
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
