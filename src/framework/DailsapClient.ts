import * as anchor from "@project-serum/anchor";
import { Dailsap } from "utils/dailsap";
import { ACCOUNT_DISCRIMINATOR_SIZE, Program } from "@project-serum/anchor";
import { GetProgramAccountsFilter, Keypair, PublicKey } from "@solana/web3.js";

export type Collection = {
  id: PublicKey;
  name: string;
  description: string;
  image: string;
  timestamp: anchor.BN;
  authority: PublicKey;
  isPublished: boolean;
};

export type Product = {
  name: string;
  description: string;
  image: string;
  is_published: boolean;
};

export type CreateCollectionPayload = {
  id?: PublicKey;
  name: string;
  description: string;
  image: string;
};

export type UpdateCollectionPayload = {
  id: PublicKey;
  name: string;
  description: string;
  image: string;
  is_published?: boolean;
};

export type CreateProductPayload = {
  id?: PublicKey;
  name: string;
  description: string;
  image: string;
  collection_account: PublicKey;
};

export class DailsapClient {
  public provider: anchor.AnchorProvider;
  public program: Program<Dailsap>;

  constructor(program: Program<Dailsap>) {
    this.program = program;
    this.provider = program.provider as anchor.AnchorProvider;
  }

  getCollectionList = async () => {
    const filters: GetProgramAccountsFilter[] = [
      {
        memcmp: this.program.coder.accounts.memcmp("Collection"),
      },
    ];

    const prefetchedList = await this.provider.connection.getProgramAccounts(
      this.program.programId,
      { filters }
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

    //sort by timestamp
    collectionList.sort((a, b) => {
      return b.timestamp.toNumber() - a.timestamp.toNumber();
    });

    return collectionList.filter((it) => it.isPublished);
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

  updateCollection = async (payload: UpdateCollectionPayload) => {
    const { id, name, description, image, is_published = true } = payload;

    const collectionPDA = await this.getCollectionPDA(id);

    await this.program.methods
      .updateCollection(name, description, image, is_published)
      .accounts({
        collectionAccount: collectionPDA,
        // authority: this.provider.wallet.publicKey,
      })
      .rpc();
  };

  getProductPDA = async (id: PublicKey) => {
    const [PDA, _] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("product"), id.toBuffer()],
      this.program.programId
    );

    return PDA;
  };

  createProduct = async (payload: CreateProductPayload) => {
    const {
      id = Keypair.generate().publicKey,
      name,
      description,
      image,
      collection_account,
    } = payload;

    const productPDA = await this.getProductPDA(id);

    await this.program.methods
      .createProduct(id, name, description, image)
      .accounts({
        product: productPDA,
        collectionAccount: collection_account,
        authority: this.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  };
}
