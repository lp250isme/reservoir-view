import { cn, getWaterStatus, statusConfig } from '@/lib/utils'

export default function StatusBadge({ percentage }) {
  const status = getWaterStatus(percentage ?? 0)
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.bg + '/15',
        config.color
      )}
    >
      {config.label}
    </span>
  )
}
