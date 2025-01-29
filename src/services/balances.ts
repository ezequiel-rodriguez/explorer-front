import { fetchData } from "./api";
import { ROUTER } from "@/common/constants";
import { IBalances } from "@/common/interfaces/Balances";


export async function fetchBalancesByAddress(address: string) {
  const response = await fetchData<IBalances[]>(`${ROUTER.BALANCES.ADDRESS}/${address}`);
  return response;
}