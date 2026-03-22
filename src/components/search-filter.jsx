import { Search, ArrowUpDown } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'name', label: '依名稱' },
  { value: 'pct-asc', label: '蓄水量 (低→高)' },
  { value: 'pct-desc', label: '蓄水量 (高→低)' },
  { value: 'basin', label: '依流域' },
]

function SelectItem({ children, className, value, ...props }) {
  return (
    <Select.Item
      className={cn(
        'relative flex w-full cursor-pointer items-center rounded-lg py-2 pl-8 pr-3 text-sm outline-none',
        'hover:bg-primary/10 hover:text-primary focus:bg-primary/10 transition-colors',
        className
      )}
      value={value}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="h-4 w-4 text-primary" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
}

export default function SearchFilter({ search, onSearchChange, sortBy, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search — neon glow on focus */}
      <div className="relative flex-1 group">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-focus-within:from-primary/40 group-focus-within:via-cyan-400/40 group-focus-within:to-primary/40 transition-all duration-500 blur-[2px]" />
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="搜尋水庫名稱或流域..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              'w-full rounded-xl glass-input pl-10 pr-4 py-3 text-sm',
              'placeholder:text-muted-foreground/50',
              'focus:outline-none',
            )}
          />
        </div>
      </div>

      {/* Sort — glass style */}
      <Select.Root value={sortBy} onValueChange={onSortChange}>
        <Select.Trigger
          className={cn(
            'inline-flex items-center gap-2 rounded-xl glass-input px-4 py-3 text-sm',
            'hover:border-primary/30 transition-all duration-300',
            'min-w-[180px]'
          )}
        >
          <ArrowUpDown className="h-4 w-4 text-primary/60" />
          <Select.Value placeholder="排序" />
          <Select.Icon className="ml-auto">
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden rounded-xl glass-dropdown shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-[100] border border-primary/10"
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport className="p-1.5">
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
