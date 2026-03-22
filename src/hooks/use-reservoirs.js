import { useQuery } from '@tanstack/react-query'
import { fetchReservoirStations } from '@/lib/api'

export function useReservoirs() {
  return useQuery({
    queryKey: ['reservoirs'],
    queryFn: fetchReservoirStations,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  })
}
