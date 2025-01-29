'use client'
import Navbar from './Navbar'
import Button from '../ui/Button'
import { usePathname } from 'next/navigation'
import { ROUTER } from '@/common/constants';

function Header() {
  const pathname = usePathname();
  if (pathname === ROUTER.HOME) return;
  return (
    <header className='flex justify-between items-center'>
      <Navbar />
      <div>
        <Button label='TESTNET' type='outline' />
      </div>
    </header>
  )
}

export default Header
