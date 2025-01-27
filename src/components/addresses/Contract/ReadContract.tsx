import ListContent from '@/components/generals/ListContent'
import ListItem from '@/components/generals/ListItem'
import CIMAccordion from '@/components/ui/CIMAccordion'
import { useAddressDataContext } from '@/context/AddressContext'
import { ethers } from 'ethers'
import React from 'react'

function ReadContract() {
  const { address, contractVerification } = useAddressDataContext()

  if (!contractVerification) {
    return <div>Loading...</div>
  }

  const { abi } = contractVerification

  const constructor = abi.find(fragment => fragment.type === 'constructor')
  const fallback = abi.find(fragment => fragment.type === 'fallback')
  const receive = abi.find(fragment => fragment.type === 'receive')
  const error = abi.find(fragment => fragment.type === 'error')
  const events = abi.filter(fragment => fragment.type === 'event')
  const methods = abi.filter(fragment => fragment.type === 'function')
  const readMethods = methods.filter(fragment => fragment.stateMutability === 'view' || fragment.stateMutability === 'pure')
  const writeMethods = methods.filter(fragment => fragment.stateMutability === 'payable' || fragment.stateMutability === 'nonpayable')

  console.dir({ constructor, fallback, receive, error, events, methods, readMethods, writeMethods })
  
  return (
    <div>
      <div className='flex flex-col gap-2'>
        {readMethods.map((method, i) => {
          const index = i + 1
          const methodTitleProps = {
            index,
            methodName: method.name as string,
            selectorHash: "0x1234ABcD"// ethers.id(method) // TODO: check how to get the selector hash
          }

          return (
            // TODO: refactor Accordion style or create a different one
            <CIMAccordion key={index} title={<MethodTitle {...methodTitleProps} />} className='bg-secondary'>
              <div className='p-4'>
                <p>{method.name}</p>
              </div>
            </CIMAccordion>
          )
        })}
      </div>
    </div>
  )
}

const MethodTitle = ({
  index,
  methodName,
  selectorHash
}: {
  index: number
  methodName: string
  selectorHash: string
}): React.ReactNode => {
  return (
    <div className='flex gap-1 items-center'>
      <span className='text-sm'>{index}. {methodName}</span>
      <span className='text-sm text-[#b9b9b9]'>{`(${selectorHash})`}</span>
    </div>
  )
}

export default ReadContract
