import CircleIcon from '@/common/icons/CircleIcon'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import AddressTooltip from '../ui/AddressTooltip'

export function ConnectButton({ connect, showDisclaimer = true }: { connect: () => void, showDisclaimer: boolean }) {
  const showDisclaimerAndConnect = () => {
    const disclaimer = "Please take note that this is a beta version feature and is provided on an \"as is\" and \"as available\" basis. Rootstock Explorer does not give any warranties and will not be liable for any loss, direct or indirect through continued use of this feature.";
    if (window.confirm(disclaimer)) {
      connect();
    }
  };

  return (
    <button
      onClick={showDisclaimer ? showDisclaimerAndConnect : connect}
      className="bg-[#FF71E1] hover:bg-[#FF85E6] text-black py-1 px-2 rounded-md text-sm"
    >
      Connect Wallet
    </button>
  )
}

export function WalletOptions() {
  const { connectors, connect } = useConnect()
  const metamaskConnector = connectors.find((connector) => connector.name === 'MetaMask')

  if (!metamaskConnector) {
    console.warn('MetaMask connector not found. Unable to render wallet options.')
    return
  }

  return (
    <div className='flex gap-3'>
      <ConnectButton
        connect={() => connect({ connector: metamaskConnector })}
        showDisclaimer
      />
    </div>
  )
}

export function DisconnectButton({ disconnect }: { disconnect: () => void }) {
  return (
    <button
      onClick={() => disconnect()}
      className="bg-[#FF71E1] hover:bg-[#FF85E6] text-black py-1 px-2 rounded-lg text-sm"
    > 
      Disconnect
    </button>
  )
}

export function ConnectedAddress({ address }: { address: string }) {
  return (
    <div className='bg-[#262626] border border-[#3A3A3A] py-1 px-2 rounded-md flex gap-1 items-center'>
      <CircleIcon />
      <AddressTooltip address={address.toLowerCase()} />
    </div>
  )
}

export function WalletAccount () {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex items-center text-white rounded-lg">
      {address && (
        <div className="flex gap-2">
          <DisconnectButton disconnect={disconnect} />
          <ConnectedAddress address={address} />
        </div>
      )}
    </div>
  )
}

export function WalletConnection() {
  const { isConnected } = useAccount()

  return (
    <>
      {isConnected && <WalletAccount />}
      {!isConnected && <WalletOptions />}
    </>
  )
}