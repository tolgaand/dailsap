export type Dailsap = {
  version: "0.1.0";
  name: "dailsap";
  instructions: [
    {
      name: "createCollection";
      accounts: [
        {
          name: "collection";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "imageUri";
          type: "string";
        }
      ];
    },
    {
      name: "updateCollection";
      accounts: [
        {
          name: "collectionAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "imageUri";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "collection";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "image";
            type: "string";
          }
        ];
      };
    },
    {
      name: "product";
      type: {
        kind: "struct";
        fields: [
          {
            name: "collection";
            type: "publicKey";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "image";
            type: "string";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "CollectionNameTooLong";
      msg: "The provided name should be 50 characters long maximum.";
    },
    {
      code: 6001;
      name: "CollectionDescriptionTooLong";
      msg: "The provided description should be 250 characters long maximum.";
    },
    {
      code: 6002;
      name: "CollectionImageUrlTooLong";
      msg: "The provided image uri should be 60 characters long maximum.";
    }
  ];
};
