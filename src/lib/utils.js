import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getWaterStatus(percentage) {
  if (percentage <= 10) return 'critical'
  if (percentage <= 20) return 'warning'
  if (percentage <= 50) return 'watch'
  return 'normal'
}

export const statusConfig = {
  normal: { label: '水量正常', color: 'text-water-normal', bg: 'bg-water-normal', borderColor: 'border-water-normal' },
  watch: { label: '水量偏低', color: 'text-water-watch', bg: 'bg-water-watch', borderColor: 'border-water-watch' },
  warning: { label: '水量不足', color: 'text-water-warning', bg: 'bg-water-warning', borderColor: 'border-water-warning' },
  critical: { label: '水量嚴重不足', color: 'text-water-critical', bg: 'bg-water-critical', borderColor: 'border-water-critical' },
}

export function formatPercentage(value) {
  if (value == null) return '--'
  return Number(value).toFixed(1)
}

export function formatNumber(value) {
  if (value == null) return '--'
  return Number(value).toLocaleString('zh-TW')
}
