'use client'

import qs from 'query-string'
import axios from 'axios'
import { useState } from 'react'

import { DialogFooter } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'deleteMessage'
  const { apiUrl, query } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      })

      await axios.delete(url)

      onClose()
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
      title='Delete Message'
      description={
        <p>
          Are you sure you want to do this? <br />
          The message will be permanently deleted.
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
