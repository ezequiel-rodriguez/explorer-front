import { ROUTER } from '@/common/constants'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center mt-8">
      <div className="w-full max-h-fit flex flex-col text-center bg-secondary p-6 sm:p-12 rounded-xl">
        <div className='text-4xl sm:text-[80px] font-bold mb-4 sm:mb-16'>404</div>
        <div className="text-lg sm:text-[38px] mb-6 sm:mb-10 font-bold">Page Not Found.</div>
        <div className='text-white-400 mb-6'>We couldn't find this page! Use the search bar to find what you're looking for or go back to the home page</div>
        <Link
          className="btn px-4 w-fit mx-auto py-2 bg-brand-orange rounded-xl text-black font-medium"
          href={ROUTER.HOME}
        >
          Go To Home
        </Link>
      </div>
    </div>
  )
}