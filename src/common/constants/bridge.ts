import precompiled from '@rsksmart/rsk-precompiled-abis';
import {
  RSKFunctionFragment,
  StateMutability,
} from '../utils/contractInteractions';

const METHOD_TYPES = {
  read: 'read',
  write: 'write',
};

// ARROWHEAD
export const ALLOWED_BRIDGE_METHODS = {
  [METHOD_TYPES.read]: [
    'getBtcBlockchainBestChainHeight',
    'getStateForBtcReleaseClient',
    'getStateForDebugging',
    'getBtcBlockchainInitialBlockHeight',
    'getBtcBlockchainBlockHashAtDepth',
    'getBtcTxHashProcessedHeight',
    'isBtcTxHashAlreadyProcessed',
    'getFederationAddress',
    'getFederationSize',
    'getFederationThreshold',
    'getFederatorPublicKey',
    'getFederatorPublicKeyOfType',
    'getFederationCreationTime',
    'getFederationCreationBlockNumber',
    'getRetiringFederationAddress',
    'getRetiringFederationSize',
    'getRetiringFederationThreshold',
    'getRetiringFederatorPublicKeyOfType',
    'getRetiringFederationCreationTime',
    'getRetiringFederationCreationBlockNumber',
    'getPendingFederationHash',
    'getPendingFederationSize',
    'getPendingFederatorPublicKeyOfType',
    'getFeePerKb',
    'getMinimumLockTxValue',
    'getBtcTransactionConfirmations',
    'getLockingCap',
    'hasBtcBlockCoinbaseTransactionInformation',
    'getActiveFederationCreationBlockHeight',
    'getBtcBlockchainBestBlockHeader',
    'getBtcBlockchainBlockHeaderByHash',
    'getBtcBlockchainBlockHeaderByHeight',
    'getBtcBlockchainParentBlockHeaderByHash',
    'getEstimatedFeesForNextPegOutEvent',
    'getNextPegoutCreationBlockNumber',
    'getQueuedPegoutsCount',
    'getActivePowpegRedeemScript',
  ],
  [METHOD_TYPES.write]: [
    'registerBtcTransaction',
    'registerBtcCoinbaseTransaction',
    'receiveHeader',
  ],
};

// Bridfe function fragments do not have stateMutability field
export type RSKBridgeFragment = Omit<RSKFunctionFragment, 'stateMutability'>;

export const isBridgeReadMethod = (name: string) => {
  return ALLOWED_BRIDGE_METHODS[METHOD_TYPES.read].includes(name);
};

export const isBridgeWriteMethod = (name: string) => {
  return ALLOWED_BRIDGE_METHODS[METHOD_TYPES.write].includes(name);
};

export const isAllowedBridgeMethod = (name: string) => {
  return isBridgeReadMethod(name) || isBridgeWriteMethod(name);
};

export const formatBridgeWriteMethod = (fragment: RSKBridgeFragment) => {
  return {
    ...fragment,
    constant: false, // set constant to false
    stateMutability: 'nonpayable' as StateMutability.NonPayable, // make it recognisable as write method
  };
};

export const formatBridgeReadMethod = (fragment: RSKBridgeFragment) => {
  return {
    ...fragment,
    stateMutability: 'view' as StateMutability.View, // make it recognisable as read method
  };
};

export const getAllowedBridgeFragments = (
  bridgeAbi: RSKBridgeFragment[],
): RSKFunctionFragment[] => {
  const allowedBridgeFragments: RSKFunctionFragment[] = [];

  try {
    // ABI must be an array
    if (!Array.isArray(bridgeAbi)) throw new Error(`Invalid bridge ABI`);

    for (const fragment of bridgeAbi) {
      try {
        // Each fragment must have a name
        if (!fragment.name || fragment.name === '')
          throw new Error(`Invalid Bridge fragment. Fragment name is missing`);

        // Not all bridge methods are allowed to be called from the frontend (rsk-core)
        if (isAllowedBridgeMethod(fragment.name)) {
          // Workaround until Bridge ABI becomes compliant with ethereum abi standard
          const formattedFragment = isBridgeReadMethod(fragment.name)
            ? formatBridgeReadMethod(fragment)
            : formatBridgeWriteMethod(fragment);

          allowedBridgeFragments.push(formattedFragment);
        }
      } catch (error: any) {
        // Log error and continue with the next fragment
        console.error(
          `Error while formatting Bridge ABI fragment: ${error.message}`,
        );
      }
    }
  } catch (error: any) {
    console.error(`Error while formatting bridge fragments: ${error.message}`);
  }

  return allowedBridgeFragments;
};

export const bridge = {
  address: precompiled.bridge.address,
  rawAbi: precompiled.bridge.abi,
  abi: getAllowedBridgeFragments(precompiled.bridge.abi),
};
