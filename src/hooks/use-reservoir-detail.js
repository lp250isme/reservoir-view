import { useQuery } from '@tanstack/react-query'
import { fetchReservoirRealTimeInfo } from '@/lib/api'

export function useReservoirDetail(stationNo, enabled = true) {
  return useQuery({
    queryKey: ['reservoir-detail', stationNo],
    queryFn: () => fetchReservoirRealTimeInfo(stationNo),
    enabled: !!stationNo && enabled,
    staleTime: 5 * 60 * 1000,
  })
}
