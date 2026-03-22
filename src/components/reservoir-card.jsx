import { cn, getWaterStatus, statusConfig } from '@/lib/utils'
import { useReservoirDetail } from '@/hooks/use-reservoir-detail'
import WaterGauge from './water-gauge'
import StatusBadge from './status-badge'
import { MapPin, Droplets, Zap } from 'lucide-react'

const statusGlow = {
  normal: 'rgba(34,197,94,0.15)',
  watch: 'rgba(234,179,8,0.15)',
  warning: 'rgba(249,115,22,0.15)',
  critical: 'rgba(239,68,68,0.2)',
}

const statusBorder = {
  normal: 'rgba(34,197,94,0.3)',
  watch: 'rgba(234,179,8,0.3)',
  warning: 'rgba(249,115,22,0.3)',
  critical: 'rgba(239,68,68,0.4)',
}

export default function ReservoirCard({ station, onClick }) {
  const { data: detail, isLoading } = useReservoirDetail(station.StationNo)

  const percentage = detail?.PercentageOfStorage ?? null
  const status = getWaterStatus(percentage ?? 0)

  return (
    <button
      onClick={() => onClick(station, detail)}
      className={cn(
        'group relative flex flex-col items-center gap-3 rounded-2xl p-5',
        'glass-card',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:scale-[1.02]',
        'cursor-pointer text-left w-full',
      )}
      style={{
        '--card-glow': percentage != null ? statusGlow[status] : 'transparent',
        '--card-border': percentage != null ? statusBorder[status] : 'rgba(148,163,184,0.1)',
      }}
    >
      {/* Animated border gradient on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animated-card-border" />

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="w-full flex items-start justify-between mb-1">
          <div className="min-w-0">
            <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors duration-300">
              {station.StationName}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="text-xs truncate">{station.BasinName}</span>
            </div>
          </div>
          {percentage != null && <StatusBadge percentage={percentage} />}
        </div>

        {/* Gauge */}
        <div className="py-2 flex justify-center">
          {isLoading ? (
            <div className="w-[100px] h-[100px] rounded-full bg-muted/30 animate-pulse" />
          ) : percentage != null ? (
            <WaterGauge percentage={percentage} size={100} />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-muted/30 flex items-center justify-center">
              <Droplets className="h-8 w-8 text-muted-foreground/50" />
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="w-full flex justify-between text-[11px] text-muted-foreground/70">
          <span>有效容量 {station.EffectiveCapacity?.toLocaleString()} 萬m³</span>
          {percentage != null && status === 'critical' && (
            <span className="flex items-center gap-0.5 text-water-critical">
              <Zap className="h-3 w-3" /> 警戒
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
