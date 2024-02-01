'use client'

import React, { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'
import { Skeleton } from './ui/skeleton'

const UserWidget = () => {
  const { theme } = useTheme()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Skeleton className='h-12 w-12 rounded-full' />
  }

  return (
    <UserButton
      afterSignOutUrl='/'
      userProfileMode='navigation'
      userProfileUrl='/profile'
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        elements: {
          userButtonTrigger: 'focus:shadow-none',
          userButtonPopoverFooter: 'hidden',
          avatarBox: 'h-[48px] w-[48px]',
        },
      }}
    />
  )
}

export default UserWidget
