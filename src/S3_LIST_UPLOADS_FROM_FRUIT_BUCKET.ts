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
  s3Client.listObjectsV2({
    Bucket: 'fruit-bucket'
  })
    .promise()
    .then(result => console.log('Success', result))
    .catch(error => console.error(error))
}

init()
