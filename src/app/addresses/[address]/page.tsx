'use client';

import Button from "@/components/ui/Button";
import { ADDRESSES_BTN_TABS } from "@/components/addresses/tabs/AddressesTabs";
import { useTab } from "@/hooks/useTab";
import AddressDetail from "@/components/addresses/tabs/AddressDetail";
import ContractDetail from "@/components/addresses/Contract/ContractDetail";
import { useEffect } from "react";
import { fetchContractVerification } from "@/services/addresses";
import { useAddressDataContext } from "@/context/AddressContext";

export default function Page() {
  const { address, setContractVerification } = useAddressDataContext();
  const { changeTab, currentTab } = useTab({ defaultTab: ADDRESSES_BTN_TABS[0].tab });

  useEffect(() => {
    const getContractVerification = async () => {
      if (currentTab !== 'contract') return;
      const response = await fetchContractVerification(address!.address);
      setContractVerification(response?.data);
      console.log("Contract verification data fetched and set");
      // console.log('response: ', response);
    }

    getContractVerification();
  }, [currentTab, address, setContractVerification]);
  
  return (
    <div className="mt-6">
      <AddressDetail />
      <div className="flex gap-2">
        {
          ADDRESSES_BTN_TABS.map((btn, i) => (
            <Button
              key={i}
              label={btn.label}
              onClick={() => changeTab(btn.tab)}
              className={ currentTab === btn.tab ? 'bg-btn-secondary text-white' : ''}
            />
          ))
        }
      </div>
      
      {
        // !loading && (
        //   <AddressesTxsTabsContent
        //     currentTab={currentTab}
        //     itxs={data?.data as IInternalTxs[]}
        //     txs={data?.data as ITxs[]}
        //     events={data?.data as IEvents[]}
        //   />
        // )
      }
      { (currentTab === 'contract' && address?.type === 'contract') && <ContractDetail />}
    </div>
  );
}
