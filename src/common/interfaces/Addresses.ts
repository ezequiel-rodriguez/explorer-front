
export interface IAddresses {
  id: number;
  isVerified: boolean
  address: string;
  isNative: boolean;
  type: 'account' | 'contract';
  name?: string | null;
  symbol?: string | null;
  balance: number;
  blockNumber: number;
  code: string
  deployedCode: string
  createdByTx?: {
    timestamp: string
    receipt: {
      transactionHash: string
    }
    internalTxId: string
  }
  interfaces: string[]
  totalSupply: number
}

export interface IContractVerification {
  id: string
  match: boolean
  abi: []
  request: {
    name: string
    bytecode: string
    deployedBytecode: string
    imports: [
      {
        contents: string
        file: string
      }
    ]
    version: string
    settings: {
      evmVersion: string
      optimizer: {
        enabled: boolean
        runs: number
      }
    }
  }
  result: {
    encodedConstructorArguments: string
  }
  sources: [
    {
      file: string
      content: string
    }
  ]
  timestamp: string
}