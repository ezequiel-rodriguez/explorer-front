import { ITokens, ITokensByAddress } from '@/common/interfaces/Tokens';
import { fetchData } from './api';
import { ROUTER } from '@/common/constants';

export async function fetchTokens(params: object) {
  const response = await fetchData<ITokens[]>(ROUTER.TOKENS.INDEX, params);
  return response;
}

export async function fetchTokensByAddress(address: string) {
  const response = await fetchData<ITokensByAddress[]>(
    `${ROUTER.TOKENS.INDEX}/${address}`,
  );
  return response;
}

export async function fetchTokenByNameOrSymbol(value: string) {
  const response = await fetchData<ITokens[]>(
    `${ROUTER.TOKENS.SEARCH}/${value}`,
  );
  return response;
}
