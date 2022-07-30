import AWS from 'aws-sdk'

const s3Client = new AWS.S3({
  endpoint: 'http://localhost:4566',
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: '12345',
    secretAccessKey: '12345'
  },
  s3ForcePathStyle: true // needed for localstack
})

const init = () => {
  s3Client.getObject({
    Bucket: 'fruit-bucket',
    Key: '/assets/images/apple2.jpg'
  }).promise()
    .then(result => {
      if (result.Body) {
        const b64 = result.Body.toString('base64')
        console.log(`<img src="data:image/png;base64,${b64}" />`)
      }
    })
    .catch(error => console.error(error))
}

init()
