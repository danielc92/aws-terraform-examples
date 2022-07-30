// Load the AWS SDK for Node.js
import AWS from 'aws-sdk'
import { configParams } from './config/aws'

// Set the region
AWS.config.update({
  region: 'us-east-1'
})

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB(configParams)

// Small example create a table and put an item
const init = async () => {
  // Use of query is preferred over scan for performance advantage
  const results = await ddb.query({
    TableName: 'CUSTOMER_LIST',
    KeyConditionExpression: 'CUSTOMER_ID = :CUSTOMER_ID',
    ExpressionAttributeValues: {
      ':CUSTOMER_ID': {
        S: 'robert001'
      }
    },
    Limit: 50,
    ScanIndexForward: true
  }).promise()
  console.log(results)
}

init()
