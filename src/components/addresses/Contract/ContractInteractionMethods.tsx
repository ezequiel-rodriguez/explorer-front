import CIMAccordion from '@/components/ui/CIMAccordion';
import React, { useState } from 'react';
import MethodDataVisualizer, {
  InteractiveMethodDataVisualizer,
} from './MethodDataVisualizer.util';
import {
  InteractiveMethod,
  InteractiveMethodsDict,
  RSKFunctionFragment,
  getInteractiveMethods,
  isBeingRequested,
  parseOutputs,
  validateAndFormatInputs,
} from '@/common/utils/contractInteractions';
import { WalletConnection } from '@/components/web3/Web3Components';
import OutputIcon from '@/common/icons/OutputIcon';
import { useAccount, useDisconnect } from 'wagmi';
import { readContract, writeContract, simulateContract } from '@wagmi/core';
import { wagmiConfig } from '@/context/Web3Provider';
import { CHAIN_ID } from '@/common/constants';
import Link from 'next/link';

type MethodType = 'read' | 'write';

interface ContractInteractionMethodsProps {
  contractAddress: string;
  methods: RSKFunctionFragment[];
  methodsType: MethodType;
  unverifiedImplementationData: {
    show: boolean;
    implementationAddress: string;
  };
}

function ContractInteractionMethods({
  contractAddress,
  methods,
  methodsType,
  unverifiedImplementationData,
}: ContractInteractionMethodsProps) {
  if (unverifiedImplementationData.show) {
    const implementationAddress =
      unverifiedImplementationData.implementationAddress;
    return (
      <div className="w-full rounded-xl flex flex-col justify-center text-[#b9b9b9]">
        <h2 className="text-xl font-bold mb-4">
          [ERC1967 Proxy Contract Detected]
        </h2>
        <p className="text-sm">
          This contract is a proxy and cannot be interacted with directly.
        </p>
        <p className="text-sm">
          <span>Implementation address: </span>
          <Link href={`/addresses/${implementationAddress}`} target="_blank">
            <span className="text-white">{implementationAddress}</span>
          </Link>
        </p>
        <p className="text-sm">
          Please verify the implementation contract first to enable
          interactions.
        </p>
        {/* TODO: verifications section in rootstock docs? */}
        {/* <p className="text-sm mt-4">For more information, refer to the <a href="#" className="underline text-blue-300">documentation</a>.</p> */}
      </div>
    );
  }

  const [interactiveMethods, setInteractiveMethods] =
    useState<InteractiveMethodsDict>(getInteractiveMethods(methods));
  const { address, isConnected } = useAccount();
  const [expandAll, setExpandAll] = useState(false);
  const { disconnect: disconnectWallet } = useDisconnect();

  const toggleExpansion = () => {
    setExpandAll(!expandAll);
  };

  const resetComponent = () => {
    setInteractiveMethods(getInteractiveMethods(methods));
    setExpandAll(false);
    disconnectWallet();
  };

  const handleInputChange = (
    selector: string,
    inputIndex: number,
    value: string,
  ) => {
    setInteractiveMethods((prevMethods) => {
      const updatedMethods = { ...prevMethods };
      updatedMethods[selector].state.inputs[inputIndex] = value;
      return updatedMethods;
    });
  };

  const handleReadClick = async (interactiveMethod: InteractiveMethod) => {
    try {
      const { method, signatureData } = interactiveMethod;

      setInteractiveMethods((prevMethods) => {
        // Set call message
        const updatedMethods = { ...prevMethods };
        updatedMethods[signatureData.selector].state.message = {
          content: 'Calling contract...',
          style: 'text-white',
        };

        // Set requesting state
        updatedMethods[signatureData.selector].state.isRequesting = true;
        return updatedMethods;
      });

      // Contract call
      const result: any = await readContract(wagmiConfig, {
        // method to read
        abi: [method],
        // method name or signature.
        // FUTURE: Check border case: overloads. Use a verified test contract with overloads for this
        functionName: signatureData.name,
        // method inputs
        args: validateAndFormatInputs(interactiveMethod),
        // contract address
        address: contractAddress as unknown as `0x${string}`,
        // account (in case of connected wallet)
        account: isConnected ? address : undefined,
        // chain id
        chainId: CHAIN_ID,
      });

      let outputs: any[];

      // Array type outputs
      if (method.outputs.length === 1) {
        // method has only one output. Wrap it in an array
        outputs = [result];
      } else {
        // method has multiple outputs. Use the result as is
        outputs = result;
      }

      // Contract Result display
      setInteractiveMethods((prevMethods) => {
        const updatedMethods = { ...prevMethods };

        // Update outputs
        updatedMethods[signatureData.selector].state.outputs =
          parseOutputs(outputs);

        // Reset message
        updatedMethods[signatureData.selector].state.message = {
          content: '',
          style: '',
        };

        return updatedMethods;
      });
    } catch (error: any) {
      console.error('Error reading contract');
      console.error(error);

      setInteractiveMethods((prevMethods) => {
        const { signatureData } = interactiveMethod;
        const updatedMethods = { ...prevMethods };

        updatedMethods[signatureData.selector].state.message = {
          content: (<ErrorDisplay error={error} />) as React.JSX.Element,
          style: 'text-red-500',
        };
        return updatedMethods;
      });
    }

    // Reset requesting state
    setInteractiveMethods((prevMethods) => {
      const updatedMethods = { ...prevMethods };
      updatedMethods[
        interactiveMethod.signatureData.selector
      ].state.isRequesting = false;
      return updatedMethods;
    });
  };

  const handleWriteClick = async (
    interactiveMethod: InteractiveMethod,
    action: 'write' | 'simulate',
  ) => {
    try {
      const { method, signatureData } = interactiveMethod;

      setInteractiveMethods((prevMethods) => {
        // Set write message
        const updatedMethods = { ...prevMethods };
        updatedMethods[signatureData.selector].state.message = {
          content:
            action === 'write'
              ? 'Writing to contract...'
              : 'Simulating contract...',
          style: 'text-white',
        };

        // Set requesting state
        updatedMethods[signatureData.selector].state.isRequesting = true;
        return updatedMethods;
      });

      const payload = {
        // method to write
        abi: [method],
        // method name or signature.
        // FUTURE: Check border case: overloads. Use a verified test contract with overloads for this
        functionName: signatureData.name,
        // method inputs
        args: validateAndFormatInputs(interactiveMethod),
        // contract address
        address: contractAddress as unknown as `0x${string}`,
        // account (in case of connected wallet)
        account: isConnected ? address : undefined,
        // chain id
        chainId: CHAIN_ID,
      };

      // Contract Write
      if (action === 'write') {
        const { request } = await simulateContract(wagmiConfig, payload);
        const hash: any = await writeContract(wagmiConfig, request);
        console.log(`Transaction hash: ${hash}`);

        // set hash
        setInteractiveMethods((prevMethods) => {
          const updatedMethods = { ...prevMethods };
          updatedMethods[signatureData.selector].state.message = {
            content: <TransactionHashDisplay hash={hash} />,
            style: 'text-green-500',
          };
          return updatedMethods;
        });
      } else {
        // Contract simulation
        const { result: simulationResult } = await simulateContract(
          wagmiConfig,
          payload,
        );

        let outputs: any[];

        // Array type outputs
        if (method.outputs.length === 1) {
          // method has only one output. Wrap it in an array
          outputs = [simulationResult];
        } else {
          // method has multiple outputs. Use the result as is
          outputs = simulationResult;
        }

        // Contract Result display
        setInteractiveMethods((prevMethods) => {
          const updatedMethods = { ...prevMethods };

          // Update outputs
          updatedMethods[signatureData.selector].state.outputs =
            parseOutputs(outputs);

          // Reset message
          updatedMethods[signatureData.selector].state.message = {
            content: '',
            style: '',
          };

          return updatedMethods;
        });
      }
    } catch (error: any) {
      console.error('Error writing contract');
      console.error(error);

      setInteractiveMethods((prevMethods) => {
        const { signatureData } = interactiveMethod;
        const updatedMethods = { ...prevMethods };

        updatedMethods[signatureData.selector].state.message = {
          content: (<ErrorDisplay error={error} />) as React.JSX.Element,
          style: 'text-red-500',
        };
        return updatedMethods;
      });
    }

    // Reset requesting state
    setInteractiveMethods((prevMethods) => {
      const updatedMethods = { ...prevMethods };
      updatedMethods[
        interactiveMethod.signatureData.selector
      ].state.isRequesting = false;
      return updatedMethods;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {/* Wallet connection */}
          <WalletConnection />
          {/* Wallet connected required for write methods message */}
          {methodsType === 'write' && !isConnected && (
            <div className="h-fit w-fit bg-[#AA2F2F96] px-1 rounded-md flex justify-center items-center">
              <p className="text-sm text-[#F2CBCB] rounded-md">
                Wallet must be connected to call functions.
              </p>
            </div>
          )}
        </div>
        {/* General control buttons */}
        <div className="flex gap-2">
          <button
            onClick={toggleExpansion}
            className="text-[#FF71E1] hover:text-[#FF71E1cc] text-xs bg-transparent hover:underline"
          >
            {expandAll ? '[Collapse all]' : '[Expand all]'}
          </button>
          <button
            onClick={resetComponent}
            className="text-[#FF71E1] hover:text-[#FF71E1cc] text-xs bg-transparent hover:underline"
          >
            [Reset]
          </button>
        </div>
      </div>
      <div className="flex gap-1 text-sm">
        <span className="text-white-400">Interacting with contract</span>
        <Link
          href={`/addresses/${contractAddress}?tab=contract`}
          target="_blank"
        >
          <span className="text-white-400 hover:underline hover:text-white-100">
            {contractAddress}
          </span>
        </Link>
      </div>
      {Object.values(interactiveMethods).length === 0 && (
        <div className="text-white mt-4">
          This contract has no methods to interact with.
        </div>
      )}
      {/* Contract methods */}
      {Object.values(interactiveMethods).length > 0 && (
        <div className="flex flex-col gap-2">
          {Object.values(interactiveMethods).map((interactiveMethod, i) => {
            const { method, signatureData } = interactiveMethod;
            const index = i + 1;
            const methodTitleProps = {
              index,
              methodName: method.name,
              selectorHash: signatureData.selector,
            };

            return (
              <CIMAccordion
                key={index}
                title={<MethodTitle {...methodTitleProps} />}
                isOpen={expandAll}
              >
                <div className="p-2 flex flex-col gap-2">
                  {/* Debug */}
                  {/* <MethodDataVisualizer method={method} /> */}
                  {/* <InteractiveMethodDataVisualizer interactiveMethod={interactiveMethod} /> */}

                  {/* Method Inputs */}
                  {method.inputs.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {method.inputs.map((input, inputIndex) => {
                        return (
                          <MethodInput
                            key={inputIndex}
                            inputIndex={inputIndex}
                            interactiveMethod={interactiveMethod}
                            onChange={(e) =>
                              handleInputChange(
                                interactiveMethod.signatureData.selector,
                                inputIndex,
                                e.target.value,
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  )}
                  {/* Method Action Button */}
                  {methodsType === 'read' && (
                    <div>
                      <MethodActionButton
                        onClick={() => handleReadClick(interactiveMethod)}
                        disabled={isBeingRequested(interactiveMethod)}
                      >
                        Query
                      </MethodActionButton>
                    </div>
                  )}
                  {methodsType === 'write' && (
                    <div className="flex gap-3">
                      <MethodActionButton
                        onClick={() =>
                          handleWriteClick(interactiveMethod, 'simulate')
                        }
                        disabled={
                          !isConnected || isBeingRequested(interactiveMethod)
                        }
                      >
                        Simulate
                      </MethodActionButton>
                      <MethodActionButton
                        onClick={() =>
                          handleWriteClick(interactiveMethod, 'write')
                        }
                        disabled={
                          !isConnected || isBeingRequested(interactiveMethod)
                        }
                      >
                        Write
                      </MethodActionButton>
                    </div>
                  )}
                  {/* Method Outputs */}
                  {method.outputs.length === 0 && (
                    <div className="text-sm text-[#b9b9b9]">
                      (this method has no outputs)
                    </div>
                  )}
                  {method.outputs.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {interactiveMethod.state.outputs.map(
                        (output, outputIndex) => {
                          return (
                            <MethodOutput
                              key={outputIndex}
                              outputIndex={outputIndex}
                              value={output}
                              interactiveMethod={interactiveMethod}
                            />
                          );
                        },
                      )}
                    </div>
                  )}
                  {/* Message */}
                  {interactiveMethod.state.message.content && (
                    <div
                      className={`text-sm ${interactiveMethod.state.message.style}`}
                    >
                      {interactiveMethod.state.message.content}
                    </div>
                  )}
                </div>
              </CIMAccordion>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface MethodTitleProps {
  index: number;
  methodName: string;
  selectorHash: string;
}

function MethodTitle({ index, methodName, selectorHash }: MethodTitleProps) {
  return (
    <div className="flex gap-1 items-center">
      <span className="text-sm">
        {index}. {methodName}
      </span>
      <span className="text-sm text-[#b9b9b9]">{`(${selectorHash})`}</span>
    </div>
  );
}

interface MethodInputProps {
  inputIndex: number;
  interactiveMethod: InteractiveMethod;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function MethodInput({
  inputIndex,
  interactiveMethod,
  onChange,
}: MethodInputProps) {
  const { signatureData } = interactiveMethod;
  const input = interactiveMethod.method.inputs[inputIndex];
  const inputName = input.name || `Input ${inputIndex + 1}`;
  const isTuple = input.type === 'tuple';
  const inputType = isTuple
    ? `tuple${signatureData.params[inputIndex]}`
    : `${input.type}`;

  return (
    <div key={inputIndex} className="flex flex-col gap-2">
      <label className="flex gap-1 text-sm">
        <span className="text-white">{inputName}</span>
        <span className="text-[#b9b9b9]">({inputType})</span>
      </label>
      <input
        type="text"
        name={input.name}
        placeholder={`${inputName} (${inputType})`}
        className="bg-[#262626] p-2 border border-line rounded-md outline-none"
        value={interactiveMethod.state.inputs[inputIndex]}
        onChange={onChange}
      />
    </div>
  );
}

interface MethodOutputProps {
  value: string;
  outputIndex: number;
  interactiveMethod: InteractiveMethod;
}

function MethodOutput({
  outputIndex,
  value,
  interactiveMethod,
}: MethodOutputProps) {
  const isTuple =
    interactiveMethod.method.outputs[outputIndex].type === 'tuple';
  let outputType: string;

  if (isTuple) {
    outputType = `tuple(${interactiveMethod.method.outputs[outputIndex].components!.map((c) => c.type).join(',')})`;
  } else {
    outputType = interactiveMethod.method.outputs[outputIndex].type;
  }

  return (
    <div className="flex flex-wrap items-center gap-2lg">
      <div className="flex items-center gap-2">
        <OutputIcon />
        <span className="text-[#b9b9b9] font-semibold">{outputType}:</span>
      </div>
      <div className="flex items-center overflow-x-auto max-w-full">
        <span className="whitespace-nowrap p-1 rounded-md">{value}</span>
      </div>
    </div>
  );
}

interface MethodActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

function MethodActionButton({
  children,
  onClick,
  disabled,
}: MethodActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#FF71E1] text-black rounded-lg text-sm py-1 px-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface ErrorDisplayProps {
  error: Error;
}

function ErrorDisplay({ error }: ErrorDisplayProps) {
  return <span className="text-xs">Error: {error.message}</span>;
}

interface TransactionHashDisplayProps {
  hash: string;
}

function TransactionHashDisplay({ hash }: TransactionHashDisplayProps) {
  return (
    <div className="flex gap-1 text-sm">
      <span className="text-white-100">Transaction hash:</span>
      <Link href={`/txs/${hash}`} target="_blank">
        <span className="text-white-400 hover:underline hover:text-white-100">
          {hash}
        </span>
      </Link>
    </div>
  );
}

export default ContractInteractionMethods;
