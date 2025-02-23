'use client';
import { ROUTER } from '@/common/constants';
import Link from 'next/link';

const error = () => {
  return (
    <div className="w-full h-screen flex justify-center mt-8">
      <div className="w-full max-h-fit flex flex-col text-center bg-secondary p-6 sm:p-12 rounded-xl">
        <div className="text-4xl sm:text-[80px] font-bold mb-4 sm:mb-16">
          Ooops
        </div>
        <div className="text-lg sm:text-[38px] mb-6 sm:mb-10 font-bold">
          An error has occurred
        </div>
        <Link
          className="btn px-4 w-fit mx-auto py-2 bg-brand-orange rounded-xl text-black font-medium"
          href={ROUTER.HOME}
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default error;
