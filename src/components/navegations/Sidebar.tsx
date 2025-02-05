'use client';
import SidebarItem from './SidebarItem';
import {
  AddressIcon,
  BlockActiveIcon,
  BlockIcon,
  HomeActiveIcon,
  HomeIcon,
  Logo,
  TokenIcon,
  TxIcon,
} from '@/common/icons';
import { ROUTER } from '@/common/constants';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();
  const isActive = (route: string) => {
    return pathname!.includes(route);
  };
  const color = {
    [ROUTER.HOME]: 'bg-brand-orange',
    [ROUTER.BLOCKS.INDEX]: 'bg-brand-green',
    [ROUTER.TXS.INDEX]: 'bg-brand-purple',
    [ROUTER.ADDRESSES.INDEX]: 'bg-brand-pink',
    [ROUTER.TOKENS]: 'bg-brand-cyan',
  };
  return (
    <div className="w-[210px] fixed h-screen inset-0 z-10 md:relative">
      <div className="w-[210px] h-full">
        <aside className="w-[210px] pt-5 fixed top-0 left-0 h-full border-r border-line">
          <div className="mb-10 ml-6">
            <Logo />
            <span className="bg-brand-orange rounded-xl text-xs px-1 font-semibold text-black">
              MAINNET
            </span>
          </div>
          <SidebarItem
            label="Home"
            isActive={pathname === ROUTER.HOME}
            className={color[pathname]}
            link={ROUTER.HOME}
            icon={
              pathname === ROUTER.HOME ? (
                <HomeActiveIcon />
              ) : (
                <HomeIcon className="fill-white" />
              )
            }
          />
          <SidebarItem
            label="Blocks"
            isActive={isActive(ROUTER.BLOCKS.INDEX)}
            className="bg-brand-green"
            link={ROUTER.BLOCKS.INDEX}
            icon={
              isActive(ROUTER.BLOCKS.INDEX) ? (
                <BlockActiveIcon />
              ) : (
                <BlockIcon />
              )
            }
          />
          <SidebarItem
            label="Transacciones"
            isActive={isActive(ROUTER.TXS.INDEX)}
            className="bg-brand-purple"
            link={ROUTER.TXS.INDEX}
            icon={
              <TxIcon
                className={
                  isActive(ROUTER.TXS.INDEX) ? '!fill-black' : 'fill-white-400'
                }
              />
            }
          />
          <SidebarItem
            label="Addresses"
            isActive={isActive(ROUTER.ADDRESSES.INDEX)}
            className="bg-brand-pink"
            link={ROUTER.ADDRESSES.INDEX}
            icon={
              <AddressIcon
                className={
                  isActive(ROUTER.ADDRESSES.INDEX)
                    ? '!fill-black'
                    : 'fill-white-400'
                }
              />
            }
          />
          <SidebarItem
            label="Tokens"
            isActive={isActive(ROUTER.TOKENS)}
            className="bg-brand-cyan"
            link={ROUTER.TOKENS}
            icon={
              <TokenIcon
                className={
                  isActive(ROUTER.TOKENS) ? '!fill-black' : 'fill-white-400'
                }
              />
            }
          />
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;
