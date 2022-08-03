import AWS from 'aws-sdk'
import { execArgv } from 'process'

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
    // bucket defined in resources.tf
    Bucket: 'fruit-bucket',
    // changing the prefix to something that isnt /assets should return an empty array

    // to filter images can change the prefix path
    // eg. /assets/images or /assets/videos

    Prefix: '/assets/images/apple1.jpg'
  })
    .promise()
    .then(result => console.log('Success', result))
    .catch(error => console.error(error))
}

init()
