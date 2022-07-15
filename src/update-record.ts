// Load the AWS SDK for Node.js
import AWS from "aws-sdk";
import { configParams } from "./config/aws";

// Set the region
AWS.config.update({
  region: "us-east-1",
});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB(configParams);

// Small example create a table and put an item
const init = async () => {
  const result = await ddb.updateItem({
    "TableName": "CUSTOMER_LIST",
    "Key": {
        "CUSTOMER_ID": {
            "S": "robert001"
        },
        "CREATED_AT": {
          "N": "16000000002"
         
        }
    },
    "UpdateExpression": "set SPOUSE_NAME = :spouse_name",
    "ExpressionAttributeValues": {
        ":spouse_name": {"S": "Susan Smith"}
    },
    "ReturnValues" : "NONE"
  }).promise();
  console.log("updateItem result: ", result);
};

init();
