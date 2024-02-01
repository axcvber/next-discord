'use client'

import { MemberRole } from '@prisma/client'
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/use-modal-store'
import { ServerWithMembersWithProfiles } from '@/types'

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles

  role?: MemberRole
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = isAdmin || role === MemberRole.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button className='w-full text-md font-semibold text-accent-foreground px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-accent transition'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 border-none text-xs font-medium text-black dark:text-neutral-400 bg-background dark:bg-[#111214] space-y-[3px]'>
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', { server })}
            className='text-primary px-3 py-2 text-sm  hover:bg-primary hover:text-primary-foreground'
          >
            Invite People
            <UserPlus className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('editServer', { server })}
            className='px-3 py-2 text-sm hover:bg-primary hover:text-primary-foreground'
          >
            Server Settings
            <Settings className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('members', { server })}
            className='px-3 py-2 text-sm hover:bg-primary hover:text-primary-foreground'
          >
            Manage Members
            <Users className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('createChannel')}
            className='px-3 py-2 text-sm hover:bg-primary hover:text-primary-foreground'
          >
            Create Channel
            <PlusCircle className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator className='!my-[3px]' />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('deleteServer', { server })}
            className='text-destructive px-3 py-2 text-sm hover:bg-destructive hover:text-white'
          >
            Delete Server
            <Trash className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('leaveServer', { server })}
            className='text-destructive px-3 py-2 text-sm hover:bg-destructive hover:text-white'
          >
            Leave Server
            <LogOut className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
