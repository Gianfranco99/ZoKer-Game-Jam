import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Chain, sepolia } from '@starknet-react/chains';
import { StarknetConfig, starkscan } from '@starknet-react/core';
import { RpcProvider } from 'starknet';
import useControllerAccount from '../hooks/useControllerAccount';


import { motion, AnimatePresence } from 'framer-motion';

import '../styles/globals.scss';

function provider(chain: Chain) {
  return new RpcProvider({
    nodeUrl: 'https://api.cartridge.gg/x/starknet/sepolia'
  });
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
      <AnimatePresence mode="wait">
        <motion.div key={router.pathname}>
          <Component {...pageProps} />;
          <motion.div
            className="fade-in-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 0.5, 0.75, 1] }}
          />
          <motion.div
            className="fade-out-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 0.5, 0.75, 1] }}
          />
        </motion.div>
      </AnimatePresence>
  );
}
