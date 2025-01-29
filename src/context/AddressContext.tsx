'use client'
import { IAddresses, IContractVerification } from "@/common/interfaces/Addresses";
import { createContext, useContext, useState } from "react";

interface DataContextType {
  address: IAddresses | undefined
  contractVerification: IContractVerification | undefined
  setContractVerification: React.Dispatch<React.SetStateAction<IContractVerification | undefined>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const AddressDataProvider = (
  {
    address,
    children
}: {
  address: IAddresses | undefined,
  children: React.ReactNode,
 }) => {
  const [contractVerification, setContractVerification] = useState<IContractVerification | undefined>(undefined);
  return (
    <DataContext.Provider
      value={{
        address,
        contractVerification,
        setContractVerification,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useAddressDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}