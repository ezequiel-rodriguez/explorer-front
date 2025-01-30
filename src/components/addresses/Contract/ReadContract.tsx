import CIMAccordion from '@/components/ui/CIMAccordion'
import { useAddressDataContext } from '@/context/AddressContext'
import React, { useState } from 'react'
import MethodDataVisualizer, { InteractiveMethodDataVisualizer, RSKFunctionFragment } from './MethodDataVisualizer.util'
import { ethers } from 'ethers'

function ReadContract() {
  const { address, contractVerification } = useAddressDataContext()

  if (!contractVerification) {
    return <div>Loading...</div>
  }

  const { abi } = contractVerification as { abi: RSKFunctionFragment[] }

  // const constructor = abi.find(fragment => fragment.type === 'constructor')
  // const fallback = abi.find(fragment => fragment.type === 'fallback')
  // const receive = abi.find(fragment => fragment.type === 'receive')
  // const error = abi.find(fragment => fragment.type === 'error')
  // const events = abi.filter(fragment => fragment.type === 'event')
  const methods = abi.filter(fragment => fragment.type === 'function')
  const readMethods = methods.filter(fragment => fragment.stateMutability === 'view' || fragment.stateMutability === 'pure')
  // const writeMethods = methods.filter(fragment => fragment.stateMutability === 'payable' || fragment.stateMutability === 'nonpayable')
  // console.dir({ constructor, fallback, receive, error, events, methods, readMethods, writeMethods })

  const [interactiveMethods, setInteractiveMethods] = useState<InteractiveMethods>(getInteractiveMethods(readMethods));

  const handleInputChange = (selector: string, inputIndex: number, value: string) => {
    setInteractiveMethods(prevMethods => {
      const updatedMethods = { ...prevMethods };
      updatedMethods[selector].state.inputs[inputIndex] = value;
      return updatedMethods;
    });
  };

  return (
    <div>
      <div className='flex flex-col gap-2'>
        {Object.values(interactiveMethods).map((interactiveMethod, i) => {
          const { method, signatureData } = interactiveMethod
          const index = i + 1
          const methodTitleProps = {
            index,
            methodName: method.name,
            selectorHash: signatureData.selector
          }

          return (
            <CIMAccordion key={index} title={<MethodTitle {...methodTitleProps} />}>
              <div className='p-2'>
                <MethodDataVisualizer method={method}>
                  <InteractiveMethodDataVisualizer interactiveMethod={interactiveMethod} />
                </MethodDataVisualizer>
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
                      value={interactiveMethod.state.inputs[inputIndex]}
                      onChange={(e) => handleInputChange(interactiveMethod.signatureData.selector, inputIndex, e.target.value)}
                      />
                    </div>
                  )
                })}
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

type SignatureData = {
  name: string
  params: string[]
  signature: string
  selector: string
}

function getMethodSignatureData (method: RSKFunctionFragment): SignatureData {
  const name = method.name
  const params = method.inputs.map(input => {
    if (input.type === 'tuple') {
      return `(${input.components!.map(component => component.type).join(',')})`
    }

    return input.type
  })
  const signature = `${name}(${params.join(',')})`
  const selector = ethers.FunctionFragment.getSelector(name, params)

  return {
    name,
    params,
    signature,
    selector
  }
}

type MethodState = {
  inputs: string[];
  outputs: string[];
  message: {
    content: string;
    style: string;
  };
}

export type InteractiveMethod = {
  method: RSKFunctionFragment
  signatureData: SignatureData
  state: MethodState
}

type InteractiveMethods = {
  [selector: string]: InteractiveMethod
}

function getInteractiveMethods(methods: RSKFunctionFragment[]): InteractiveMethods {
  const interactiveMethods: InteractiveMethods = {}
  
  methods.forEach((method) => {
    try {
      const signatureData = getMethodSignatureData(method)

      interactiveMethods[signatureData.selector] = {
        method,
        signatureData,
        state: {
          inputs: method.inputs.map(_ => ''),
          outputs: method.outputs.map(_ => ''),
          message: {
            content: '',
            style: ''
          }
        }
      }
    } catch (error) {
      console.error("Error while creating interactive method. Skipping...")
    }
  })

  return interactiveMethods
}

export default ReadContract
