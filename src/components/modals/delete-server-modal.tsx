'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { DialogFooter } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteServer'
  const { server } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      // window.location.reload()
      router.push('/')
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
      title='Delete Server'
      description={
        <p>
          Are you sure you want to do this? <br />
          <span className='text-indigo-500 font-semibold'>{server?.name}</span> will be permanently deleted.
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
