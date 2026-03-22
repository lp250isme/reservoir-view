import { useQuery } from '@tanstack/react-query'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

const API_HOST = 'https://fhy.wra.gov.tw/WraApi'

async function fetchTrendData(stationNo) {
  // Try fetching 10-day historical data
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 10)

  const format = (d) => d.toISOString().split('T')[0]

  const res = await fetch(
    `${API_HOST}/v1/Reservoir/RealTimeInfo?$filter=StationNo eq '${stationNo}' and Time ge '${format(startDate)}' and Time le '${format(endDate)}'`
  )
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()

  if (!Array.isArray(data) || data.length === 0) return []

  return data
    .filter((d) => d.PercentageOfStorage != null)
    .map((d) => ({
      time: new Date(d.Time).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' }),
      percentage: Number(d.PercentageOfStorage.toFixed(1)),
      waterHeight: d.WaterHeight,
    }))
    .slice(-20)
}

export default function TrendChart({ stationNo, stationName }) {
  const { data: trendData, isLoading } = useQuery({
    queryKey: ['trend', stationNo],
    queryFn: () => fetchTrendData(stationNo),
    enabled: !!stationNo,
    staleTime: 30 * 60 * 1000,
  })

  if (isLoading || !trendData || trendData.length < 2) {
    return null
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">蓄水量趨勢</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={trendData}>
          <defs>
            <linearGradient id="pctGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11 }}
            className="fill-muted-foreground"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11 }}
            className="fill-muted-foreground"
            width={35}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              borderColor: 'var(--color-border)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value) => [`${value}%`, '蓄水百分比']}
          />
          <Area
            type="monotone"
            dataKey="percentage"
            stroke="#0ea5e9"
            strokeWidth={2}
            fill="url(#pctGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
