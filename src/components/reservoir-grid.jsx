import ReservoirCard from './reservoir-card'

export default function ReservoirGrid({ reservoirs, onCardClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {reservoirs.map((station) => (
        <ReservoirCard
          key={station.StationNo}
          station={station}
          onClick={onCardClick}
        />
      ))}
    </div>
  )
}
