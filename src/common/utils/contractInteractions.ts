import { ParamType, FunctionFragment, FragmentType, ethers } from "ethers";

/* ==== Rootstock ABI fragments formatting ===== */

// Include internalType prop
export interface ExtendedInput extends ParamType {
  internalType?: string;
}

// Include "receive" fragment type
type ExtendedFragmentType = FragmentType | 'receive';

// Rootstock Function Fragment
export interface RSKFunctionFragment extends Omit<FunctionFragment, 'type'> {
  inputs: ExtendedInput[];
  type: ExtendedFragmentType;
}

/* ============================================= */

export type SignatureData = {
  name: string
  params: string[]
  signature: string
  selector: string
}

export type InteractiveMethod = {
  method: RSKFunctionFragment
  signatureData: SignatureData
  state: {
    inputs: string[];
    outputs: string[];
    isRequesting: boolean;
    message: {
      content: string;
      style: string;
    };
  }
}

export type InteractiveMethodsDict = {
  [signature: string]: InteractiveMethod
}

export function getMethodSignatureData (method: RSKFunctionFragment): SignatureData {
  const name = method.name
  const params = method.inputs.map(input => {
    const isTupleInput = input.type === 'tuple' && input.components

    if (isTupleInput) {
      return `(${input.components.map(component => component.type).join(',')})`
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

export function getInteractiveMethods(methods: RSKFunctionFragment[]): InteractiveMethodsDict {
  const interactiveMethods: InteractiveMethodsDict = {}
  
  methods.forEach((method) => {
    try {
      const signatureData = getMethodSignatureData(method)

      interactiveMethods[signatureData.selector] = {
        method,
        signatureData,
        state: {
          inputs: method.inputs.map(_ => ''),
          outputs: method.outputs.map(_ => ''),
          isRequesting: false,
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

/* ===== RSK ABI Fragments utils ===== */

export enum RSKFragmentType {
  Constructor = 'constructor',
  Fallback = 'fallback',
  Receive = 'receive',
  Error = 'error',
  Event = 'event',
  Function = 'function'
}

export enum StateMutability {
  View = 'view',
  Pure = 'pure',
  Payable = 'payable',
  NonPayable = 'nonpayable',
  Constant = 'constant'
}

const isConstructor = (fragment: RSKFunctionFragment) => fragment.type === RSKFragmentType.Constructor
const isFallback = (fragment: RSKFunctionFragment) => fragment.type === RSKFragmentType.Fallback
const isReceive = (fragment: RSKFunctionFragment) => fragment.type === RSKFragmentType.Receive
const isError = (fragment: RSKFunctionFragment) => fragment.type === RSKFragmentType.Error
const isEvent = (fragment: RSKFunctionFragment) => fragment.type === RSKFragmentType.Event
const isMethod = (fragment: RSKFunctionFragment) => fragment.type === RSKFragmentType.Function
const isReadMethod = (fragment: RSKFunctionFragment) => isMethod(fragment)
  && (fragment.stateMutability === StateMutability.View || fragment.stateMutability === StateMutability.Pure)
const isWriteMethod = (fragment: RSKFunctionFragment) => isMethod(fragment)
  && (fragment.stateMutability === StateMutability.Payable || fragment.stateMutability === StateMutability.NonPayable)

const getConstructor = (abi: RSKFunctionFragment[]) => abi.find(isConstructor)
const getFallback = (abi: RSKFunctionFragment[]) => abi.find(isFallback)
const getReceive = (abi: RSKFunctionFragment[]) => abi.find(isReceive)
const getErrors = (abi: RSKFunctionFragment[]) => abi.filter(isError)
const getEvents = (abi: RSKFunctionFragment[]) => abi.filter(isEvent)
const getMethods = (abi: RSKFunctionFragment[]) => abi.filter(isMethod)
const getReadMethods = (methods: RSKFunctionFragment[]) => methods.filter(isReadMethod)
const getWriteMethods = (methods: RSKFunctionFragment[]) => methods.filter(isWriteMethod)

export const rskFragmentsUtils = {
  isConstructor,
  isFallback,
  isReceive,
  isError,
  isEvent,
  isMethod,
  isReadMethod,
  isWriteMethod,
  getConstructor,
  getFallback,
  getReceive,
  getErrors,
  getEvents,
  getMethods,
  getReadMethods,
  getWriteMethods,
  getMethodSignatureData
}