import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import React, { useMemo, useState } from 'react'
import ContractGeneral from './ContractGeneral';
import { useAddressDataContext } from '@/context/AddressContext';
import ContractInteractionMethods from './ContractInteractionMethods';
import { RSKFunctionFragment, rskFragmentsUtils } from '@/common/utils/contractInteractions';

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
  const { address, contractVerification } = useAddressDataContext()

  if (!contractVerification) return

  // TODO: Create ABI selector depending if contract is normal, proxy or native
  const isProxy = false;
  const isBridge = false;
  const { abi } = contractVerification as { abi: RSKFunctionFragment[] }

  const readMethods = rskFragmentsUtils.getReadMethods(abi);
  const writeMethods = rskFragmentsUtils.getWriteMethods(abi);

  const tabsToRender = useMemo(() => {
    return isProxy ? tabs : tabs.filter(({ type }) => !proxyTabTypes.includes(type));
  }, [isProxy]);

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
        {tab === TabTypesEnum.ReadProxy && <ContractInteractionMethods methods={readMethods} methodsType='read' />}
        {tab === TabTypesEnum.WriteProxy && <ContractInteractionMethods methods={writeMethods} methodsType='write' />}
        {tab === TabTypesEnum.ReadContract && <ContractInteractionMethods methods={readMethods} methodsType='read'/>}
        {tab === TabTypesEnum.WriteContract && <ContractInteractionMethods methods={writeMethods} methodsType='write' />}
      </div>
    </Card>
  )
}

export default ContractDetail