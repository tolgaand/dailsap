import * as anchor from "@project-serum/anchor";
import { Dailsap } from "utils/dailsap";
import { ACCOUNT_DISCRIMINATOR_SIZE, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export type Collection = {
  id: PublicKey;
  name: string;
  description: string;
  image: string;
  timestamp: anchor.BN;
  authority: PublicKey;
};

export type Product = {
  name: string;
  description: string;
  image: string;
};

export class DailsapClient {
  public provider: anchor.AnchorProvider;
  public program: Program<Dailsap>;

  constructor(program: Program<Dailsap>) {
    this.program = program;
    this.provider = program.provider as anchor.AnchorProvider;
  }

  getCollectionList = async () => {
    const prefetchedList = await this.provider.connection.getProgramAccounts(
      this.program.programId
    );

    return prefetchedList;
  };

  getCollectionDetails = async (collectionAddresses: PublicKey[]) => {
    const collections = (await this.program.account.collection.fetchMultiple(
      collectionAddresses
    )) as Collection[];

    return collections;
  };

  getCollections = async (): Promise<Collection[]> => {
    const prefetchedList = await this.getCollectionList();

    const collectionList = await this.getCollectionDetails(
      prefetchedList.map((it) => it.pubkey)
    );

    return collectionList;
  };
}
