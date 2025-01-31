import CIMAccordion from '@/components/ui/CIMAccordion'
import React, { useState } from 'react'
import MethodDataVisualizer, { InteractiveMethodDataVisualizer } from './MethodDataVisualizer.util'
import { InteractiveMethodsDict, RSKFunctionFragment, getInteractiveMethods } from '@/common/utils/contractInteractions';

function ContractInteractionMethods({ methods }: { methods: RSKFunctionFragment[] }) {
  const [interactiveMethods, setInteractiveMethods] = useState<InteractiveMethodsDict>(getInteractiveMethods(methods));

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

export default ContractInteractionMethods
