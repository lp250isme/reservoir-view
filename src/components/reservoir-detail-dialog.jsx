import * as Dialog from '@radix-ui/react-dialog'
import { X, Droplets, Ruler, Clock, MapPin, Database } from 'lucide-react'
import { cn, formatPercentage, formatNumber, getWaterStatus, statusConfig } from '@/lib/utils'
import WaterGauge from './water-gauge'
import StatusBadge from './status-badge'
import TrendChart from './trend-chart'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 group/row hover:bg-primary/5 px-2 -mx-2 rounded-lg transition-colors">
      <div className="flex items-center gap-2.5 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary/50" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
    </div>
  )
}

export default function ReservoirDetailDialog({ open, onOpenChange, station, detail }) {
  if (!station) return null

  const percentage = detail?.PercentageOfStorage ?? null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[1001] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 max-h-[90vh] overflow-y-auto glass-dialog data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Dialog.Title className="text-xl font-bold">
                {station.StationName}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {station.BasinName}
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-full p-1.5 hover:bg-muted transition-colors">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Gauge */}
          <div className="flex justify-center py-4">
            {percentage != null ? (
              <WaterGauge percentage={percentage} size={160} />
            ) : (
              <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center">
                <Droplets className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Info table */}
          <div className="rounded-xl border border-primary/10 bg-muted/20 backdrop-blur-sm p-4">
            <InfoRow
              icon={Droplets}
              label="蓄水百分比"
              value={percentage != null ? `${formatPercentage(percentage)}%` : '--'}
            />
            <InfoRow
              icon={Ruler}
              label="水位高"
              value={detail?.WaterHeight != null ? `${formatNumber(detail.WaterHeight)} 公尺` : '--'}
            />
            <InfoRow
              icon={Database}
              label="有效蓄水量"
              value={detail?.EffectiveStorage != null ? `${formatNumber(detail.EffectiveStorage)} 萬立方公尺` : '--'}
            />
            <InfoRow
              icon={Database}
              label="有效容量"
              value={station.EffectiveCapacity != null ? `${formatNumber(station.EffectiveCapacity)} 萬立方公尺` : '--'}
            />
            <InfoRow
              icon={Clock}
              label="更新時間"
              value={detail?.Time ?? '--'}
            />
          </div>

          {/* Trend chart */}
          <div className="mt-4">
            <TrendChart stationNo={station.StationNo} stationName={station.StationName} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
