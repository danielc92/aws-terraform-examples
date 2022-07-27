import AWS from 'aws-sdk'

const sqsClient = new AWS.SQS({
  apiVersion: '2012-11-05',
  region: 'us-east-1',
  credentials: {
    accessKeyId: '12345',
    secretAccessKey: '12345'
  }
})

const init = () => {
  sqsClient.sendMessage({
    MessageBody: JSON.stringify('New customer has lined up.'),
    MessageAttributes: {
      Name: {
        DataType: 'String',
        StringValue: 'Jim Doe'
      },
      Membership: {
        DataType: 'String',
        StringValue: 'GOLD MEMBERSHIP'
      }
    },
    MessageGroupId: 'CUSTOMER_LINE_1',
    QueueUrl: 'http://localhost:4566/000000000000/customers.fifo'
    // DelaySeconds: 2, FIFO should not have delay param
  }, function (error, data) {
    if (error) {
      console.log(error)
      return
    }
    console.log(data)
  })
}

init()
