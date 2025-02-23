'use client';
import { ROUTER } from '@/common/constants';
import { IBlocks } from '@/common/interfaces/Blocks';
import { DataResponse } from '@/common/interfaces/IResponse';
import { fetchData } from '@/services/api';
import { createContext, useContext, useEffect, useState } from 'react';

interface DataContextType {
  lastBlock: IBlocks | undefined;
  activeSidebar: boolean;
  setActiveSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  widthScreen: number;
  setWidthScreen: React.Dispatch<React.SetStateAction<number>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const AppDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const CACHE_LATEST_BLOCK = 'lastBlock';

  const [lastBlock, setLastBlock] = useState<IBlocks | undefined>(undefined);
  const [activeSidebar, setActiveSidebar] = useState<boolean>(true);
  const [widthScreen, setWidthScreen] = useState(0);

  const fetchLatestBlock = async () => {
    const params = { take: 2 };
    const response: DataResponse<IBlocks[]> = await fetchData<IBlocks[]>(
      ROUTER.BLOCKS.INDEX,
      params,
      0,
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
    if (storedBlock && storedBlock !== 'undefined')
      return JSON.parse(storedBlock);
    return undefined;
  };

  const getLatestBlock = async () => {
    const cachedBlocks = loadBlockFromStorage();
    if (cachedBlocks) setLastBlock(cachedBlocks);
    await fetchLatestBlock();
  };

  useEffect(() => {
    getLatestBlock();

    const intervalId = setInterval(() => {
      getLatestBlock();
    }, 10000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{
        lastBlock,
        activeSidebar,
        setActiveSidebar,
        widthScreen,
        setWidthScreen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useAppDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
