'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ModalProps {
  title?: string
  description?: string | React.ReactNode
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className='text-2xl text-center font-bold'>{title}</DialogTitle>
          {description && (
            <DialogDescription className='text-center text-zinc-500' asChild={typeof children === 'object'}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <>{children}</>
      </DialogContent>
    </Dialog>
  )
}
