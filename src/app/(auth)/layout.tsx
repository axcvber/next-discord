import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-full w-full flex items-center justify-center relative'>
      {children}
      <div className='absolute inset-0 w-full h-full -z-[1]'>
        <Image priority fill quality={100} src='/bg-dc.jpg' alt='bg' className='object-cover' />
      </div>
    </div>
  )
}

export default AuthLayout
