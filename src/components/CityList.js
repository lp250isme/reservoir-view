import CityItem from "./CityItem";

const CityList = ({ CityList }) => {
  console.log("CityList", CityList);
  return (
    <div className="cityList">
      {CityList.map((cityItem) => {
        const { CityCode, CityName_Ch } = cityItem;
        return <CityItem key={CityCode} cityCode={CityCode} cityName={CityName_Ch} />;
      })}
    </div>
  );
};

export default CityList;
