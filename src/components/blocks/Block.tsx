import { ROUTER } from '@/common/constants';
import { parseDecimals } from '@/common/utils/ParseDecimals';
import Link from 'next/link';
import React from 'react';

type props = {
  number: string | number | undefined;
};
function Block({ number }: props) {
  return (
    <Link href={`${ROUTER.BLOCKS.INDEX}/${number}`}>
      {parseDecimals(number)}
    </Link>
  );
}

export default Block;
