'use client'

import axios from 'axios'
import qs from 'query-string'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import { Modal } from '@/components/ui/modal'

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required.',
  }),
})

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'messageFile'
  const { apiUrl, query } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  })

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      })

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      })

      form.reset()
      router.refresh()
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title='Add an attachment'
      description={'Send a file as a message'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-8 px-6'>
            <div className='flex items-center justify-center text-center'>
              <FormField
                control={form.control}
                name='fileUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload endpoint='messageFile' value={field.value} onChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='primary' disabled={isLoading}>
              Send
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  )
}
