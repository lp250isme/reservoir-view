import ReservoirItem from "./ReservoirItem";

const ReservoirList = ({ ReservoirList, showMore, clickShowMore }) => {
  //console.log("ReservoirList", ReservoirList);
  return (
    <div className="cityList">
      {ReservoirList.map((reservoirItem, index) => {
        const { StationNo, StationName } = reservoirItem;
        //if (reservoirItem.Importance === 1)
        return (
          <ReservoirItem
            idx={index}
            key={StationNo}
            StationNo={StationNo}
            StationName={StationName}
            showMore={showMore}
            clickShowMore={clickShowMore}
            reservoirItem={reservoirItem}
          />
        );
      })}
    </div>
  );
};

export default ReservoirList;
