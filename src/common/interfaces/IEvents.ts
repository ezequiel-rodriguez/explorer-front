
export interface IEvents {
  eventId: string;
  abi: EventAbi;
  address: string;
  args: string[] | undefined;
  topic0: string;
  topic1: string | null;
  topic2: string | null;
  topic3: string | null;
  blockHash: string;
  blockNumber: number;
  data: string;
  event: string | null;
  logIndex: number;
  signature: string | null;
  timestamp: string;
  transactionHash: string;
  transactionIndex: number;
  txStatus: string;
  address_in_event: AddressInEvent[];
  totalSupply: number;
  contrant_detail: {
    name: string;
    symbol: string;
  };
}

interface EventAbiInput {
  type: string;
  name: string;
  indexed: boolean;
}

interface EventAbi {
  type: string;
  anonymous?: boolean;
  name?: string;
  inputs?: EventAbiInput[];
}

interface AddressInEvent {
  address: string;
  isEventEmitterAddress: boolean;
}
