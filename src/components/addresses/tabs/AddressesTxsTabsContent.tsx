import { IBalances } from '@/common/interfaces/Balances'
import { IEvents } from '@/common/interfaces/IEvents'
import { IInternalTxs, ITxs } from '@/common/interfaces/Txs'
import BalancesTable from '@/components/balances/BalancesTable'
import EventsTable from '@/components/events/EventsTable'
import InternalTxsTable from '@/components/itxs/InternalTxsTable'
import TokenTransfersTable from '@/components/transfer/TokenTransfersTable'
import TxsTable from '@/components/txs/TxsTable'
import React from 'react'

type props = {
  currentTab: string
  txs: ITxs[] | undefined
  itxs: IInternalTxs[] | undefined
  events: IEvents[] | undefined
  tokens: IEvents[] | undefined
  balances: IBalances[] | undefined
}

const AddressesTxsTabsContent = ({ currentTab, txs, itxs, events, tokens, balances }: props) => {
  if (currentTab === "txs") return <TxsTable txs={txs} />;
  if (currentTab === "itxs") return <InternalTxsTable itxs={itxs} />;
  if (currentTab === "events") return <EventsTable events={events} />;
  if (currentTab === "token_transfer") return <TokenTransfersTable tokens={tokens} />;
  if (currentTab === "balances") return <BalancesTable balances={balances} />;
  return null;
}

export default AddressesTxsTabsContent
