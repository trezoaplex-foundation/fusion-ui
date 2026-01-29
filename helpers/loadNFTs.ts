import { Metadata, Trezoaplex } from "@trezoaplex-foundation/js";
import { WalletContextState } from "@trezoa/wallet-adapter-react";
import { findTriflePda } from "./pdas";

export const loadNFTs = async (
  trezoaplex: Trezoaplex,
  wallet: WalletContextState,
) => {
  const lazyNfts = await trezoaplex.nfts().findAllByOwner({
    owner: wallet.publicKey!,
  });
  const nftPromises = lazyNfts.map((nft) => {
    return trezoaplex.nfts().findByMint({
      mintAddress: (nft as Metadata).mintAddress,
    });
  });

  return await Promise.all(nftPromises);
};

export const loadTrifleNFTs = async (trezoaplex: Trezoaplex, wallet: WalletContextState) => {
  const nfts = await loadNFTs(trezoaplex, wallet);
  let trifleNFTs = [];
  for (let i = 0; i < nfts.length; i++) {
    let nft = nfts[i];
    let trifleAddress = await findTriflePda(nft.address, nft.updateAuthorityAddress);
    let account = await trezoaplex.connection.getAccountInfo(trifleAddress[0]);
    console.log(account);
    if (account) {
      trifleNFTs.push(nft);
    }
  }
  return trifleNFTs;
};