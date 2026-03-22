import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet'
import { getWaterStatus, statusConfig } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

const statusColors = {
  normal: '#22c55e',
  watch: '#eab308',
  warning: '#f97316',
  critical: '#ef4444',
}

const TAIWAN_CENTER = [23.7, 120.9]
const TAIWAN_ZOOM = 7

function FitBounds({ reservoirs }) {
  const map = useMap()
  useEffect(() => {
    if (reservoirs.length === 0) return
    const bounds = reservoirs
      .filter((r) => r.Latitude && r.Longitude)
      .map((r) => [r.Latitude, r.Longitude])
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] })
    }
  }, [reservoirs, map])
  return null
}

export default function MapView({ reservoirs, detailMap, onMarkerClick }) {
  const validReservoirs = reservoirs.filter((r) => r.Latitude && r.Longitude)

  return (
    <div className="rounded-xl border overflow-hidden" style={{ height: 'calc(100vh - 220px)', minHeight: 400 }}>
      <MapContainer
        center={TAIWAN_CENTER}
        zoom={TAIWAN_ZOOM}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds reservoirs={validReservoirs} />

        {validReservoirs.map((station) => {
          const detail = detailMap?.[station.StationNo]
          const pct = detail?.PercentageOfStorage
          const status = getWaterStatus(pct ?? 50)
          const color = statusColors[status]
          const radius = pct != null ? Math.max(6, Math.min(18, (pct / 100) * 18)) : 8

          return (
            <CircleMarker
              key={station.StationNo}
              center={[station.Latitude, station.Longitude]}
              radius={radius}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.7,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onMarkerClick(station, detail),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]}>
                <div className="text-center">
                  <div className="font-semibold">{station.StationName}</div>
                  {pct != null && (
                    <div className="text-sm">
                      蓄水 {pct.toFixed(1)}% · {statusConfig[status].label}
                    </div>
                  )}
                </div>
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
