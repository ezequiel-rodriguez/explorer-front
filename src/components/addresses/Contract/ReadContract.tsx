import CIMAccordion from '@/components/ui/CIMAccordion'
import { useAddressDataContext } from '@/context/AddressContext'
import React, { useEffect, useState } from 'react'
import MethodDataVisualizer, { RSKFunctionFragment } from './MethodDataVisualizer.util'
// import { v4 as uuidv4 } from 'uuid';

function ReadContract() {
  const { address, contractVerification } = useAddressDataContext()

  if (!contractVerification) {
    return <div>Loading...</div>
  }

  const { abi } = contractVerification as { abi: RSKFunctionFragment[] }

  const constructor = abi.find(fragment => fragment.type === 'constructor')
  const fallback = abi.find(fragment => fragment.type === 'fallback')
  const receive = abi.find(fragment => fragment.type === 'receive')
  const error = abi.find(fragment => fragment.type === 'error')
  const events = abi.filter(fragment => fragment.type === 'event')
  const methods = abi.filter(fragment => fragment.type === 'function')
  const readMethods = methods.filter(fragment => fragment.stateMutability === 'view' || fragment.stateMutability === 'pure')
  const writeMethods = methods.filter(fragment => fragment.stateMutability === 'payable' || fragment.stateMutability === 'nonpayable')

  console.dir({
    constructor,
    fallback,
    receive,
    error,
    events,
    methods,
    readMethods,
    writeMethods
  })

  const [inputValues, setInputValues] = useState<{
    [key: string]: any,
  }>({});

  useEffect(() => {
    const initialInputValues: { [methodId: string]: { [inputName: string]: string } } = {};
    readMethods.forEach((method: any) => {
      // const methodId = `${method.name}-${uuidv4()}`;
      const methodId = method.name // methods may have same name? (overload) Check how to globally identify a method. Maybe reconstruct signature. This could later be used for retrieving the selector
      initialInputValues[methodId] = {};
      method.inputs.forEach((input: any) => {
        initialInputValues[methodId][input.name] = '';
        initialInputValues[methodId].sourceMethod = method;
      });
    });
    setInputValues(initialInputValues);
  }, []);
  
  const handleInputChange = (methodId: string, inputName: string, value: string) => {
    setInputValues(prevState => ({
      ...prevState,
      [methodId]: {
        ...prevState[methodId],
        [inputName]: value
      }
    }));
  };

  return (
    <div>
      <div className='flex flex-col gap-2'>
        {readMethods.map((method, i) => {
          const index = i + 1
          const methodTitleProps = {
            index,
            methodName: method.name as string,
            selectorHash: "0x1234ABcD" // TODO: Figure out how to get the selector
          }

          return (
            <CIMAccordion key={index} title={<MethodTitle {...methodTitleProps} />}>
              <div className='p-2'>
                <MethodDataVisualizer method={method} />
              </div>
              <div>
                {method.inputs.map((input, inputIndex) => {
                  const inputName = input.name || `Input ${inputIndex + 1}`
                  return (
                    <div key={inputIndex} className='p-2 flex flex-col gap-1'>
                      <label className='flex gap-1 text-sm'>
                        <span className='text-white'>{inputName}</span>
                        <span className='text-[#b9b9b9]'>({input.type})</span>
                      </label>
                      <input type="text"
                      name={input.name}
                      placeholder={`${inputName} (${input.type})`}
                      className='bg-[#262626] p-2 border border-line rounded-md outline-none'
                      value={inputValues[method.name]?.[input.name] || ''}
                      onChange={(e) => handleInputChange(method.name, input.name, e.target.value)}/>
                    </div>
                  )
                })}
              </div>
              <div className='border-red-500'>
                <button className='p-4' onClick={() => console.log({ methods: inputValues })}>Show methods state</button>
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
