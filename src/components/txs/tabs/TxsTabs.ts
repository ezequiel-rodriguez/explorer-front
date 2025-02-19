import { ROUTER } from '@/common/constants';

export const TXS_BTN_TABS = [
  { label: 'Overview', tab: 'overview' },
  { label: 'Internal Transantions', tab: 'itxs' },
  { label: 'Logs', tab: 'logs' },
  { label: 'Token Transfer', tab: 'ttransfer' },
];

export const TXS_URL_TABS = [
  { url: ROUTER.ITXS.BLOCK, label: 'Internal Transactions', tab: 'itxs' },
];
