'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IBlocks } from '@/common/interfaces/Blocks';
import { ITxs, IInternalTxs } from '@/common/interfaces/Txs';
import { INavigation } from '@/common/interfaces/IResponse';
import { useTab } from '@/hooks/useTab';
import { BLOCKS_BTN_TABS } from '@/components/blocks/tabs/BlocksTabs';
import { fetchTxsByBlock } from '@/services/transactions';
import { fetchInternalTxsByBlock } from '@/services/itxs';

interface DataContextType {
  block: IBlocks | undefined;
  navigation: INavigation | undefined;
  txsData: ITxs[] | undefined;
  itxsData: IInternalTxs[] | undefined;
  loading: boolean;
  changeTab: (newTab: string) => void;
  currentTab: string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const BlocksDataProvider = ({
  block,
  navigation,
  children,
}: {
  block: IBlocks | undefined;
  navigation: INavigation | undefined;
  children: React.ReactNode;
}) => {
  const [txsData, setTxsData] = useState<ITxs[] | undefined>(undefined);
  const [itxsData, setItxsData] = useState<IInternalTxs[] | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const { changeTab, currentTab } = useTab({
    defaultTab: BLOCKS_BTN_TABS[0].tab,
  });

  useEffect(() => {
    const getTxsByBlock = async () => {
      if (currentTab !== 'txs' || txsData?.length) return;
      setLoading(true);
      const data = await fetchTxsByBlock(block!.number!);
      setTxsData(data?.data);
      setLoading(false);
    };

    const getInternalTxsByBlock = async () => {
      if (currentTab !== 'itxs' || itxsData?.length) return;
      setLoading(true);
      const data = await fetchInternalTxsByBlock(block!.number!);
      setItxsData(data?.data);
      setLoading(false);
    };
    getTxsByBlock();
    getInternalTxsByBlock();
  }, [
    block,
    currentTab,
    itxsData?.length,
    setItxsData,
    setTxsData,
    txsData?.length,
  ]);

  return (
    <DataContext.Provider
      value={{
        block,
        navigation,
        txsData,
        itxsData,
        loading,
        changeTab,
        currentTab,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useBlocksDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
