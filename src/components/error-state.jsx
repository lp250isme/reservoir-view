import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertTriangle className="h-12 w-12 text-water-warning mb-4" />
      <h2 className="text-lg font-semibold mb-2">無法載入水庫資料</h2>
      <p className="text-muted-foreground text-sm mb-6">
        請檢查網路連線後重試
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <RefreshCw className="h-4 w-4" />
        重新載入
      </button>
    </div>
  )
}
