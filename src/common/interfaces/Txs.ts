export type StatusType = 'SUCCESS' | 'PENDING' | 'FAIL' | 'REMOVED';

export interface ITxs {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gasUsed: number;
  gas: number;
  gasPrice: string;
  timestamp: string;
  txType: string;
  transactionIndex: number;
  nonce: number;
  input: string;
  receipt: {
    logs: ILogs[];
  };
  status: StatusType;
}

export interface IInternalTxs {
  internalTxId: string;
  transactionHash: string;
  blockNumber: number;
  blockHash: string;
  transactionPosition: number;
  type: string;
  subtraces: number;
  traceAddress: string;
  result?: {
    gasUsed: string;
    code: string;
    output: string;
  };
  index: number;
  timestamp: string;
  datetime: string;
  error: string | undefined;
  action: {
    callType: string;
    from: string;
    to: string;
    gas: string;
    input: string;
    init: string;
    value: string;
  };
}

export interface ILogs {
  logIndex: number;
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
  transactionIndex: number;
  address: string;
  data: string;
  topics: string[];
  event: string;
  signature: string;
  abi: {
    anonymous: boolean;
    inputs: EventInput[];
    name: string;
    type: string;
  };
  args?: string[];
  _addresses: string[];
  eventId: string;
  timestamp: number;
  txStatus: string;
}

interface EventInput {
  indexed: boolean;
  name: string;
  type: string;
}
