'use client';
import { IEvents } from '@/common/interfaces/IEvents';
import { createContext, useContext } from 'react';

interface DataContextType {
  event: IEvents | undefined;
}
const DataContext = createContext<DataContextType | undefined>(undefined);

export const EventDataContextProvider = ({
  event,
  children,
}: {
  event: IEvents | undefined;
  children: React.ReactNode;
}) => {
  return (
    <DataContext.Provider
      value={{
        event,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useEventDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
