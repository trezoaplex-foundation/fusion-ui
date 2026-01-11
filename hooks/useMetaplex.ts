import { Trezoaplex } from "@trezoaplex-foundation/js";
import { createContext, useContext } from "react";
import { PROGRAM_ID } from "@trezoaplex-foundation/tpl-token-metadata";


interface TrezoaplexContextInterface {
  metaplex: Trezoaplex | null;
}

const defaultContext = {
  metaplex: null,
};

export const TrezoaplexContext = createContext<TrezoaplexContextInterface>(
  defaultContext,
);

export function useTrezoaplex() {
  let ctx = useContext(TrezoaplexContext);
  return ctx;
}
