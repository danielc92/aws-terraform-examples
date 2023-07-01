import { faker } from '@faker-js/faker'

export const testCustomerData = new Array(15000).fill(null).map(_ => (
  {
    PutRequest: {
      Item: {
        CUSTOMER_ID: {
          S: faker.string.uuid()
        },
        CREATED_AT: {
          N: faker
            .date
            .between({
              from: '2020-01-01T00:00:00.000Z',
              to: '2022-01-01T00:00:00.000Z'
            })
            .getTime()
            .toString()
        },
        CUSTOMER_NAME: {
          S: faker
            .person
            .fullName()
        },
        CUSTOMER_RANDOM_NUMBER: {
          N: faker
            .number
            .bigInt({ min: 20, max: 400 }).toString()
        },
        CUSTOMER_IS_SUBSCRIBED: {
          BOOL: faker.datatype.boolean()
        }
      }
    }
  }
))

// export const customerBatchItemsParams: AWS.DynamoDB.BatchWriteItemInput = {
//   RequestItems: {
//     CUSTOMER_LIST:

//   }
// }
