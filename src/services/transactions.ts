'use server'

import { ROUTER } from "@/common/constants";
import { ITxs } from "@/common/interfaces/Txs";
import { fetchData } from "./api";

export async function fetchTxs(params: object) {
  const response = await fetchData<ITxs[]>(ROUTER.TXS.INDEX, params);
  return response;
}

export async function fetchTxsByHash(hash: string) {
  const response = await fetchData<ITxs>(`${ROUTER.TXS.INDEX}/${hash}`)
  return response;
}

export async function fetchTxsByBlock(blockNumberOrHash: number | string) {
  const response = await fetchData<ITxs[]>(`${ROUTER.TXS.BLOCK}/${blockNumberOrHash}`);
  return response;
}