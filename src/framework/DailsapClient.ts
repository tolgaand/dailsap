import * as anchor from "@project-serum/anchor";
import { Dailsap } from "utils/dailsap";
import { ACCOUNT_DISCRIMINATOR_SIZE, Program } from "@project-serum/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";

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

export type CreateCollectionPayload = {
  id?: PublicKey;
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

  getCollectionPDA = async (id: PublicKey) => {
    const [PDA, _] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("collection"), id.toBuffer()],
      this.program.programId
    );

    return PDA;
  };

  createCollection = async (payload: CreateCollectionPayload) => {
    const {
      id = Keypair.generate().publicKey,
      name,
      description,
      image,
    } = payload;

    const collectionPDA = await this.getCollectionPDA(id);

    await this.program.methods
      .createCollection(id, name, description, image)
      .accounts({
        collection: collectionPDA,
        authority: this.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  };
}
