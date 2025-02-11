export const API_URL = process.env.API_URL;
export const PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const NETWORK = process.env.NETWORK;

export const CHAIN_ID = NETWORK === 'mainnet' ? 30 : (31 as 30 | 31);

export const ROUTER = {
  HOME: '/',
  STATS: '/stats',
  BLOCKS: {
    INDEX: '/blocks',
  },
  TXS: {
    INDEX: '/txs',
    BLOCK: '/txs/block',
    ADDRESS: '/txs/address',
  },
  ADDRESSES: {
    INDEX: '/addresses',
    TOKENS: '/tokens',
    EVENTS: '/events',
    TTRANSFER: '/ttransfers',
    ACCOUNT: '/account',
    BALANCES: '/balances',
    CONTRACT_VERIFICATION: '/addresses/verification',
  },
  TOKENS: {
    INDEX: '/tokens',
    SEARCH: '/tokens/search',
  },
  ITXS: {
    INDEX: '/itxs',
    BLOCK: '/itxs/block',
    TX: '/itxs/tx',
    ADDRESS: '/itxs/address',
  },
  EVENTS: {
    INDEX: '/events',
    ADDRESS: '/events/address',
    TX: '/events/tx',
    TOKEN_TRANSFER_ADRESS: '/events/transfer',
  },
  BALANCES: {
    ADDRESS: '/balances/address',
  },
};
