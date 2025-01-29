import BigNumber from "bignumber.js";

export const weiToEther = (value: BigNumber | string) => {
  const newValue = new BigNumber(value.toString(), 16)
    .dividedBy(new BigNumber(10).pow(18))
    .toNumber()
    .toFixed(4);
  return newValue || 0;
}