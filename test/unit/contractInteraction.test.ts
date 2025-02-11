import {
  ExtendedInput,
  InteractiveMethod,
  RSKFunctionFragment,
  getInteractiveMethods,
  getMethodSignatureData,
  parseOutputs,
  // isProxyContract,
  validateAndFormatInputs,
} from '@/common/utils/contractInteractions';
import { HeroV4_FUNCTION_FRAGMENTS_ABI } from './testsAbi';
import { ethers } from 'ethers';
import crypto from 'crypto';

const TESTS_ABI = HeroV4_FUNCTION_FRAGMENTS_ABI as RSKFunctionFragment[];

const randomAddress = () => {
  const privateKey = `0x${crypto.randomBytes(32).toString('hex')}`;
  const wallet = new ethers.Wallet(privateKey);

  return wallet.address;
};

function createInteractiveMethod(methodName: string): InteractiveMethod {
  const method = TESTS_ABI.find((m) => m.name === methodName)!;

  return {
    method,
    signatureData: getMethodSignatureData(method!),
    state: {
      inputs: method.inputs.map((_) => ''),
      isRequesting: false,
      message: {
        content: '',
        style: '',
      },
      outputs: method.outputs.map((_) => ''),
    },
  };
}

describe('contractInteraction utilities', () => {
  describe('getMethodSignatureData', () => {
    it('should return the signature data of a method', () => {
      const methods = [
        TESTS_ABI.find((m) => m.name === 'acceptAddresses')!,
        TESTS_ABI.find((m) => m.name === 'acceptBytes')!,
        TESTS_ABI.find((m) => m.name === 'acceptTuple')!,
      ];

      methods.forEach((method) => {
        expect(() => getMethodSignatureData(method)).not.toThrow();

        const signatureData = getMethodSignatureData(method);
        expect(signatureData).toHaveProperty('name');
        expect(signatureData).toHaveProperty('params');
        expect(signatureData).toHaveProperty('signature');
        expect(signatureData).toHaveProperty('selector');
      });
    });
  });

  describe('getInteractiveMethods', () => {
    it('should return a valid interactive methods dictionary', () => {
      const methodsDict = getInteractiveMethods(TESTS_ABI);
      expect(Object.keys(methodsDict).length).toEqual(TESTS_ABI.length);

      Object.values(methodsDict).forEach((method) => {
        expect(method).toHaveProperty('method');
        expect(method).toHaveProperty('signatureData');
        expect(method).toHaveProperty('state');
      });
    });
  });

  describe('validateAndFormatInputs', () => {
    it('[all methods with 0 inputs] should validate properly', () => {
      const interactiveMethod: InteractiveMethod =
        createInteractiveMethod('getHeroStats');
      interactiveMethod.state.inputs = [];

      expect(validateAndFormatInputs(interactiveMethod)).toEqual([]);
    });

    it('[all methods] should trim inputs before validating', () => {
      const interactiveMethod: InteractiveMethod =
        createInteractiveMethod('acceptUints');
      interactiveMethod.state.inputs = [' 1 ', '  2  ', ' 3   ', '4    '];

      expect(validateAndFormatInputs(interactiveMethod)).toEqual([
        '1',
        '2',
        '3',
        '4',
      ]);
    });

    it('[all methods with 1+ inputs] should throw if any input is empty', () => {
      const interactiveMethod: InteractiveMethod =
        createInteractiveMethod('acceptUints');
      interactiveMethod.state.inputs = ['1', ''];

      expect(() => validateAndFormatInputs(interactiveMethod)).toThrow(
        /Invalid number of parameters/,
      );
    });

    it('[valid inputs] should validate successfully', () => {
      const address1 = randomAddress();
      const address2 = randomAddress();
      const interactiveMethods = [
        {
          name: 'acceptUints',
          inputs: ['1', '2', '3', '4'], // uints/ints
          expected: ['1', '2', '3', '4'],
        },
        {
          name: 'acceptBytes',
          inputs: [
            '0x1',
            '0x0003',
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          ], // bytes
          expected: [
            '0x1',
            '0x0003',
            '0x0000000000000000000000000000000000000000000000000000000000000001',
          ],
        },
        {
          name: 'getApprenticesByCategoryBool',
          inputs: ['true'], // booleans
          expected: [true],
        },
        {
          name: 'getApprenticesByCategoryBool',
          inputs: ['false'], // booleans
          expected: [false],
        },
        {
          name: 'sendViaCall',
          inputs: [address1, '200'], // addresses, uints
          expected: [address1, '200'],
        },
        {
          name: 'acceptTuple',
          inputs: [`[1,2,"${address1}",true]`], // tuple: numbers, addresses, booleans
          expected: [[1, 2, address1, true]],
        },
        {
          name: 'acceptAddresses',
          inputs: [`["${address1}","${address2}"]`], // array: addresses
          expected: [[address1, address2]],
        },
        {
          name: 'addComplexData',
          inputs: [
            '1',
            `["${address1}", "${address2}"]`,
            '[1,2,3,4,5]',
            '["Weird","Flex"]',
          ],
          expected: [
            '1',
            [address1, address2],
            [1, 2, 3, 4, 5],
            ['Weird', 'Flex'],
          ],
        },
      ];

      interactiveMethods.forEach(({ name, inputs, expected }) => {
        const interactiveMethod = createInteractiveMethod(name);
        interactiveMethod.state.inputs = inputs;

        expect(Array.isArray(validateAndFormatInputs(interactiveMethod))).toBe(
          true,
        );
        expect(validateAndFormatInputs(interactiveMethod)).toEqual(expected);
      });
    });

    it('[invalid inputs] should throw', () => {
      const methods = [
        {
          name: 'acceptAddresses',
          inputs: ['0x1234'], // should be a valid array
          expectedErrorRegex: /Invalid array/,
        },
        {
          name: 'acceptTuple',
          inputs: ['1', '2', '0x1234', '1'], // should be a valid tuple (last input should be a boolean)
          expectedErrorRegex: /Invalid tuple/,
        },
        {
          name: 'acceptTuple',
          inputs: ['1', '2', '0x1234', 'true'], // should have a valid address
          expectedErrorRegex: /Invalid tuple/,
        },
        {
          name: 'acceptUints',
          inputs: ['1', '2', '3', 'true'], // should be all numbers
          expectedErrorRegex: /Invalid number/,
        },
        {
          name: 'sendViaCall',
          inputs: ['0xinvalidAddress', 'Chad'], // 2nd input should be a valid number
          expectedErrorRegex: /Invalid address/,
        },
        {
          name: 'sendViaCall',
          inputs: ['0xinvalidAddress', '200'], // should have a valid address
          expectedErrorRegex: /Invalid address/,
        },
        {
          name: 'getApprenticesByCategoryBool',
          inputs: ['1'], // should be a valid boolean
          expectedErrorRegex: /Invalid boolean/,
        },
        {
          name: 'acceptBytes',
          inputs: ['0x1', '0x0003', '4'], // should be all valid bytes
          expectedErrorRegex: /Invalid bytes value/,
        },
      ];

      methods.forEach(({ name, inputs, expectedErrorRegex }) => {
        const interactiveMethod: InteractiveMethod =
          createInteractiveMethod(name);
        interactiveMethod.state.inputs = inputs;

        expect(() => validateAndFormatInputs(interactiveMethod)).toThrow(
          expectedErrorRegex,
        );
      });
    });

    it('[array input type - valid inputs] should validate successfully', () => {
      const address1 = randomAddress();
      const address2 = randomAddress();
      const address3 = randomAddress();
      const methods = [
        {
          name: 'acceptAddresses',
          inputs: ['[]'],
          expected: [[]],
        },
        {
          name: 'acceptAddresses',
          inputs: [`["${address1}"]`],
          expected: [[address1]],
        },
        {
          name: 'acceptAddresses',
          inputs: [`["${address1}","${address2}"]`],
          expected: [[address1, address2]],
        },
        {
          name: 'acceptAddresses',
          inputs: [`["${address1}","${address2}","${address3}"]`],
          expected: [[address1, address2, address3]],
        },
      ];

      methods.forEach(({ name, inputs, expected }) => {
        const interactiveMethod: InteractiveMethod =
          createInteractiveMethod(name);
        interactiveMethod.state.inputs = inputs;

        expect(Array.isArray(validateAndFormatInputs(interactiveMethod))).toBe(
          true,
        );
        expect(validateAndFormatInputs(interactiveMethod)).toEqual(expected);
      });
    });

    it('[array input type - invalid array format] should throw', () => {
      const interactiveMethod: InteractiveMethod =
        createInteractiveMethod('acceptAddresses');

      const invalidArrayFormats = [
        '[',
        ']',
        '[ ',
        ' ]',
        '[[]',
        '[]]',
        '["0x1234]',
        '["0x1234"]]',
        '["0x1234", "0x1234"]]',
      ];

      invalidArrayFormats.forEach((invalidArrayFormat) => {
        interactiveMethod.state.inputs = [invalidArrayFormat];
        expect(() => validateAndFormatInputs(interactiveMethod)).toThrow(
          /Invalid array/,
        );
      });
    });

    it('[tuple input type - empty tuple] should throw', () => {
      const interactiveMethod: InteractiveMethod =
        createInteractiveMethod('acceptTuple');
      interactiveMethod.state.inputs = ['[]'];

      expect(() => validateAndFormatInputs(interactiveMethod)).toThrow(
        /Invalid number of parameters for tuple/,
      );
    });

    it('[tuple input type - valid inputs] should validate successfully', () => {
      const address1 = randomAddress();
      const methods = [
        {
          name: 'acceptTuple',
          inputs: [`[1,2,"${address1}",true]`],
          expected: [[1, 2, address1, true]],
        },
      ];

      methods.forEach(({ name, inputs, expected }) => {
        const interactiveMethod: InteractiveMethod =
          createInteractiveMethod(name);
        interactiveMethod.state.inputs = inputs;

        expect(Array.isArray(validateAndFormatInputs(interactiveMethod))).toBe(
          true,
        );
        expect(validateAndFormatInputs(interactiveMethod)).toEqual(expected);
      });
    });

    it('[tuple input type - invalid tuple format] should throw', () => {
      const interactiveMethod: InteractiveMethod =
        createInteractiveMethod('acceptTuple');

      const invalidTupleFormats = ['[', ']', '[ ', ' ]', '[[]', '[]]'];

      invalidTupleFormats.forEach((invalidTupleFormat) => {
        interactiveMethod.state.inputs = [invalidTupleFormat];
        expect(() => validateAndFormatInputs(interactiveMethod)).toThrow(
          /Invalid tuple/,
        );
      });
    });

    it('[unknown input type] should return it as is', () => {
      const mockInteractiveMethod: InteractiveMethod = {
        method: {
          name: 'mockMethod',
          inputs: [
            {
              name: 'mockInput',
              type: 'unknownType',
              internalType: 'unknownType',
            },
          ] as ExtendedInput[],
          outputs: [],
          stateMutability: 'pure',
          type: 'function',
        },
        signatureData: {
          name: 'mockMethod',
          params: [],
          signature: 'mockMethod(unknownType)',
          selector: '0x00000000',
        },
        state: {
          inputs: ['mockInput'],
          isRequesting: false,
          message: {
            content: '',
            style: '',
          },
          outputs: [],
        },
      };

      expect(() => validateAndFormatInputs(mockInteractiveMethod)).not.toThrow;
    });
  });

  describe('parseOutputs', () => {
    it('should return an empty array when given an empty array', () => {
      expect(parseOutputs([])).toEqual([]);
    });

    it('should parse string values correctly', () => {
      expect(parseOutputs(['hello'])).toEqual(['hello']);
      expect(parseOutputs([''])).toEqual(['empty string ("")']);
    });

    it('should parse boolean values correctly', () => {
      expect(parseOutputs([true, false])).toEqual(['true', 'false']);
    });

    it('should parse bigint values correctly', () => {
      expect(parseOutputs([BigInt(9007199254740991)])).toEqual([
        '9007199254740991',
      ]);
    });

    it('should parse arrays correctly', () => {
      expect(parseOutputs([['a', 'b', 'c']])).toEqual([
        JSON.stringify(['a', 'b', 'c'], null, 2),
      ]);
    });

    it('should parse objects correctly', () => {
      expect(parseOutputs([{ key: 'value', num: 42, bool: false }])).toEqual([
        JSON.stringify({ key: 'value', num: 42, bool: 'false' }, null, 2),
      ]);
    });

    it('should handle nested objects correctly', () => {
      expect(parseOutputs([{ nested: { key: 'value', bool: true } }])).toEqual([
        JSON.stringify({ nested: { key: 'value', bool: 'true' } }, null, 2),
      ]);
    });

    it('should handle arrays within objects correctly', () => {
      expect(parseOutputs([{ list: [1, 'text', false] }])).toEqual([
        JSON.stringify({ list: [1, 'text', 'false'] }, null, 2),
      ]);
    });

    it('should return error message when parsing fails', () => {
      const circularObj: any = {};
      circularObj.self = circularObj;

      const result = parseOutputs([circularObj]);
      expect(result[0]).toBe('Error parsing output. Internal Error');
    });
  });
});

// FUTURE: add tests for wagmi functions in separate file
// Jest has a compilation error issue regarding wagmi package when trying to run tests

// describe.skip("isProxyContract", () => {
//   it("should detect a proxy contract", async () => {
//     // Deployed proxy contract address (testnet)
//     const proxyAddress = "0xa25ff4cf8281b1b8b1a991b3791e04f413ffd65e";
//     const implementationAddress = "0x80aa4e74f07fdf30045e91beeff8504a418ad5f5"

//     // const proxyCheck = await isProxyContract(proxyAddress);

//     // expect(proxyCheck).toHaveProperty("isProxy");
//     // expect(proxyCheck.isProxy).toBe(true);
//     // expect(proxyCheck).toHaveProperty("implementationAddress");
//     // expect(proxyCheck.implementationAddress).toBe(implementationAddress);
//   });
// });
