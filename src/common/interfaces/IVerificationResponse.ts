export interface IVerificationResponse {
  success: boolean;
  message: string;
  data: Data;
}
type Data = {
  address: string;
  version: string;
  name: string;
  storedCode: string;
  dataResponse: DataResponse;
};
type DataResponse = {
  name: string;
  usedSettings: {
    compiler: {
      version: string;
    };
    language: string;
    evmVersion: string;
    libraries: Record<string, string>;
    optimizer: {
      enabled: boolean;
      runs: number;
    };
    remappings: string[];
  };
  usedLibraries: Record<string, string>;
  bytecode: string;
  resultBytecode: string;
  bytecodeHash: string;
  resultBytecodeHash: string;
  abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  opcodes: string;
  usedSources: string[];
  methodIdentifiers: [string, string][];
  decodedMetadata: {
    ipfs: string;
    solc: string;
  }[];
};
