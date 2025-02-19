'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type props = {
  defaultTab: string;
};
export const useTab = ({ defaultTab }: props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams?.toString());

  const currentTab = searchParams?.get('tab') || defaultTab;

  const changeTab = (newTab: string) => {
    const tabParam = newTab.toLowerCase();
    params.set('tab', tabParam);
    router.push(`${pathname}?${params}`);
  };

  return { changeTab, currentTab };
};
