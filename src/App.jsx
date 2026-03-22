import { useState, useMemo, lazy, Suspense } from 'react'
import { useReservoirs } from '@/hooks/use-reservoirs'
import { useQueries } from '@tanstack/react-query'
import { fetchReservoirRealTimeInfo } from '@/lib/api'
import Header from '@/components/header'
import SearchFilter from '@/components/search-filter'
import ReservoirGrid from '@/components/reservoir-grid'
import ReservoirDetailDialog from '@/components/reservoir-detail-dialog'
import LoadingSkeleton from '@/components/loading-skeleton'
import ErrorState from '@/components/error-state'
import AnimatedBackground from '@/components/animated-background'

const MapView = lazy(() => import('@/components/map-view'))

export default function App() {
  const { data: reservoirs, isLoading, error, refetch } = useReservoirs()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [view, setView] = useState('grid')
  const [selectedStation, setSelectedStation] = useState(null)
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Fetch all real-time details for map view
  const detailQueries = useQueries({
    queries: (reservoirs ?? []).map((station) => ({
      queryKey: ['reservoir-detail', station.StationNo],
      queryFn: () => fetchReservoirRealTimeInfo(station.StationNo),
      staleTime: 5 * 60 * 1000,
      enabled: view === 'map',
    })),
  })

  const detailMap = useMemo(() => {
    if (!reservoirs) return {}
    const map = {}
    reservoirs.forEach((station, i) => {
      const data = detailQueries[i]?.data
      if (data) map[station.StationNo] = data
    })
    return map
  }, [reservoirs, detailQueries])

  // Filter and sort
  const filtered = useMemo(() => {
    if (!reservoirs) return []
    let result = reservoirs.filter(
      (r) =>
        r.StationName.includes(search) ||
        r.BasinName.includes(search)
    )

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.StationName.localeCompare(b.StationName, 'zh-TW'))
        break
      case 'pct-asc':
      case 'pct-desc': {
        result.sort((a, b) => {
          const da = detailMap[a.StationNo]?.PercentageOfStorage ?? -1
          const db = detailMap[b.StationNo]?.PercentageOfStorage ?? -1
          return sortBy === 'pct-asc' ? da - db : db - da
        })
        break
      }
      case 'basin':
        result.sort((a, b) => a.BasinName.localeCompare(b.BasinName, 'zh-TW'))
        break
    }
    return result
  }, [reservoirs, search, sortBy, detailMap])

  const handleCardClick = (station, detail) => {
    setSelectedStation(station)
    setSelectedDetail(detail)
    setDialogOpen(true)
  }

  if (error) return <ErrorState onRetry={refetch} />

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative z-10">
      <Header view={view} onViewChange={setView} />

      <main className="container mx-auto px-4 py-6">
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Stats bar — cyberpunk style */}
        {!isLoading && reservoirs && (
          <div className="flex items-center gap-4 mb-5 text-xs tracking-wider uppercase">
            <div className="flex items-center gap-2 text-primary/70">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>ONLINE</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground/80">{filtered.length} 座水庫</span>
            </div>
            {search && (
              <span className="text-muted-foreground/60">
                FILTER: <span className="text-primary/80">{search}</span>
              </span>
            )}
          </div>
        )}

        {isLoading ? (
          <LoadingSkeleton />
        ) : view === 'grid' ? (
          <ReservoirGrid reservoirs={filtered} onCardClick={handleCardClick} />
        ) : (
          <Suspense fallback={<LoadingSkeleton />}>
            <MapView
              reservoirs={filtered}
              detailMap={detailMap}
              onMarkerClick={handleCardClick}
            />
          </Suspense>
        )}
      </main>

      <ReservoirDetailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        station={selectedStation}
        detail={selectedDetail}
      />
      </div>
    </div>
  )
}
