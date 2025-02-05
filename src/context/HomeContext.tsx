'use client';
import { ROUTER } from '@/common/constants';
import { IBlocks } from '@/common/interfaces/Blocks';
import { DataResponse } from '@/common/interfaces/IResponse';
import { ITxs } from '@/common/interfaces/Txs';
import { fetchData } from '@/services/api';
import { createContext, useContext, useEffect, useState } from 'react';

interface IHomeContext {
  lastBlock: IBlocks | undefined;
  blocks: IBlocks[] | undefined;
  txs: ITxs[] | undefined;
  autoUpdate: boolean;
  setAutoUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<IHomeContext | undefined>(undefined);

export const HomeContext = ({ children }: { children: React.ReactNode }) => {
  const [autoUpdate, setAutoUpdate] = useState<boolean>(false);
  const [lastBlock, setLastBlock] = useState<IBlocks | undefined>(undefined);
  const [blocks, setBlocks] = useState<IBlocks[] | undefined>(undefined);
  const [txs, setTxs] = useState<ITxs[] | undefined>(undefined);
  const CACHE_BLOCK = 'blocks';
  const CACHE_TXS = 'txs';
  const CACHE_LATEST_BLOCK = 'lastBlock';

  const loadAutoUpdate = () => {
    const auptoupdate = localStorage.getItem('autoupdate');
    const value = auptoupdate === 'active' && true;
    setAutoUpdate(value);
  };

  // Latest block
  const fetchLatestBlock = async () => {
    const params = { take_data: 2 };
    const response: DataResponse<IBlocks[]> = await fetchData<IBlocks[]>(
      ROUTER.BLOCKS.INDEX,
      params,
      5
    );
    const latestBlock = response?.data[0];
    setLastBlock(latestBlock);
    saveLatesBlocksToCache(latestBlock);
  };
  const saveLatesBlocksToCache = (data: IBlocks | undefined) => {
    localStorage.setItem(CACHE_LATEST_BLOCK, JSON.stringify(data));
  };
  const loadBlockFromStorage = (): IBlocks | undefined => {
    const storedBlock = localStorage.getItem(CACHE_LATEST_BLOCK);
    if (storedBlock) return JSON.parse(storedBlock);
    return undefined;
  };
  const getLatestBlock = async () => {
    const cachedBlocks = loadBlockFromStorage();
    if (cachedBlocks) setLastBlock(cachedBlocks);
    await fetchLatestBlock();
  };

  // Blocks
  const fetchBlocks = async () => {
    const params = { take_data: 10 };
    const response = await fetchData<IBlocks[]>(ROUTER.BLOCKS.INDEX, params, 5);
    setBlocks(response?.data);
    saveBlocksToCache(response?.data);
  };

  const loadBlocksFromCache = () => {
    const cachedData = localStorage.getItem(CACHE_BLOCK);
    if (cachedData) {
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
    const response = await fetchData<ITxs[]>(ROUTER.TXS.INDEX, params, 5);
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
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  };

  const saveTxsToCache = (data: ITxs[] | undefined) => {
    localStorage.setItem(CACHE_TXS, JSON.stringify(data));
  };

  useEffect(() => {
    loadAutoUpdate();
    getLatestBlock();
    getBlocks();
    getTxs();

    const intervalId = setInterval(() => {
      if (autoUpdate) {
        getBlocks();
        getTxs();
      }
      getLatestBlock();
    }, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpdate]);

  return (
    <DataContext.Provider
      value={{
        lastBlock,
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
