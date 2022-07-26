import AWS from 'aws-sdk'

const sqsClient = new AWS.SQS({
    apiVersion: '2012-11-05',
    region: "us-east-1",
    credentials: {
        accessKeyId: "12345",
        secretAccessKey: "12345"
    }, 
});

const init = () => {
    sqsClient.receiveMessage({
        VisibilityTimeout: 2,
        QueueUrl: "http://localhost:4566/000000000000/customers.fifo",
        AttributeNames: [
            'All',
          ],
          MaxNumberOfMessages: 10,
          MessageAttributeNames: [
            'All',
          ],
    }).promise().then((result) => {
        if (result.Messages) {
            console.log(JSON.stringify(result, null, 2))
        } else {
            console.log(result)
            console.log("Looks like the queue is empty!")
        }
    }).catch((error) => console.error(error))   
}

init()