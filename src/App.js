import { useState, useEffect, useRef } from "react";
import { API_GET_BASIC_CITY, API_GET_RESERVOIR_STATION } from "./global/contants";

import "./App.css";
import Header from "./components/Header";
import CityList from "./components/CityList";
import ReservoirList from "./components/ReservoirList";

async function fetchData(setData) {
  const res = await fetch(API_GET_RESERVOIR_STATION);
  // const { data } = await res.json();
  const data = await res.json();
  setData(data);
  // console.log("data", data);
}

const App = () => {
  const [data, setData] = useState([]);
  const clickShowMore = useRef(false);

  useEffect(() => {
    if (!clickShowMore.current) {
      return;
    }
  }, [data]);

  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <div className="container">
      <Header title="" />
      <ReservoirList ReservoirList={data} />
      {/* <CityList CityList={data} /> */}
    </div>
  );
};

export default App;
