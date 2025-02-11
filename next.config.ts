import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Remove warnings for pino-pretty, lokijs, and encoding libs used by wagmi
    // This can be removed if all wagmi hooks are used inside useEffect
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
