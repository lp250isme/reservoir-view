const ReservoirDetail = ({ reservoirItem }) => {
  return (
    <div className="detail">
      <table className="table">
        <tr>
          <td className="topTitle" colspan="2">
            詳細資料
          </td>
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
      </table>
    </div>
  );
};

export default ReservoirDetail;
