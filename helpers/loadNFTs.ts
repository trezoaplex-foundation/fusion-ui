import { Metadata, Trezoaplex } from "@trezoaplex-foundation/js";
import { WalletContextState } from "@trezoa/wallet-adapter-react";
import { findTriflePda } from "./pdas";

export const loadNFTs = async (
  metaplex: Trezoaplex,
  wallet: WalletContextState,
) => {
  const lazyNfts = await metaplex.nfts().findAllByOwner({
    owner: wallet.publicKey!,
  });
  const nftPromises = lazyNfts.map((nft) => {
    return metaplex.nfts().findByMint({
      mintAddress: (nft as Metadata).mintAddress,
    });
  });

  return await Promise.all(nftPromises);
};

export const loadTrifleNFTs = async (metaplex: Trezoaplex, wallet: WalletContextState) => {
  const nfts = await loadNFTs(metaplex, wallet);
  let trifleNFTs = [];
  for (let i = 0; i < nfts.length; i++) {
    let nft = nfts[i];
    let trifleAddress = await findTriflePda(nft.address, nft.updateAuthorityAddress);
    let account = await metaplex.connection.getAccountInfo(trifleAddress[0]);
    console.log(account);
    if (account) {
      trifleNFTs.push(nft);
    }
  }
  return trifleNFTs;
};