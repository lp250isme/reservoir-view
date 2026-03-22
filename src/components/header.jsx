import { useState, useEffect } from 'react'
import { Droplets, Moon, Sun, LayoutGrid, Map, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header({ view, onViewChange }) {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <header className="sticky top-0 z-40 header-glass">
      {/* Animated gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] animated-gradient-border" />

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 logo-glow">
              <Droplets className="h-5 w-5 text-primary drop-shadow-[0_0_6px_rgba(14,165,233,0.5)]" />
            </div>
            {/* Tiny pulse dot */}
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary status-dot" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                全台水庫即時水情
              </span>
            </h1>
            <p className="text-[10px] text-muted-foreground/60 leading-tight tracking-widest uppercase">
              Taiwan Reservoir Dashboard
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* View toggle — neon pill */}
          <div className="flex rounded-full border border-primary/20 p-0.5 neon-toggle">
            <button
              onClick={() => onViewChange('grid')}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300',
                view === 'grid'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                  : 'hover:text-primary'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">列表</span>
            </button>
            <button
              onClick={() => onViewChange('map')}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300',
                view === 'map'
                  ? 'bg-primary text-primary-foreground shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                  : 'hover:text-primary'
              )}
            >
              <Map className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">地圖</span>
            </button>
          </div>

          {/* Dark mode toggle — glowing */}
          <button
            onClick={() => setDark(!dark)}
            className="rounded-full p-2.5 border border-border/50 hover:border-primary/40 hover:shadow-[0_0_12px_rgba(14,165,233,0.2)] transition-all duration-300"
            aria-label="切換深色模式"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
