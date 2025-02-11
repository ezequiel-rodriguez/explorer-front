// HeroV4 contract ABI
// normal contract - verified on testnet & staging
// EVM: London (default for solc 0.8.7+)
// Solc: 0.8.28
// Address: 0x6026961edd5d7ca672a9b651599fa2a6843e973a
export const HeroV4_ABI: any[] = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        indexed: false,
        internalType: 'struct HeroV4.ComplexData[]',
        name: 'complexDataSnapshot',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'ComplexDataSnapshot',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        indexed: false,
        internalType: 'struct HeroV4.ComplexData',
        name: 'complexData',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'ComplexDataUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'apprenticeAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
    ],
    name: 'NewApprentice',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        indexed: false,
        internalType: 'struct HeroV4.ComplexData',
        name: 'complexData',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    name: 'NewComplexData',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'addresses',
        type: 'address[]',
      },
    ],
    name: 'acceptAddresses',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes1',
        name: 'bytes1Value',
        type: 'bytes1',
      },
      {
        internalType: 'bytes2',
        name: 'bytes2Value',
        type: 'bytes2',
      },
      {
        internalType: 'bytes32',
        name: 'bytes32Value',
        type: 'bytes32',
      },
    ],
    name: 'acceptBytes',
    outputs: [
      {
        internalType: 'bytes1',
        name: '',
        type: 'bytes1',
      },
      {
        internalType: 'bytes2',
        name: '',
        type: 'bytes2',
      },
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'num1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'num2',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'addr1',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'throwError',
            type: 'bool',
          },
        ],
        internalType: 'struct HeroV4.Tuple',
        name: 'tuple',
        type: 'tuple',
      },
    ],
    name: 'acceptTuple',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'uint8Value',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: 'uint16Value',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'uint256Value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'uintValue',
        type: 'uint256',
      },
    ],
    name: 'acceptUints',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptedApprenticeTypes',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '_addresses',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_uints',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: '_strings',
        type: 'string[]',
      },
    ],
    name: 'addComplexData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'apprentices',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'complexDataIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'createComplexDataSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'defeatVillian',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
    ],
    name: 'getApprenticesByCategory',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'category',
        type: 'bool',
      },
    ],
    name: 'getApprenticesByCategoryBool',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getComplexDataById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getHeroStats',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hero',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_type',
        type: 'uint256',
      },
    ],
    name: 'newApprentice',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'sendViaCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalApprentices',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '_addresses',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_uints',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: '_strings',
        type: 'string[]',
      },
    ],
    name: 'updateComplexData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'villiansDefeated',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'worldSaved',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const;

export const HeroV4_FUNCTION_FRAGMENTS_ABI: any[] = [
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'addresses',
        type: 'address[]',
      },
    ],
    name: 'acceptAddresses',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes1',
        name: 'bytes1Value',
        type: 'bytes1',
      },
      {
        internalType: 'bytes2',
        name: 'bytes2Value',
        type: 'bytes2',
      },
      {
        internalType: 'bytes32',
        name: 'bytes32Value',
        type: 'bytes32',
      },
    ],
    name: 'acceptBytes',
    outputs: [
      {
        internalType: 'bytes1',
        name: '',
        type: 'bytes1',
      },
      {
        internalType: 'bytes2',
        name: '',
        type: 'bytes2',
      },
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'num1',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'num2',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'addr1',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'throwError',
            type: 'bool',
          },
        ],
        internalType: 'struct HeroV4.Tuple',
        name: 'tuple',
        type: 'tuple',
      },
    ],
    name: 'acceptTuple',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'uint8Value',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: 'uint16Value',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: 'uint256Value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'uintValue',
        type: 'uint256',
      },
    ],
    name: 'acceptUints',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptedApprenticeTypes',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '_addresses',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_uints',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: '_strings',
        type: 'string[]',
      },
    ],
    name: 'addComplexData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'apprentices',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'complexDataIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'createComplexDataSnapshot',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'defeatVillian',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'category',
        type: 'string',
      },
    ],
    name: 'getApprenticesByCategory',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'category',
        type: 'bool',
      },
    ],
    name: 'getApprenticesByCategoryBool',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'getComplexDataById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getHeroStats',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'hero',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_type',
        type: 'uint256',
      },
    ],
    name: 'newApprentice',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'sendViaCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalApprentices',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: '_addresses',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_uints',
        type: 'uint256[]',
      },
      {
        internalType: 'string[]',
        name: '_strings',
        type: 'string[]',
      },
    ],
    name: 'updateComplexData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'uints',
            type: 'uint256[]',
          },
          {
            internalType: 'string[]',
            name: 'strings',
            type: 'string[]',
          },
        ],
        internalType: 'struct HeroV4.ComplexData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'villiansDefeated',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'worldSaved',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
