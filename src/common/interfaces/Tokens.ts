export interface ITokens {
  address: string;
  blockNumber: number;
  blockHash: string;
  balance: string;
  name: string;
  symbol: string;
}

export interface ITokensByAddress {
  address: string;
  contract: string;
  blockNumber: number;
  blockHash: string;
  balance: string;
  name: string;
  symbol: string;
}
