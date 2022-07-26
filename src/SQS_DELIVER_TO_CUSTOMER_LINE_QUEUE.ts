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

    const message = {
        name: "Jim Smith",
        subject: "NEW_CUSTOMER_LINED_UP",
        customerType: "GOLD_MEMBERSHIP",
        timestamp: "2022-05-01 13:32:12 GMT+11"
    }
  
    sqsClient.sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: "http://localhost:4566/000000000000/customers.fifo",
        DelaySeconds: 2,
    }, function(error, data) {
        if (error) {
            console.log(error)
            return
        }
        console.log(data)
    })
}

init()