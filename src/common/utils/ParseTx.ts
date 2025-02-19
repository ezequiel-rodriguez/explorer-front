import BigNumber from 'bignumber.js';
import { parseDecimals } from './ParseDecimals';

export const txFee = (
  gasPrice: number | string | undefined,
  gasUsed: number | string | undefined,
) => {
  if (gasPrice === undefined && gasUsed === undefined) return 0;

  const value = new BigNumber(gasPrice!.toString())
    .multipliedBy(new BigNumber(gasUsed!.toString()))
    .toNumber();

  if (!value) return 0;

  return parseDecimals(value, 8);
};
