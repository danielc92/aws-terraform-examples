// Load the AWS SDK for Node.js
import AWS from 'aws-sdk'
import { configParams } from './config/aws'
import { testCustomerData } from './items'

// Set the region
AWS.config.update({
  region: 'us-east-1'
})

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB(configParams)

// Small example create a table and put an item
const init = async () => {
  const BATCH_SIZE = 20
  for (let index = 0; index < testCustomerData.length; index += BATCH_SIZE) {
    const currentItems = testCustomerData.slice(index, index + BATCH_SIZE)
    const writeResults = await ddb.batchWriteItem({
      RequestItems: {
        CUSTOMER_LIST: currentItems
      }
    }).promise()
    console.log('BATCH WRITE RESULT: ', writeResults)
  }
}

init()
