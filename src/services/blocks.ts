'use server';

import { IBlocks } from '@/common/interfaces/Blocks';
import { fetchData } from './api';
import { ROUTER } from '@/common/constants';

export async function fetchBlocks(params: object) {
  const response = await fetchData<IBlocks[]>(ROUTER.BLOCKS.INDEX, params, 0);
  return response;
}

export async function fetchOneBlock(blockNumberOrHash: number | string) {
  const response = await fetchData<IBlocks>(
    `${ROUTER.BLOCKS.INDEX}/${blockNumberOrHash}`,
  );
  return response;
}
