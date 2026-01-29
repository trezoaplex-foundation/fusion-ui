import { Provider, useMemo, FC } from 'react';
import { useWallet, useConnection } from '@trezoa/wallet-adapter-react';
import { Trezoaplex, walletAdapterIdentity } from "@trezoaplex-foundation/js";
import { TrezoaplexContext } from '../hooks/useTrezoaplex';

interface TrezoaplexProviderProps { children: React.ReactNode }

export const TrezoaplexProvider: FC<TrezoaplexProviderProps> = ({ children }) => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const trezoaplex = useMemo(() => {
        if (!wallet) {
            console.error("wallet not connected");
            return null;
        }
        return Trezoaplex.make(connection).use(
            walletAdapterIdentity(wallet),
        );
    }, [connection, wallet]);

    return (
        <TrezoaplexContext.Provider value={{ trezoaplex }}>
            {children}
        </TrezoaplexContext.Provider>
    );
};