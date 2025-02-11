import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import React, { useEffect, useState } from 'react';
import ContractGeneral from './ContractGeneral';
import { useAddressDataContext } from '@/context/AddressContext';
import ContractInteractionMethods from './ContractInteractionMethods';
import {
  RSKFunctionFragment,
  rskFragmentsUtils,
} from '@/common/utils/contractInteractions';
import { fetchContractVerification } from '@/services/addresses';
import { bridge } from '@/common/constants/bridge';
import { Hex } from 'viem';
import { isProxyContract } from '@/common/utils/wagmiFunctions';
import ContractInteractionsLoader from '@/components/loaders/ContractInteractionsLoader';

type TabType =
  | 'general'
  | 'readProxy'
  | 'writeProxy'
  | 'readContract'
  | 'writeContract';

enum TabTypesEnum {
  General = 'general',
  ReadProxy = 'readProxy',
  WriteProxy = 'writeProxy',
  ReadContract = 'readContract',
  WriteContract = 'writeContract',
}

const tabTypes: Record<TabTypesEnum, TabType> = {
  [TabTypesEnum.General]: TabTypesEnum.General,
  [TabTypesEnum.ReadProxy]: TabTypesEnum.ReadProxy,
  [TabTypesEnum.WriteProxy]: TabTypesEnum.WriteProxy,
  [TabTypesEnum.ReadContract]: TabTypesEnum.ReadContract,
  [TabTypesEnum.WriteContract]: TabTypesEnum.WriteContract,
};

const proxyTabTypes = [TabTypesEnum.ReadProxy, TabTypesEnum.WriteProxy];

const tabs = [
  { label: 'General', type: TabTypesEnum.General },
  { label: 'Read Proxy', type: TabTypesEnum.ReadProxy },
  { label: 'Write Proxy', type: TabTypesEnum.WriteProxy },
  { label: 'Read Contract', type: TabTypesEnum.ReadContract },
  { label: 'Write Contract', type: TabTypesEnum.WriteContract },
];

function VerifiedContractDetails() {
  const [tab, setTab] = useState<TabType>(tabTypes.general);
  const { address: addressData, contractVerification } =
    useAddressDataContext();
  const [isBridge, setIsBridge] = useState(false);
  const [isProxy, setIsProxy] = useState(false);
  const [implementationAddress, setImplementationAddress] =
    useState<string>('');
  const [isImplementationVerified, setIsImplementationVerified] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [targetAbi, setTargetAbi] = useState<RSKFunctionFragment[]>([]);

  // require address data
  if (!addressData) return;

  useEffect(() => {
    setIsBridge(addressData!.address === bridge.address);
  }, [addressData]);

  useEffect(() => {
    async function setContractAbi() {
      try {
        if (isBridge) {
          // set precompiled Bridge ABI
          setTargetAbi(bridge.abi);

          // set readContract tab as default tab
          setTab(tabTypes.readContract);
          return;
        } else if (contractVerification) {
          // Normal contracts can be interacted with, but proxy contracts require additional checks
          // Provisionally set abi from contract verification provided by context
          const { abi } = contractVerification as {
            abi: RSKFunctionFragment[];
          };
          setTargetAbi(abi);

          // check if contract is a proxy
          const proxyCheck = await isProxyContract(addressData!.address as Hex);

          if (!proxyCheck.isProxy) {
            // Not Proxy contract
            setIsProxy(false);
            setImplementationAddress('');
            setIsImplementationVerified(false);
          } else {
            // Proxy contract
            setIsProxy(true);
            const implAddress = proxyCheck.implementationAddress;
            setImplementationAddress(implAddress);

            // check if implementation address is verified
            const implementationVerification =
              await fetchContractVerification(implAddress);

            if (
              !implementationVerification ||
              !implementationVerification.data ||
              !implementationVerification.data.abi
            ) {
              // No implementation ABI for implementation address. Interactions are not possible
              setIsImplementationVerified(false);

              return;
            }

            // set implementation ABI for interactions with proxy AND implementation tabs
            setTargetAbi(implementationVerification.data.abi);
            setIsImplementationVerified(true);
          }
        }
      } catch (error) {
        console.error(`Error setting contract ABI`);
        console.error(error);
      }

      setIsLoading(false);
    }

    setContractAbi();
  }, [addressData, contractVerification, isBridge]);

  // require contract verification for non native contracts
  if (!isBridge && !contractVerification) return;

  // default: use same address for contract and proxy tabs (for non-proxy contracts, proxy tabs will be hidden)
  const addresses = {
    proxyContractAddress: addressData.address,
    contractAddress: addressData.address,
  };

  const unverifiedImplementationData = {
    show: isProxy && !isImplementationVerified,
    implementationAddress: implementationAddress,
  };

  if (isProxy && implementationAddress !== '') {
    // use implementation address for normal read/write tabs
    addresses.contractAddress = implementationAddress;
  }

  const readMethods = rskFragmentsUtils.getReadMethods(targetAbi);
  const writeMethods = rskFragmentsUtils.getWriteMethods(targetAbi);
  const tabsToRender = isProxy
    ? tabs
    : tabs.filter(({ type }) => !proxyTabTypes.includes(type));

  // display loading state
  if (isLoading) return <ContractInteractionsLoader />;

  return (
    <Card className="bg-secondary mt-6 w-full min-h-[500px]">
      {/* Tab Buttons */}
      <div className="flex gap-2">
        {tabsToRender.map(({ label, type }) => {
          const skipGeneralTab = isBridge && type === tabTypes.general;

          if (skipGeneralTab) return;

          return (
            <Button
              key={type}
              label={label}
              type="small"
              className={tab === type ? 'bg-btn-secondary' : ''}
              onClick={() => setTab(type)}
            />
          );
        })}
      </div>
      {/* Tabs */}
      <div className="mt-5">
        {tab === TabTypesEnum.General && !isBridge && <ContractGeneral />}
        {tab === TabTypesEnum.ReadProxy && (
          <ContractInteractionMethods
            contractAddress={addresses.proxyContractAddress}
            methods={readMethods}
            methodsType="read"
            unverifiedImplementationData={unverifiedImplementationData}
          />
        )}
        {tab === TabTypesEnum.WriteProxy && (
          <ContractInteractionMethods
            contractAddress={addresses.proxyContractAddress}
            methods={writeMethods}
            methodsType="write"
            unverifiedImplementationData={unverifiedImplementationData}
          />
        )}
        {tab === TabTypesEnum.ReadContract && (
          <ContractInteractionMethods
            contractAddress={addresses.contractAddress}
            methods={readMethods}
            methodsType="read"
            unverifiedImplementationData={unverifiedImplementationData}
          />
        )}
        {tab === TabTypesEnum.WriteContract && (
          <ContractInteractionMethods
            contractAddress={addresses.contractAddress}
            methods={writeMethods}
            methodsType="write"
            unverifiedImplementationData={unverifiedImplementationData}
          />
        )}
      </div>
    </Card>
  );
}

export default VerifiedContractDetails;
