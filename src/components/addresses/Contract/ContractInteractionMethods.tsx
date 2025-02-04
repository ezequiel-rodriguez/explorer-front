import CIMAccordion from '@/components/ui/CIMAccordion'
import React, { useState } from 'react'
import MethodDataVisualizer, { InteractiveMethodDataVisualizer } from './MethodDataVisualizer.util'
import { ExtendedInput, InteractiveMethod, InteractiveMethodsDict, RSKFunctionFragment, getInteractiveMethods } from '@/common/utils/contractInteractions';
import { WalletConnection } from '@/components/web3/Web3Components';
import OutputIcon from '@/common/icons/OutputIcon';
import { useAccount } from 'wagmi';

type MethodType = 'read' | 'write'

interface ContractInteractionMethodsProps {
  methods: RSKFunctionFragment[]
  methodsType: MethodType
}

function ContractInteractionMethods({ methods, methodsType }: ContractInteractionMethodsProps) {
  const [interactiveMethods, setInteractiveMethods] = useState<InteractiveMethodsDict>(getInteractiveMethods(methods));
  const { isConnected } = useAccount()

  const handleInputChange = (selector: string, inputIndex: number, value: string) => {
    setInteractiveMethods(prevMethods => {
      const updatedMethods = { ...prevMethods };
      updatedMethods[selector].state.inputs[inputIndex] = value;
      return updatedMethods;
    });
  };

  const isBeingRequested = (interactiveMethod: InteractiveMethod) => {
    return interactiveMethod.state.isRequesting;
  }

  return (
    <div>
      {/* Wallet connection */}
      <WalletConnection />
      {/* Contract functions */}
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
              <div className="p-2 flex flex-col gap-2">
                {/* Debug */}
                {/* <MethodDataVisualizer method={method} /> */}
                {/* <InteractiveMethodDataVisualizer interactiveMethod={interactiveMethod} /> */}

                {/* Method Inputs */}
                <div className='flex flex-col gap-2'>
                  {method.inputs.map((input, inputIndex) => {
                    return (
                      <MethodInput
                        key={inputIndex}
                        input={input}
                        inputIndex={inputIndex}
                        value={interactiveMethod.state.inputs[inputIndex]}
                        onChange={(e) => handleInputChange(interactiveMethod.signatureData.selector, inputIndex, e.target.value)}
                      />
                    )
                  })}
                </div>
                {/* Method Action Button */}
                <div>
                  {methodsType === 'read' && (
                    <MethodActionButton
                      onClick={() => alert("Not implemented")}
                      disabled={isBeingRequested(interactiveMethod)}
                    >
                      Query
                    </MethodActionButton>
                  )}
                  {methodsType === 'write' && (
                    <div className='flex gap-3'>
                      <MethodActionButton
                        onClick={() => alert("Not implemented")}
                        disabled={!isConnected || isBeingRequested(interactiveMethod)}
                      >
                        Simulate
                      </MethodActionButton>
                      <MethodActionButton
                        onClick={() => alert("Not implemented")}
                        disabled={!isConnected || isBeingRequested(interactiveMethod)}
                      >
                        Write
                      </MethodActionButton>
                    </div>
                  )}
                </div>
                {/* Method Outputs */}
                <div className='flex flex-col gap-2'>
                  {interactiveMethod.state.outputs.map((output, outputIndex) => {
                    return (
                      <MethodOutput
                        key={outputIndex}
                        outputIndex={outputIndex}
                        value={output}
                        interactiveMethod={interactiveMethod}
                      />
                    )
                  })}
                </div>
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

interface MethodInputProps {
  input: ExtendedInput
  inputIndex: number
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function MethodInput ({ input, inputIndex, value, onChange }: MethodInputProps) {
  const inputName = input.name || `Input ${inputIndex + 1}`

  return (
    <div key={inputIndex} className='flex flex-col gap-1'>
      <label className='flex gap-1 text-sm'>
        <span className='text-white'>{inputName}</span>
        <span className='text-[#b9b9b9]'>({input.type})</span>
      </label>
      <input type="text"
        name={input.name}
        placeholder={`${inputName} (${input.type})`}
        className='bg-[#262626] p-2 border border-line rounded-md outline-none'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

interface MethodOutputProps {
  value: string
  outputIndex: number
  interactiveMethod: InteractiveMethod
}

function MethodOutput ({ outputIndex, value, interactiveMethod }: MethodOutputProps) {
  const outputType = interactiveMethod.method.outputs[outputIndex].type

  return (
    <div className='flex gap-1 items-center'>
      <OutputIcon />
      <div className='flex gap-1'>
        <span className='text-[#b9b9b9]'>{outputType}:</span>
        <span>{value}</span>
      </div>
    </div>
  )
}

interface MethodActionButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}

function MethodActionButton({ children, onClick, disabled }: MethodActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#FF71E1] text-black rounded-lg text-sm py-1 px-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >{children}</button>
  )
}

export default ContractInteractionMethods
