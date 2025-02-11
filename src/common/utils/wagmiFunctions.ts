import { getStorageAt } from '@wagmi/core';
import { wagmiConfig } from '@/context/Web3Provider';
import { GetStorageAtReturnType, Hex } from 'viem';

interface IsProxyContractResult {
  isProxy: boolean;
  implementationAddress: Hex;
}

export async function isProxyContract(
  contractAddress: Hex,
): Promise<IsProxyContractResult> {
  const result = {
    isProxy: false,
    implementationAddress: '' as Hex,
  };

  try {
    // ERC1967 normative (see https://eips.ethereum.org/EIPS/eip-1967)
    const IMPLEMENTATION_SLOT =
      '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';

    // FUTURE: support beacon proxies
    // const BEACON_SLOT = '0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50'

    const slotValue: GetStorageAtReturnType = await getStorageAt(wagmiConfig, {
      address: contractAddress,
      slot: IMPLEMENTATION_SLOT,
    });

    if (!slotValue)
      throw new Error('checkProxySlot(): Provider returns no data');

    const isZero = BigInt(slotValue) === BigInt(0);

    // Not a proxy contract
    if (isZero) {
      return result;
    }

    // Parse implementation address from slot value
    const implementationAddress = `0x${slotValue!.slice(-40)}`;

    result.isProxy = true;
    result.implementationAddress = implementationAddress as Hex;

    return result;
  } catch (error) {
    console.error(
      `Error checking proxy slot for contractAddress: ${contractAddress}`,
    );

    return result;
  }
}
