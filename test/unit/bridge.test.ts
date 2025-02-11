import {
  RSKBridgeFragment,
  getAllowedBridgeFragments,
  formatBridgeWriteMethod,
  formatBridgeReadMethod,
  isAllowedBridgeMethod,
} from '@/common/constants/bridge';

// Mock data
const mockReadFragment: RSKBridgeFragment = {
  name: 'getBtcBlockchainBestChainHeight',
  constant: true,
  inputs: [],
  outputs: [],
  type: 'function',
};

const mockWriteFragment: RSKBridgeFragment = {
  name: 'registerBtcTransaction',
  constant: false,
  inputs: [],
  outputs: [],
  type: 'function',
};

const mockNotAllowedFragment: RSKBridgeFragment = {
  name: 'notAllowedFragment',
  constant: false,
  inputs: [],
  outputs: [],
  type: 'function',
};

const unnamedFragment: RSKBridgeFragment = {
  name: '',
  constant: false,
  inputs: [],
  outputs: [],
  type: 'function',
};

const unnamedFragment2: any = {
  constant: false,
  inputs: [],
  outputs: [],
  type: 'function',
};

describe('Bridge object module', () => {
  describe('Fragment Formatters', () => {
    it('should format write methods correctly', () => {
      const formatted = formatBridgeWriteMethod(mockWriteFragment);
      expect(formatted).toEqual({
        ...mockWriteFragment,
        constant: false,
        stateMutability: 'nonpayable',
      });
    });

    it('should format read methods correctly', () => {
      const formatted = formatBridgeReadMethod(mockReadFragment);
      expect(formatted).toEqual({
        ...mockReadFragment,
        stateMutability: 'view',
      });
    });
  });

  describe('isAllowedBridgeMethod', () => {
    it('should identify allowed bridge methods', () => {
      expect(isAllowedBridgeMethod('getBtcBlockchainBestChainHeight')).toBe(
        true,
      );
      expect(isAllowedBridgeMethod('registerBtcTransaction')).toBe(true);
      expect(isAllowedBridgeMethod('notAllowedFragment')).toBe(false);
    });
  });

  describe('getAllowedBridgeFragments', () => {
    // should log an error for an invalid bridgeAbi
    it('should log an error for an invalid bridgeAbi', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const formattedAbi = getAllowedBridgeFragments(undefined as any);
      expect(formattedAbi).toHaveLength(0);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error while formatting bridge fragments: Invalid bridge ABI',
        ),
      );
      consoleSpy.mockRestore();
    });

    it('should log an error for unnamed fragments', () => {
      const bridgeAbi = [unnamedFragment, unnamedFragment2];
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const formattedAbi = getAllowedBridgeFragments(bridgeAbi);
      expect(formattedAbi).toHaveLength(0);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'Error while formatting Bridge ABI fragment: Invalid Bridge fragment. Fragment name is missing',
        ),
      );
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      consoleSpy.mockRestore();
    });

    it('should handle an empty bridgeAbi', () => {
      const formattedAbi = getAllowedBridgeFragments([]);
      expect(formattedAbi).toHaveLength(0);
    });

    it('should handle a bridgeAbi containing unallowed methods', () => {
      const bridgeAbi = [
        mockReadFragment,
        mockWriteFragment,
        mockNotAllowedFragment,
      ];
      const formattedAbi = getAllowedBridgeFragments(bridgeAbi);
      expect(formattedAbi).toHaveLength(2);
      expect(formattedAbi).toContainEqual(
        expect.objectContaining({
          name: 'getBtcBlockchainBestChainHeight',
          stateMutability: 'view',
        }),
      );
      expect(formattedAbi).toContainEqual(
        expect.objectContaining({
          name: 'registerBtcTransaction',
          stateMutability: 'nonpayable',
        }),
      );
    });
  });
});
