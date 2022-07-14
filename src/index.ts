// Load the AWS SDK for Node.js
import AWS from "aws-sdk";
import { configParams } from "./config/aws";
import { customerBatchItemsParams } from "./items";
import { customerTableParams } from "./tables/customer";

// Set the region
AWS.config.update({
  region: "us-east-1",
});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB(configParams);

// Small example create a table and put an item
const init = async () => {
  try {
    const result1 = await ddb
      .deleteTable({ TableName: "CUSTOMER_LIST" })
      .promise();
    console.log("DELETE TABLE", result1);
  } catch (e) {
    console.error("Failed to delete table, perhaps it does not exist yet.");
  }
  const result2 = await ddb.createTable(customerTableParams).promise();
  console.log("CREATE TABLE", result2);

  const result3 = await ddb.batchWriteItem(customerBatchItemsParams).promise();
  console.log("ITEMS", result3);

  const result4 = await ddb
    .scan({
      TableName: "CUSTOMER_LIST",
      Limit: 100,
    })
    .promise();
  console.log("SCANNING", result4.Count ? result4.Items : null);

  // const result5 = await ddb
  //   .query({
  //     TableName: "CUSTOMER_LIST",
  //     KeyConditionExpression: "CUSTOMER_ID = :id",
  //     ExpressionAttributeValues: {
  //       ":id": {
  //         N: "1",
  //       },
  //     },
  //   })
  //   .promise();

  // console.log("RESULT 5: ", result5);

  // const result6 = await ddb
  //   .query({
  //     TableName: "CUSTOMER_LIST",
  //     KeyConditionExpression: "CUSTOMER_ID = :customer_id",
  //     FilterExpression: "CUSTOMER_RANDOM_NUMBER > :n",

  //     ExpressionAttributeValues: {
  //       ":customer_id": {
  //         N: "1",
  //       },
  //       ":n": {
  //         N: "3",
  //       },
  //     },
  //   })
  //   .promise();

  // console.log("RESULT 6: ", result6);
};

init();
