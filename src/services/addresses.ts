import {
  IAddresses,
  IContractVerification,
} from '@/common/interfaces/Addresses';
import { fetchData } from './api';
import { ROUTER } from '@/common/constants';

export async function fetchAddresses(params: object) {
  const response = await fetchData<IAddresses[]>(
    ROUTER.ADDRESSES.INDEX,
    params,
  );
  return response;
}

export async function fetchAddress(address: string) {
  const response = await fetchData<IAddresses>(
    `${ROUTER.ADDRESSES.INDEX}/${address}`, {}, 0
  );
  return response;
}

export async function fetchContractVerification(address: string) {
  const response = await fetchData<IContractVerification>(
    `${ROUTER.ADDRESSES.CONTRACT_VERIFICATION}/${address}`, {}, 0
  );
  return response;
}
