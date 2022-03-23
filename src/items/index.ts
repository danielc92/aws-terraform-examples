export const customerItemParams: AWS.DynamoDB.PutItemInput = {
  Item: {
    CUSTOMER_ID: {
      N: "1",
    },
    CUSTOMER_NAME: {
      S: "Daniel corcoran",
    },
  },
  TableName: "CUSTOMER_LIST",
};

export const customerBatchItemsParams: AWS.DynamoDB.BatchWriteItemInput = {
  RequestItems: {
    CUSTOMER_LIST: [
      {
        PutRequest: {
          Item: {
            CUSTOMER_ID: {
              N: "1",
            },
            CREATED_AT: {
              // N: new Date().getTime().toString(),
              N: "25",
            },
            CUSTOMER_NAME: {
              S: "Robert California",
            },
            CUSTOMER_RANDOM_NUMBER: {
              N: "2",
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            CUSTOMER_ID: {
              N: "1",
            },
            CREATED_AT: {
              // N: new Date().getTime().toString(),
              N: "30",
            },
            CUSTOMER_NAME: {
              S: "Dwight Schrute",
            },
            CUSTOMER_RANDOM_NUMBER: {
              N: "3",
            },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            CUSTOMER_ID: {
              N: "1",
            },
            CREATED_AT: {
              // N: new Date().getTime().toString(),
              N: "1",
            },
            CUSTOMER_NAME: {
              S: "Jim Halpert",
            },
            CUSTOMER_RANDOM_NUMBER: {
              N: "4",
            },
          },
        },
      },
    ],
  },
};
