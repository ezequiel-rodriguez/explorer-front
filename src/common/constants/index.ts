export const API_URL = process.env.API_URL;
export const PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

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
  ACCOUNTS: {
    INDEX: '/accounts',
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
    ADDRESS: '/tokens/address',
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
    TOKEN_TRANSFER_BY_TX: '/events/transfer/tx',
    TOKEN_TRANSFER_BY_ADDRESS: '/events/transfer/address',
  },
  BALANCES: {
    ADDRESS: '/balances/address',
  },
};
