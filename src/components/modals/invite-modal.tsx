'use client'

import axios from 'axios'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { useModal } from '@/hooks/use-modal-store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useOrigin } from '@/hooks/use-origin'
import { Modal } from '@/components/ui/modal'

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const origin = useOrigin()

  const isModalOpen = isOpen && type === 'invite'
  const { server } = data

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

      onOpen('invite', { server: response.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title='Invite Friends'
      description='Give your server a personality with a name and an image. You can always change it later.'
    >
      <div className='p-6'>
        <Label>Server invite link</Label>
        <div className='flex items-center mt-2 gap-x-2'>
          <Input disabled={isLoading} value={inviteUrl} />
          <Button disabled={isLoading} onClick={onCopy} size='icon' variant={'outline'}>
            {copied ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
          </Button>
        </div>
        <Button onClick={onNew} disabled={isLoading} variant='link' size='sm' className='text-xs text-zinc-500 mt-4'>
          Generate a new link
          <RefreshCw className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </Modal>
  )
}
