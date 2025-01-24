import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import React, { useMemo, useState } from 'react'
import ContractGeneral from './ContractGeneral';
import ReadContract from './ReadContract';
import WriteContract from './WriteContract';
import ReadProxy from './ReadProxy';
import WriteProxy from './WriteProxy';

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
  const isProxy = false; // TODO: Define how to set this value

  const tabsToRender = useMemo(() => {
    return isProxy ? tabs : tabs.filter(({ type }) => !proxyTabTypes.includes(type));
  }, [isProxy]);

  const renderTabButtons = () => {
    return tabsToRender.map(({ label, type }) => (
      <Button
        key={type}
        label={label}
        type='small'
        className={tab === type ? 'bg-btn-secondary' : ''}
        onClick={() => setTab(type)}
      />
    ));
  };

  return (
    <Card className='bg-secondary mt-6 w-full min-h-[500px]'>
      <div className='flex gap-2'>
        {renderTabButtons()}
      </div>
      <div className='mt-5'>
        {tab === TabTypesEnum.General && <ContractGeneral />}
        {tab === TabTypesEnum.ReadProxy && <ReadProxy />}
        {tab === TabTypesEnum.WriteProxy && <WriteProxy />}
        {tab === TabTypesEnum.ReadContract && <ReadContract />}
        {tab === TabTypesEnum.WriteContract && <WriteContract />}
      </div>
    </Card>
  )
}

export default ContractDetail