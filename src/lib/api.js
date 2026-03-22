const API_HOST = 'https://fhy.wra.gov.tw/WraApi'

export async function fetchReservoirStations() {
  const res = await fetch(
    `${API_HOST}/v1/Reservoir/Station?$filter=Importance eq 1`
  )
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function fetchReservoirRealTimeInfo(stationNo) {
  const res = await fetch(
    `${API_HOST}/v1/Reservoir/RealTimeInfo?$filter=StationNo eq '${stationNo}'`
  )
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data[0] ?? null
}
