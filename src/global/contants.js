export const API_HOST = "https://fhy.wra.gov.tw/WraApi";
export const API_GET_BASIC_CITY = `${API_HOST}/v1/Basic/City`;
// export const API_GET_RESERVOIR_STATION = `${API_HOST}/v1/Reservoir/Station`;
export const API_GET_RESERVOIR_STATION = `${API_HOST}/v1/Reservoir/Station?$filter=Importance eq 1`;
