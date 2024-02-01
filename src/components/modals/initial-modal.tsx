'use client'

import axios from 'axios'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/modal'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/servers', values)
      // form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      title='Create your server'
      description='Give your server a personality with a name and an image. You can always change it later.'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-4 px-6'>
            <div className='flex items-center justify-center text-center'>
              <FormField
                control={form.control}
                name='imageUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload endpoint='serverImage' value={field.value} onChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder='Enter server name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button variant='primary' disabled={isLoading}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  )
}
