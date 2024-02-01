import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    // <div className='p-4'>
    //   <div className='flex flex-col space-y-3 w-full'>
    //     <Skeleton className='h-[125px] w-[250px] rounded-xl' />
    //     <div className='space-y-2'>
    //       <Skeleton className='h-4 w-[250px]' />
    //       <Skeleton className='h-4 w-[200px]' />
    //     </div>
    //   </div>
    // </div>
    <div className='flex flex-col flex-1 justify-center items-center h-full'>
      <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
      <p className='text-xs text-zinc-500 dark:text-zinc-400'>Loading...</p>
    </div>
  )
}
