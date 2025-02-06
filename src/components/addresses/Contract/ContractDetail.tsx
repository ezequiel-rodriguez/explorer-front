import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import React, { useEffect, useMemo, useState } from 'react'
import ContractGeneral from './ContractGeneral';
import { useAddressDataContext } from '@/context/AddressContext';
import ContractInteractionMethods from './ContractInteractionMethods';
import { RSKFunctionFragment, rskFragmentsUtils } from '@/common/utils/contractInteractions';
import { getStorageAt } from '@wagmi/core'
import { wagmiConfig } from '@/context/Web3Provider';
import { fetchContractVerification } from '@/services/addresses';

type TabType = 'general' | 'readProxy' | 'writeProxy' | 'readContract' | 'writeContract';

enum TabTypesEnum {
  General = 'general',
  ReadProxy = 'readProxy',
  WriteProxy = 'writeProxy',
  ReadContract = 'readContract',
  WriteContract = 'writeContract'
}

const tabTypes: Record<TabTypesEnum, TabType> = {
  [TabTypesEnum.General]: TabTypesEnum.General,
  [TabTypesEnum.ReadProxy]: TabTypesEnum.ReadProxy,
  [TabTypesEnum.WriteProxy]: TabTypesEnum.WriteProxy,
  [TabTypesEnum.ReadContract]: TabTypesEnum.ReadContract,
  [TabTypesEnum.WriteContract]: TabTypesEnum.WriteContract
};

const proxyTabTypes = [
  TabTypesEnum.ReadProxy,
  TabTypesEnum.WriteProxy
];

const tabs = [
  { label: 'General', type: TabTypesEnum.General },
  { label: 'Read Proxy', type: TabTypesEnum.ReadProxy },
  { label: 'Write Proxy', type: TabTypesEnum.WriteProxy },
  { label: 'Read Contract', type: TabTypesEnum.ReadContract },
  { label: 'Write Contract', type: TabTypesEnum.WriteContract }
];

function ContractDetail() {
  const [tab, setTab] = useState<TabType>(tabTypes.general);
  const { address: addressData, contractVerification } = useAddressDataContext()
  // TODO: add bridge interactions support
  const [isBridge, setIsBridge] = useState(false)
  const [isProxy, setIsProxy] = useState(false)
  const [implementationAddress, setImplementationAddress] = useState<string>('')
  const [isImplementationVerified, setIsImplementationVerified] = useState(false)
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const { abi } = contractVerification as { abi: RSKFunctionFragment[] }
  const [targetAbi, setTargetAbi] = useState<RSKFunctionFragment[]>(abi)

  if (!addressData || !contractVerification) return

  const tabsToRender = useMemo(() => {
    return isProxy ? tabs : tabs.filter(({ type }) => !proxyTabTypes.includes(type));
  }, [isProxy]);

  useEffect(() => {
    const getAddressFromSlot = (slot: string) => `0x${slot.slice(-40)}`

    async function checkProxySlot() {
      try {
        // ERC1967 normative (see https://eips.ethereum.org/EIPS/eip-1967)
        const IMPLEMENTATION_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'

        // FUTURE: support beacon proxies
        // const BEACON_SLOT = '0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50'

        // fetch implementation address from proxy slot
        const slotValue = await getStorageAt(wagmiConfig, {
          address: addressData?.address as unknown as `0x${string}`,
          slot: IMPLEMENTATION_SLOT
        }) as string

        const isZero = BigInt(slotValue) === BigInt(0)

        if (isZero) {
          // No implementation address found in slot. Not a proxy contract
          setIsProxy(false)
          setImplementationAddress('')
          setIsImplementationVerified(false)

          return
        }

        // parse implementation address from slot value
        const implementationAddress = getAddressFromSlot(slotValue)

        setIsProxy(true)
        setImplementationAddress(implementationAddress)

        // check if implementation address is verified
        const implementationVerification = await fetchContractVerification(implementationAddress)

        if (!implementationVerification || !implementationVerification.data || !implementationVerification.data.abi) {
          // No implementation ABI for implementation address. Interactions are not possible
          setIsImplementationVerified(false)

          return
        }

        // use implementation ABI for interactions with proxy AND implementation tabs
        setTargetAbi(implementationVerification.data.abi)
        setIsImplementationVerified(true)
      } catch (error) {
        console.error(`Error checking proxy slot for address: ${addressData?.address}`)
        console.error(error)
      } finally {
        setFetchCompleted(true);
      }
    }

    checkProxySlot()
  }, [])

  if (!fetchCompleted) {
    return (
      <ContractDetailLoader />
    )
  }

  // default: use same address for contract and proxy tabs (for non-proxy contracts, proxy tabs will be hidden)
  const addresses = {
    proxyContractAddress: addressData.address,
    contractAddress: addressData.address
  }

  const unverifiedImplementationData = {
    show: isProxy && !isImplementationVerified,
    implementationAddress: implementationAddress
  }

  if (isProxy && implementationAddress !== '') {
    // use implementation address for normal read/write tabs
    addresses.contractAddress = implementationAddress
  }

  const readMethods = rskFragmentsUtils.getReadMethods(targetAbi);
  const writeMethods = rskFragmentsUtils.getWriteMethods(targetAbi);

  return (
    <Card className='bg-secondary mt-6 w-full min-h-[500px]'>
      {/* Tab Buttons */}
      <div className='flex gap-2'>
        {tabsToRender.map(({ label, type }) => (
          <Button key={type} label={label} type='small' className={tab === type ? 'bg-btn-secondary' : ''} onClick={() => setTab(type)} />
        ))}
      </div>
      {/* Tabs */}
      <div className='mt-5'>
        {tab === TabTypesEnum.General && <ContractGeneral />}
        {tab === TabTypesEnum.ReadProxy && <ContractInteractionMethods
          contractAddress={addresses.proxyContractAddress}
          methods={readMethods}
          methodsType='read'
          unverifiedImplementationData={unverifiedImplementationData}
          />}
        {tab === TabTypesEnum.WriteProxy && <ContractInteractionMethods
          contractAddress={addresses.proxyContractAddress}
          methods={writeMethods}
          methodsType='write'
          unverifiedImplementationData={unverifiedImplementationData}
          />}
        {tab === TabTypesEnum.ReadContract && <ContractInteractionMethods
          contractAddress={addresses.contractAddress}
          methods={readMethods}
          methodsType='read'
          unverifiedImplementationData={unverifiedImplementationData}
          />}
        {tab === TabTypesEnum.WriteContract && <ContractInteractionMethods
          contractAddress={addresses.contractAddress}
          methods={writeMethods}
          methodsType='write'
          unverifiedImplementationData={unverifiedImplementationData}
          />}
      </div>
    </Card>
  )
}

function ContractDetailLoader() {
  return (
    <div className="animate-pulse w-full min-h-[1000px] bg-[#131313] mt-6 p-6 rounded-lg">
      <div className='w-full'>
        <div className='max-w-[400px]'>
          <div className='w-full flex gap-3 mb-6'>
            <div className='h-[32px] w-20 bg-zinc-800 rounded-lg'></div>
            <div className='h-[32px] w-20 bg-zinc-800 rounded-lg'></div>
            <div className='h-[32px] w-20 bg-zinc-800 rounded-lg'></div>
            <div className='h-[32px] w-20 bg-zinc-800 rounded-lg'></div>
            <div className='h-[32px] w-20 bg-zinc-800 rounded-lg'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractDetail