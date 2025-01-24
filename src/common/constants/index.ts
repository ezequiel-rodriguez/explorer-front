export const API_URL = process.env.API_URL;

export const ROUTER = {
  HOME: '/',
  STATS: '/stats',
  BLOCKS: {
    INDEX: '/blocks',
  },
  TXS: {
    INDEX: '/txs',
    BLOCK: '/txs/block',
    ADDRESS: '/txs/address'
  },
  ADDRESSES: {
    INDEX: '/addresses',
    TOKENS: '/tokens',
    EVENTS: '/events',
    TTRANSFER: '/ttransfers',
    ACCOUNT: '/account',
    BALANCES: '/balances',
    CONTRACT_VERIFICATION: '/addresses/verification'
  },
  VERIFY: {
    GET_SOLC: 'https://solc-bin.ethereum.org/bin/list.json',
  },
  TOKENS: '/tokens',
  ITXS: {
    INDEX: '/itxs',
    BLOCK: '/itxs/block',
    TX: '/itxs/tx',
    ADDRESS: '/itxs/address'
  },
  EVENTS: {
    INDEX: '/events',
    ADDRESS: '/events/address',
    TX: '/events/tx'
  }
}