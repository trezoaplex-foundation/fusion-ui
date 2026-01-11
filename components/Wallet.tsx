import { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@trezoa/wallet-adapter-react';
import { WalletAdapterNetwork } from '@trezoa/wallet-adapter-base';
import { PhantomWalletAdapter } from '@trezoa/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@trezoa/wallet-adapter-react-ui';
import { clusterApiUrl } from '@trezoa/web3.js';

// Default styles that can be overridden by your app
require('@trezoa/wallet-adapter-react-ui/styles.css');

type Props = {
    children: React.ReactNode;
}

export const Wallet: FC<Props> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    // const network = WalletAdapterNetwork.Devnet;

    // // You can also provide a custom RPC endpoint.
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const endpoint = "https://wispy-proud-butterfly.trezoa-devnet.quiknode.pro/47f7e86096c0fc7c3f2ecd30b0db25652df6e672/"

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};