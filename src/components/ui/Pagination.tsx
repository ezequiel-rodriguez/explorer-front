'use client';
import { ArrowLeftIcon, ArrowRightIcon } from '@/common/icons';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react';
import Button from './Button';
type props = {
  data: {
    totalPages: number;
    currentPage: number;
    total: number;
  };
};
function Pagination({ data }: props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  params.set('page_data', data.currentPage.toString());

  const handlePage = (value: number) => {
    params.set('page_data', value.toString());
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  if (data.total <= 50) return;
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="font-semibold"></div>
      <div className="flex items-center gap-3">
        <div className="flex gap-3 items-center">
          <Button
            label="First"
            onClick={() => handlePage(1)}
            disabled={data.currentPage === 1}
            type="secondary"
          />
          <Button
            onClick={() => handlePage(data.currentPage - 1)}
            disabled={data.currentPage <= 1}
            icon={
              <ArrowLeftIcon
                className={`${data.currentPage <= 1 ? '!fill-gray-400' : 'fill-white'}`}
              />
            }
            type="secondary"
          />
          <div className="font-semibold text-lg">{data.currentPage}</div>
          <Button
            onClick={() => handlePage(data.currentPage + 1)}
            disabled={data.currentPage >= data.totalPages}
            icon={
              <ArrowRightIcon
                className={`${data.currentPage >= data.totalPages ? '!fill-gray-400' : 'fill-white'}`}
              />
            }
            type="secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default Pagination;
