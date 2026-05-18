import * as React from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex items-center rounded-full border border-[#C7D6EB] bg-[#EAF3FC] p-1 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8)]',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'rounded-full px-6 py-2 text-sm font-semibold text-slate-500 transition data-[active]:bg-[#0D5CA8] data-[active]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5CA8]/20 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger }
