'use client'

import { UserProfile } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

const UserProfilePage = () => {
  const { theme } = useTheme()

  return (
    <UserProfile
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        elements: {
          navbarButtons: 'space-y-2',
          rootBox: 'w-full',
          navbar: 'border-border',
          card: 'w-full m-0 max-w-full rounded-none bg-background shadow-none min-h-screen',
        },
      }}
      path='/profile'
      routing='path'
    />
  )
}

export default UserProfilePage
