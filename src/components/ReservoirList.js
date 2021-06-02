import ReservoirItem from "./ReservoirItem";

const ReservoirList = ({ ReservoirList }) => {
  return (
    <div className="cityList">
      {ReservoirList.map((reservoirItem, index) => {
        const { StationNo, StationName } = reservoirItem;
        return (
          <ReservoirItem
            idx={index}
            key={StationNo}
            StationNo={StationNo}
            StationName={StationName}
            reservoirItem={reservoirItem}
          />
        );
      })}
    </div>
  );
};

export default ReservoirList;
