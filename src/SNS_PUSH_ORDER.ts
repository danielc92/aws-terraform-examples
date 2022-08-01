import AWS from 'aws-sdk'

const snsClient = new AWS.SNS(
  {
    endpoint: 'http://localhost:4566',
    region: 'us-east-1',
    credentials: {
      accessKeyId: '12345',
      secretAccessKey: '12345'
    }
  }
)

const init = async () => {
  const messageAttributes = {
    Price: {
      DataType: 'N',
      StringValue: '40.5'
    },
    Quantity: {
      DataType: 'N',
      StringValue: '2'
    },
    CustomerEmail: {
      DataType: 'S',
      StringValue: 'jondo@outlook.com'
    },
    ItemSku: {
      DataType: 'S',
      StringValue: 'GR99944'
    }
  }

  //  publish a message to several topics, each of which, will handle the message in a different manner
  await snsClient.publish({
    Message: 'Order was made.',
    MessageAttributes: messageAttributes,
    TopicArn: 'arn:aws:sns:us-east-1:000000000000:order-confirmation-topic'
  }).promise()

  await snsClient.publish({
    Message: 'Order was made.',
    MessageAttributes: messageAttributes,
    TopicArn: 'arn:aws:sns:us-east-1:000000000000:order-fraud-topic'
  }).promise()
}

init()
