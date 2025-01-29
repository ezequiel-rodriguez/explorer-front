import React, { useState } from 'react'
import ContractCode from './ContractCode'
import ContractABI from './ContractABI'
import ByteCode from './ByteCode'
import ListContent from '@/components/generals/ListContent'
import ListItem from '@/components/generals/ListItem'
import { CheckIcon } from '@/common/icons'
import { useAddressDataContext } from '@/context/AddressContext'
import Date from '@/components/ui/Date'
import ButtonGroup from '@/components/ui/ButtonGroup'

type ISubtab = 'code' | 'abi' | 'bytecode';

function ContractGeneral() {
  const { address, contractVerification: contract } = useAddressDataContext();
  const optimizer = contract?.request.settings.optimizer;
  const [subTab, setSubTab] = useState<ISubtab>('code');

  const btnGroup = [
    { label: 'Code', value: 'code' },
    { label: 'ABI', value: 'abi' },
    { label: 'Bytecode', value: 'bytecode' },
  ];

  return (
    <div>
      <div className='w-full mt-4'>
        <div className='flex items-center gap-1'><CheckIcon />Contract Source Code Verified (Exact Match)</div>
        <ListContent className='!p-0 flex !mb-0 mt-4'>
          <ListItem
            className='flex-1'
            title='Contract Name:'
            value={address?.name || contract?.request.name}
            type='simple'
          />
          <ListItem
            title='Verification Date:'
            value={<Date date={contract?.timestamp} />}
            type='simple'
          />
        </ListContent>
        <ListContent className='!p-0 flex !mb-0'>
          <ListItem
            className='flex-1'
            title='Optimization:'
            value={`${optimizer?.enabled} with ${optimizer?.runs} runs`}
            type='simple'
          />
          <ListItem
            title='Compiler Version:'
            value={contract?.request.version}
            type='simple'
          />
        </ListContent>
        <ListContent className='!p-0 flex w-1/2'>
          <ListItem
            title='EVM Version'
            value={contract?.request.settings.evmVersion}
            type='simple'
          />
        </ListContent>
      </div>
      <ButtonGroup
        className='mb-4'
        options={btnGroup}
        activeValue={subTab}
        onChange={(value) => setSubTab(value as ISubtab)}
      />
      { subTab === 'code' && <ContractCode />}
      { subTab === 'abi' && <ContractABI abi={JSON.stringify(contract?.abi, null, 2)} />}
      { subTab === 'bytecode' && <ByteCode />}
    </div>
  )
}

export default ContractGeneral
