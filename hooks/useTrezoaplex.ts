import { Trezoaplex } from "@trezoaplex-foundation/js";
import { createContext, useContext } from "react";
import { PROGRAM_ID } from "@trezoaplex-foundation/tpl-token-metadata";


interface TrezoaplexContextInterface {
  trezoaplex: Trezoaplex | null;
}

const defaultContext = {
  trezoaplex: null,
};

export const TrezoaplexContext = createContext<TrezoaplexContextInterface>(
  defaultContext,
);

export function useTrezoaplex() {
  let ctx = useContext(TrezoaplexContext);
  return ctx;
}
