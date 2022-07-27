// Load the AWS SDK for Node.js
import AWS from 'aws-sdk'
import { configParams } from './config/aws'
import { customerBatchItemsParams } from './items'

// Set the region
AWS.config.update({
  region: 'us-east-1'
})

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB(configParams)

// Small example create a table and put an item
const init = async () => {
  const result3 = await ddb.batchWriteItem(customerBatchItemsParams).promise()
  console.log('ITEMS', result3)
}

init()
