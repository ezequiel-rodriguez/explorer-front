'use client';
import { BLOCKS_BTN_TABS } from '@/components/blocks/tabs/BlocksTabs';
import TableLoader from '@/components/loaders/TableLoader';
import BlockDetail from '@/components/blocks/tabs/BlockDetail';
import TxsTable from '@/components/txs/TxsTable';
import InternalTxsTable from '@/components/itxs/InternalTxsTable';
import Button from '@/components/ui/Button';
import { useBlocksDataContext } from '@/context/BlocksContext';

export default function BlockPage() {
  const { txsData, itxsData, loading, changeTab, currentTab } =
    useBlocksDataContext();

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        {BLOCKS_BTN_TABS.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            className={
              currentTab === button.tab ? 'bg-btn-secondary text-white' : ''
            }
            onClick={() => changeTab(button.tab)}
          />
        ))}
      </div>
      <div className="mt-6">
        {loading && <TableLoader />}
        {currentTab === 'overview' && <BlockDetail />}
        {currentTab === 'txs' && !loading && (
          <TxsTable txs={txsData} showBlock={false} />
        )}
        {currentTab === 'itxs' && !loading && (
          <InternalTxsTable itxs={itxsData} />
        )}
      </div>
    </div>
  );
}
