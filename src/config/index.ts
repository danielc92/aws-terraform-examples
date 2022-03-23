// run `aws configure --profile localstack` (answers: 12345, 12345, us-east-1, json) beforehand
export const configParams: AWS.DynamoDB.ClientConfiguration = {
  apiVersion: "2022-03-22",
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: "12345",
    secretAccessKey: "12345",
  },
};
