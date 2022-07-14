import { v4 as uuidv4 } from "uuid";

// inserts 3 items
export const customerBatchItemsParams: AWS.DynamoDB.BatchWriteItemInput = {
  RequestItems: {
    CUSTOMER_LIST: [
      {
        PutRequest: {
          Item: {
            CUSTOMER_ID: {
              S: uuidv4(),
            },
            CREATED_AT: {
              N: new Date().getTime().toString(),
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
              S: uuidv4(),
            },
            CREATED_AT: {
              N: new Date().getTime().toString(),
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
              S: uuidv4(),
            },
            CREATED_AT: {
              N: new Date().getTime().toString(),
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
