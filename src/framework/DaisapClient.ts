import * as anchor from "@project-serum/anchor";
import { Dailsap } from "utils/dailsap";
import { ACCOUNT_DISCRIMINATOR_SIZE, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export type Collection = {
  name: string;
  description: string;
  image_uri: string;
};

export type Product = {
  name: string;
  description: string;
  image_uri: string;
};

export class DailsapClient {
  public provider: anchor.AnchorProvider;
  public program: Program<Dailsap>;

  constructor(program: Program<Dailsap>) {
    this.program = program;
    this.provider = program.provider as anchor.AnchorProvider;
  }

  getCollectionDetails = async (collectionAddresses: PublicKey[]) => {
    const collections = (await this.program.account.collection.fetchMultiple(
      collectionAddresses
    )) as Collection[];

    return collections;
  };

  getCollections = async (): Promise<Collection[]> => {
    const collectionList = (
      await this.provider.connection.getProgramAccounts(this.program.programId)
    ).map((it) => it.pubkey);

    return await this.getCollectionDetails(collectionList);
  };
}
