import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Popup>) {
  return (
    <DialogPortal>
      <DialogPrimitive.Backdrop
        className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-[2px] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="relative flex w-full items-start justify-center">
          <DialogPrimitive.Popup
            data-slot="dialog-content"
            className={cn(
              'relative w-full origin-center rounded-[24px] bg-background shadow-[0_32px_80px_rgba(15,23,42,0.24)] outline-none duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
              className
            )}
            {...props}
          >
            {children}
          </DialogPrimitive.Popup>
        </div>
      </div>
    </DialogPortal>
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
}
