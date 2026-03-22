export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-3 rounded-xl border p-5 bg-card"
        >
          <div className="w-full flex justify-between">
            <div className="space-y-2">
              <div className="h-5 w-24 bg-muted rounded animate-pulse" />
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
          </div>
          <div className="w-[100px] h-[100px] rounded-full bg-muted animate-pulse" />
          <div className="w-full h-3 bg-muted rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}
