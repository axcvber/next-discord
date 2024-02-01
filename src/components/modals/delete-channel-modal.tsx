'use client'

import qs from 'query-string'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { DialogFooter } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteChannel'
  const { server, channel } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })

      await axios.delete(url)

      router.refresh()
      onClose()
      // window.location.reload()
      // router.push(`/servers/${server?.id}`)
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
      title='Delete Channel'
      description={
        <p>
          Are you sure you want to do this? <br />
          <span className='text-indigo-500 font-semibold'>#{channel?.name}</span> will be permanently deleted.
        </p>
      }
    >
      <DialogFooter>
        <div className='flex items-center justify-between w-full'>
          <Button disabled={isLoading} onClick={onClose} variant='destructive'>
            Cancel
          </Button>
          <Button disabled={isLoading} variant='primary' onClick={onClick}>
            Confirm
          </Button>
        </div>
      </DialogFooter>
    </Modal>
  )
}
