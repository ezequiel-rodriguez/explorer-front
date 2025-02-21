import BigNumber from 'bignumber.js';

export const weiToEther = (value: BigNumber | string | number) => {
  if (value === undefined || value === null || value === '') return '';

  let newValue: BigNumber;

  if (BigNumber.isBigNumber(value)) {
    newValue = value;
  } else if (typeof value === 'string') {
    newValue = value.startsWith('0x')
    ? new BigNumber(value, 16).dividedBy(new BigNumber(10).pow(18))
      : new BigNumber(value).multipliedBy(1e9);
  } else if (typeof value === 'number') {
    newValue = new BigNumber(value).multipliedBy(1e9);
  } else {
    return '';
  }

  return newValue
    .toFixed(9);
};
