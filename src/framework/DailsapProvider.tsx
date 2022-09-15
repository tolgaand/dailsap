import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DailsapClient } from "./DailsapClient";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useProgramId } from "hooks/useProgramId";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { Dailsap } from "utils/dailsap";
import { idl } from "utils/idl";

type DailsapContextType = {
  client?: DailsapClient;
};

const DailsapContext = createContext<DailsapContextType>({});

export const DailsapContextProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

  const { data: programId } = useProgramId();

  const [programIdKey, setProgramIdKey] = useState<PublicKey>();

  useEffect(() => {
    if (programId && programId !== programIdKey?.toString())
      setProgramIdKey(new PublicKey(programId));
  }, [programId, programIdKey]);

  const dailsapClient = useMemo(() => {
    if (!programIdKey) return undefined;

    const wallet = anchorWallet;
    const provider = new AnchorProvider(
      connection,
      wallet || {
        signTransaction: async (): Promise<Transaction> => {
          return new Transaction();
        },
        signAllTransactions: async (): Promise<Transaction[]> => {
          return [];
        },
        publicKey: Keypair.generate().publicKey,
      },
      {
        commitment: "confirmed",
      }
    );

    const program = new Program(
      idl,
      programIdKey,
      provider
    ) as unknown as Program<Dailsap>;

    return new DailsapClient(program);
  }, [anchorWallet, connection, programIdKey]);

  if (!dailsapClient)
    return (
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <div className="w-16 h-16 border-l-2 border-gray-900 rounded-full animate-spin"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );

  return (
    <DailsapContext.Provider value={{ client: dailsapClient }}>
      {children}
    </DailsapContext.Provider>
  );
};

export const useDailsapClient = () => {
  return useContext(DailsapContext).client;
};
