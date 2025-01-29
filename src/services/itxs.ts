'use server'

import { ROUTER } from "@/common/constants";
import { IInternalTxs } from "@/common/interfaces/Txs";
import { fetchData } from "./api";

export async function fetchInternalTxsByBlock(blockNumberOrHash: number | string) {
  const response = await fetchData<IInternalTxs[]>(`${ROUTER.ITXS.BLOCK}/${blockNumberOrHash}`);
  return response;
}

export async function fetchInternalTxsByTxHash(hash: string) {
  const response = await fetchData<IInternalTxs[]>(`${ROUTER.ITXS.TX}/${hash}`);
  return response;
}

export async function fetchInternalTxsByAddress(address: string) {
  const response = await fetchData<IInternalTxs[]>(`${ROUTER.ITXS.ADDRESS}/${address}`);
  return response;
}