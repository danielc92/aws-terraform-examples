import { v4 as uuidv4 } from "uuid";

// inserts 3 items
export const customerBatchItemsParams: AWS.DynamoDB.BatchWriteItemInput = {
  RequestItems: {
    CUSTOMER_LIST: [
      {
        PutRequest: {
          Item: {
            CUSTOMER_ID: {
              S: "robert001",
            },
            CREATED_AT: {
              N: "16000000002",
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
              S: "dwight001",
            },
            CREATED_AT: {
              N: "16000000001",
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
              S: "jim001",
            },
            CREATED_AT: {
              N: "16000000000",
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
