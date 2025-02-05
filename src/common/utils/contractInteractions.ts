import { ParamType, FunctionFragment, FragmentType, ethers, isAddress } from "ethers";

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
      content: string | React.JSX.Element;
      style: string;
    };
  }
}

export type InteractiveMethodsDict = {
  [signature: string]: InteractiveMethod
}

const formatTuple = (input: ExtendedInput) => `(${input.components!.map(component => component.type).join(',')})`

export function getMethodSignatureData (method: RSKFunctionFragment): SignatureData {
  const name = method.name
  const params = method.inputs.map(input => {
    const isTupleInput = input.type === 'tuple' && input.components

    // figure out how to handle tuple inputs for contract reads (5 mins)
    if (isTupleInput) {
      return formatTuple(input)
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
      console.log(error)
      console.error("Error while creating interactive method. Skipping...")
    }
  })

  return interactiveMethods
}

export const isBeingRequested = (interactiveMethod: InteractiveMethod) => {
  return interactiveMethod.state.isRequesting;
}

export const emptyString = (input: string) => input === '';

export const isArrayType = (type: string) => type.includes('[]');

export const validateAndFormatInputs = (interactiveMethod: InteractiveMethod) => {
  /* Input Validations */
  const { method, signatureData, state } = interactiveMethod;

  // All inputs required
  const totalInputsAmount = method.inputs.length;
  const emptyInputsAmount = state.inputs.filter(emptyString).length;
  const nonEmptyInputsAmount = totalInputsAmount - emptyInputsAmount;

  if (emptyInputsAmount > 0) {
    throw new Error(`Invalid number of parameters for "${signatureData.name}". Got ${nonEmptyInputsAmount} expected ${totalInputsAmount}!`);
  }

  return state.inputs.map((input, inputIndex) => {
      // Trim input
      input = input.trim();

      const inputType = method.inputs[inputIndex].type;
      console.log(`Parsing input ${inputIndex + 1} (type: ${inputType}) with value ${input}`);

      // Array types: validate format and parse
      if (isArrayType(inputType)) {
        const isProperlyFormattedArray = input.startsWith('[') && input.endsWith(']');
        if (!isProperlyFormattedArray) {
          throw new Error('Invalid array. Make sure it is formatted as an array: [item1, item2, ...]');
        }

        try {
          return JSON.parse(input);
        } catch (error: any) {
          throw new Error('Invalid array. Invalid JSON format provided. Try wrapping items in quotes where required (eg: hexadecimals like addresses, bytes, etc.)');
        }
      }

      // tuples
      if (inputType === 'tuple') {
        // validate format
        const isProperlyFormattedArray = input.startsWith('[') && input.endsWith(']');
        if (!isProperlyFormattedArray) {
          throw new Error('Invalid tuple. Make sure it is formatted as an array: [item1, item2, ...]');
        }

        // parse
        let tupleItems: any[];
        try {
          tupleItems = JSON.parse(input);
        } catch (error: any) {
          console.log(error);
          throw new Error('Invalid tuple. Invalid JSON format provided. Try wrapping items in quotes where required (eg: hexadecimals like addresses, bytes, etc.)');
        }

        // validate tuple length
        const tupleItemsAmount = tupleItems.length;
        const totalTupleInputsAmount = method.inputs[inputIndex].components!.length;
        if (tupleItemsAmount !== totalTupleInputsAmount) {
          throw new Error(`Invalid number of parameters for tuple "${signatureData.name}". Got ${tupleItemsAmount} expected ${totalTupleInputsAmount}!`);
        }

        // FUTURE: check tuple types. This would require a recursive validation (eg: tuple of tuples, tuple of arrays, array of tuples, etc.)
        // For now, prevent undefined or null items
        tupleItems.forEach((item: any) => {
          if (item === undefined || item === null) {
            throw new Error('Invalid tuple. Tuple items cannot be null or undefined.');
          }
        });

        return tupleItems;
      }
      
      // Strings: delegate validation
      if (inputType === 'string') {
        return input;
      }

      // Uints/ints: validate number
      if (inputType.includes('int')) {
        if (isNaN(Number(input))) {
          throw new Error('Invalid number');
        }

        return input;
      }

      // Addresses: validate format
      if (inputType === 'address') {
        if (!isAddress(input)) {
          throw new Error('Invalid address');
        }

        return input;
      }

      // Booleans: validate literals
      if (inputType === 'bool') {
        if (input === 'true') return true;
        if (input === 'false') return false;
        throw new Error('Invalid boolean');
      }

      // Bytes: validate format
      if (inputType.includes('bytes')) {
        if (!input.startsWith('0x')) {
          throw new Error('Invalid bytes value. Make sure it is formatted as a hex string and digits match expected size (Example: bytes1 -> 0x00, bytes2 -> 0x0000, etc.)');
        }

        return input;
      }

      console.log('Warning. Input validation not implemented for this type. Returning input as is.');
      console.log({ inputType, input });
      return input;
  });
}

// FUTURE: validate recursive outputs (eg: tuple of tuples, tuple of arrays, array of tuples, etc.)
export const parseOutputs = (outputs: any[]): string[] => {
  // Check for bigints and convert them to strings
  return outputs.map(output => {
    try {
      // simple outputs
      if (typeof output === 'bigint' || typeof output === 'number') {
        const bigInt = BigInt(output);
        return bigInt.toString();
      }

      // array outputs
      if (Array.isArray(output)) {
        const outputValues = output.map(o => {
          if (typeof o === 'bigint' || typeof o === 'number') {
            const bigInt = BigInt(o);
            return bigInt.toString();
          }
          return o;
        });

        return JSON.stringify(outputValues);
      }

      // object outputs (tuples)
      if (typeof output === 'object') {
        const outputValues = Object.values(output);

        for (const value of outputValues) {
          if (typeof value === 'bigint' || typeof value === 'number') {
            const bigInt = BigInt(value);
            outputValues[outputValues.indexOf(value)] = bigInt.toString();
          }
        }

        return JSON.stringify(outputValues);
      }

      // other cases
      return JSON.stringify(output);
    } catch(error) {
      console.log({
        msg: "Error parsing output",
        output,
        error
      });

      throw new Error('Error parsing output. Internal Error');
    }
  });
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