import { ITokensByAddress } from '@/common/interfaces/Tokens';
import { fetchData } from './api';
import { ROUTER } from '@/common/constants';

export async function fetchAccountsByAddress(address: string) {
  const response = await fetchData<ITokensByAddress[]>(
    `${ROUTER.ACCOUNTS.INDEX}/${address}`,
  );
  return response;
}
