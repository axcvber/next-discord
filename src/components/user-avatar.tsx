'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'
import { useEffect, useState } from 'react'

interface UserAvatarProps {
  src?: string
  className?: string
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Avatar className={cn('h-7 w-7 md:h-10 md:w-10', className)}>
      {!isClient ? <Skeleton className='h-full w-full rounded-full' /> : <AvatarImage src={src} />}
    </Avatar>
  )
}
