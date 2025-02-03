'use client'
import { http, createConfig } from 'wagmi'
import { rootstockTestnet, rootstock } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const wagmiConfig = createConfig({
  chains: [rootstockTestnet, rootstock],
  connectors: [metaMask()],
  ssr: true,
  transports: {
    [rootstock.id]: http(),
    [rootstockTestnet.id]: http(),
  },
})

const queryClient = new QueryClient();

export default function Web3Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}