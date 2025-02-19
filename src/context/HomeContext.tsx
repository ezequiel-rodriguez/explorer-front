'use client';
import { ROUTER } from '@/common/constants';
import { IBlocks } from '@/common/interfaces/Blocks';
import { ITxs } from '@/common/interfaces/Txs';
import { fetchData } from '@/services/api';
import { createContext, useContext, useEffect, useState } from 'react';

interface IHomeContext {
  blocks: IBlocks[] | undefined;
  txs: ITxs[] | undefined;
  autoUpdate: boolean;
  setAutoUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<IHomeContext | undefined>(undefined);

export const HomeContext = ({ children }: { children: React.ReactNode }) => {
  const [autoUpdate, setAutoUpdate] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<IBlocks[] | undefined>(undefined);
  const [txs, setTxs] = useState<ITxs[] | undefined>(undefined);
  const CACHE_BLOCK = 'blocks';
  const CACHE_TXS = 'txs';

  const loadAutoUpdate = () => {
    const auptoupdate = localStorage.getItem('autoupdate');
    const value = auptoupdate === 'active' && true;
    setAutoUpdate(value);
  };

  // Blocks
  const fetchBlocks = async () => {
    // last 40 blocks ∼ 20 mins
    const params = { take: 40 };
    const response = await fetchData<IBlocks[]>(ROUTER.BLOCKS.INDEX, params, 0);
    setBlocks(response?.data);
    saveBlocksToCache(response?.data);
  };

  const loadBlocksFromCache = () => {
    const cachedData = localStorage.getItem(CACHE_BLOCK);
    if (cachedData && cachedData !== 'undefined') {
      return JSON.parse(cachedData);
    }
    return null;
  };

  const saveBlocksToCache = (data: IBlocks[] | undefined) => {
    localStorage.setItem(CACHE_BLOCK, JSON.stringify(data));
  };

  const getBlocks = async () => {
    const cachedBlocks = loadBlocksFromCache();
    if (cachedBlocks) setBlocks(cachedBlocks);
    await fetchBlocks();
  };

  // TXS
  const fetchTxs = async () => {
    const params = { take_data: 10 };
    const response = await fetchData<ITxs[]>(ROUTER.TXS.INDEX, params, 0);
    setTxs(response?.data);
    saveTxsToCache(response?.data);
  };
  const getTxs = async () => {
    const cachedTxs = loadTxsFromCache();
    if (cachedTxs) setTxs(cachedTxs);
    await fetchTxs();
  };
  const loadTxsFromCache = () => {
    const cachedData = localStorage.getItem(CACHE_TXS);
    if (cachedData && cachedData !== 'undefined') {
      return JSON.parse(cachedData);
    }
    return null;
  };

  const saveTxsToCache = (data: ITxs[] | undefined) => {
    localStorage.setItem(CACHE_TXS, JSON.stringify(data));
  };

  useEffect(() => {
    loadAutoUpdate();
    getBlocks();
    getTxs();

    const intervalId = setInterval(() => {
      if (autoUpdate) {
        getBlocks();
        getTxs();
      }
    }, 10000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpdate]);

  return (
    <DataContext.Provider
      value={{
        blocks,
        txs,
        autoUpdate,
        setAutoUpdate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useHomeDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useHomeDataContext must be used within a DataProvider');
  }
  return context;
};
