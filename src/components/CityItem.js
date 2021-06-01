const CityItem = ({ cityName, cityCode }) => {
  function showMore(cityCode) {
    console.log("CityCode", cityCode);
  }

  return (
    <div key={cityCode} className="items">
      <p>{cityName}</p>
      <button onClick={() => showMore(cityCode)}>詳細</button>
    </div>
  );
};

export default CityItem;
