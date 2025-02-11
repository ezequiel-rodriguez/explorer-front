import {
  ParamType,
  FunctionFragment,
  FragmentType,
  ethers,
  isAddress,
} from 'ethers';

/* ==== Rootstock ABI fragments formatting ===== */

// Include internalType prop
export interface ExtendedInput extends ParamType {
  internalType?: string;
}

// Include "receive" fragment type
export type ExtendedFragmentType = FragmentType | 'receive';

// Rootstock Function Fragment
export interface RSKFunctionFragment
  extends Omit<
    FunctionFragment,
    'constant' | 'type' | 'gas' | 'payable' | 'selector' | 'format'
  > {
  inputs: ExtendedInput[];
  type: ExtendedFragmentType;
  constant?: boolean;
}

/* ============================================= */

export type SignatureData = {
  name: string;
  params: string[];
  signature: string;
  selector: string;
};

export type InteractiveMethod = {
  method: RSKFunctionFragment;
  signatureData: SignatureData;
  state: {
    inputs: string[];
    outputs: string[];
    isRequesting: boolean;
    message: {
      content: string | React.JSX.Element;
      style: string;
    };
  };
};

export type InteractiveMethodsDict = {
  [signature: string]: InteractiveMethod;
};

const formatTuple = (input: ExtendedInput) =>
  `(${input.components!.map((component) => component.type).join(',')})`;

// TODO: reconstruct signatures recursively
export function getMethodSignatureData(
  method: RSKFunctionFragment,
): SignatureData {
  const name = method.name;
  const params = method.inputs.map((input) => {
    const isTupleInput = input.type === 'tuple' && input.components;

    if (isTupleInput) {
      return formatTuple(input);
    }

    return input.type;
  });
  const signature = `${name}(${params.join(',')})`;
  const selector = ethers.FunctionFragment.getSelector(name, params);

  return {
    name,
    params,
    signature,
    selector,
  };
}

export function getInteractiveMethods(
  methods: RSKFunctionFragment[],
): InteractiveMethodsDict {
  const interactiveMethods: InteractiveMethodsDict = {};

  methods.forEach((method) => {
    try {
      const signatureData = getMethodSignatureData(method);

      interactiveMethods[signatureData.selector] = {
        method,
        signatureData,
        state: {
          inputs: method.inputs.map((_) => ''),
          outputs: method.outputs.map((_) => ''),
          isRequesting: false,
          message: {
            content: '',
            style: '',
          },
        },
      };
    } catch (error) {
      console.log(error);
      console.error('Error while creating interactive method. Skipping...');
    }
  });

  return interactiveMethods;
}

export const isBeingRequested = (interactiveMethod: InteractiveMethod) => {
  return interactiveMethod.state.isRequesting;
};

export const emptyString = (input: string) => input === '';

export const isArrayType = (type: string) => type.includes('[]');

// TODO: validate recursively
export const validateAndFormatInputs = (
  interactiveMethod: InteractiveMethod,
) => {
  /* Input Validations */
  const { method, signatureData, state } = interactiveMethod;

  // All inputs required
  const totalInputsAmount = method.inputs.length;
  const emptyInputsAmount = state.inputs.filter(emptyString).length;
  const nonEmptyInputsAmount = totalInputsAmount - emptyInputsAmount;

  if (emptyInputsAmount > 0) {
    throw new Error(
      `Invalid number of parameters for "${signatureData.name}". Got ${nonEmptyInputsAmount} expected ${totalInputsAmount}!`,
    );
  }

  return state.inputs.map((input, inputIndex) => {
    // Trim input
    input = input.trim();

    const inputType = method.inputs[inputIndex].type;

    // Array types: validate format and parse
    if (isArrayType(inputType)) {
      const isProperlyFormattedArray =
        input.startsWith('[') && input.endsWith(']');
      if (!isProperlyFormattedArray) {
        throw new Error(
          'Invalid array. Make sure it is formatted as an array: [item1, item2, ...]',
        );
      }

      try {
        return JSON.parse(input);
      } catch (error: any) {
        throw new Error(
          'Invalid array. Invalid JSON format provided. Try wrapping items in quotes where required (eg: hexadecimals like addresses, bytes, etc.)',
        );
      }
    }

    // tuples
    if (inputType === 'tuple') {
      // validate format
      const isProperlyFormattedArray =
        input.startsWith('[') && input.endsWith(']');
      if (!isProperlyFormattedArray) {
        throw new Error(
          'Invalid tuple. Make sure it is formatted as an array: [item1, item2, ...]',
        );
      }

      // parse
      let tupleItems: any[];
      try {
        tupleItems = JSON.parse(input);
      } catch (error: any) {
        throw new Error(
          'Invalid tuple. Invalid JSON format provided. Try wrapping items in quotes where required (eg: hexadecimals like addresses, bytes, etc.)',
        );
      }

      // validate tuple length
      const tupleItemsAmount = tupleItems.length;
      const totalTupleInputsAmount =
        method.inputs[inputIndex].components!.length;
      if (tupleItemsAmount !== totalTupleInputsAmount) {
        throw new Error(
          `Invalid number of parameters for tuple "${signatureData.name}". Got ${tupleItemsAmount} expected ${totalTupleInputsAmount}!`,
        );
      }

      // FUTURE: check tuple types. This would require a recursive validation (eg: tuple of tuples, tuple of arrays, array of tuples, etc.)
      // For now, prevent undefined or null items
      tupleItems.forEach((item: any) => {
        if (item === undefined || item === null) {
          throw new Error(
            'Invalid tuple. Tuple items cannot be null or undefined.',
          );
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
        throw new Error(
          'Invalid bytes value. Make sure it is formatted as a hex string and digits match expected size (Example: bytes1 -> 0x00, bytes2 -> 0x0000, etc.)',
        );
      }

      return input;
    }

    // Unknown input type: return as is
    return input;
  });
};

export const parseOutputs = (outputs: any[]): string[] => {
  const parseValue = (value: any): any => {
    if (typeof value === 'string') {
      // empty string values do not render at all. Make it explicit
      if (emptyString(value)) {
        return 'empty string ("")';
      }

      return value;
    }

    if (typeof value === 'boolean') {
      return String(value);
    }

    if (typeof value === 'bigint') {
      return BigInt(value).toString();
    }

    if (Array.isArray(value)) {
      return value.map(parseValue); // No stringify arrays
    }

    if (typeof value === 'object' && value !== null) {
      const parsedObject: { [key: string]: any } = {};
      for (const [key, val] of Object.entries(value)) {
        parsedObject[key] = parseValue(val);
      }

      // Stringify complex objects, but not arrays within them
      return parsedObject;
    }

    return value;
  };

  const parsedOutputs = outputs.map((output) => {
    try {
      const parsedOutput = parseValue(output);
      return typeof parsedOutput === 'object'
        ? JSON.stringify(parsedOutput, null, 2)
        : parsedOutput;
    } catch (error) {
      return 'Error parsing output. Internal Error';
    }
  });

  return parsedOutputs;
};

/* ===== RSK ABI Fragments utils ===== */

export enum RSKFragmentType {
  Constructor = 'constructor',
  Fallback = 'fallback',
  Receive = 'receive',
  Error = 'error',
  Event = 'event',
  Function = 'function',
}
export enum StateMutability {
  View = 'view',
  Pure = 'pure',
  Payable = 'payable',
  NonPayable = 'nonpayable',
  Constant = 'constant',
}

const isConstructor = (fragment: RSKFunctionFragment) =>
  fragment.type === RSKFragmentType.Constructor;
const isFallback = (fragment: RSKFunctionFragment) =>
  fragment.type === RSKFragmentType.Fallback;
const isReceive = (fragment: RSKFunctionFragment) =>
  fragment.type === RSKFragmentType.Receive;
const isError = (fragment: RSKFunctionFragment) =>
  fragment.type === RSKFragmentType.Error;
const isEvent = (fragment: RSKFunctionFragment) =>
  fragment.type === RSKFragmentType.Event;
const isMethod = (fragment: RSKFunctionFragment) =>
  fragment.type === RSKFragmentType.Function;
const isReadMethod = (fragment: RSKFunctionFragment) =>
  isMethod(fragment) &&
  (fragment.stateMutability === StateMutability.View ||
    fragment.stateMutability === StateMutability.Pure);
const isWriteMethod = (fragment: RSKFunctionFragment) =>
  isMethod(fragment) &&
  (fragment.stateMutability === StateMutability.Payable ||
    fragment.stateMutability === StateMutability.NonPayable);

const getConstructor = (abi: RSKFunctionFragment[]) => abi.find(isConstructor);
const getFallback = (abi: RSKFunctionFragment[]) => abi.find(isFallback);
const getReceive = (abi: RSKFunctionFragment[]) => abi.find(isReceive);
const getErrors = (abi: RSKFunctionFragment[]) => abi.filter(isError);
const getEvents = (abi: RSKFunctionFragment[]) => abi.filter(isEvent);
const getMethods = (abi: RSKFunctionFragment[]) => abi.filter(isMethod);
const getReadMethods = (methods: RSKFunctionFragment[]) =>
  methods.filter(isReadMethod);
const getWriteMethods = (methods: RSKFunctionFragment[]) =>
  methods.filter(isWriteMethod);

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
  getMethodSignatureData,
};
