import AWS from 'aws-sdk'

const sqsClient = new AWS.SQS({
    apiVersion: '2012-11-05',
    region: "us-east-1",
    credentials: {
        accessKeyId: "12345",
        secretAccessKey: "12345"
    }
});

const init = () => {
    sqsClient.receiveMessage({
        QueueUrl: "http://localhost:4566/000000000000/payments",
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5
    }).promise().then((result) => {
        if (result.Messages) {
            console.log(result)
        } else {
            console.log("Looks like the queue is empty!")
        }
    }).catch((error) => console.error(error))   
}

init()