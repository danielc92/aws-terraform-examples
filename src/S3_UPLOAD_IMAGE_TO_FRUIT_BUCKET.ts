import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'

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
  s3Client.upload({
    // bucket defined in resources.tf
    Bucket: 'fruit-bucket',
    // File uploads need to be converted into streams, and appended with the appropriate ContentType
    Body: fs.createReadStream(path.resolve(__dirname, './assets/images/robson-melo-H6VxhE_x-kE-unsplash.jpg')),
    ContentType: 'image/jpeg',
    Key: '/assets/images/apple1.jpg',
    ContentEncoding: 'base64',
    Metadata: {
      colour: 'Purple',
      type: 'Fuji',
      pickedOn: 'Tuesday 22nd July'
    }
  })
    .promise()
    .then(result => console.log('Successfully uploaded', result))
    .catch(error => console.error(error))

  s3Client.upload({
    // bucket defined in resources.tf
    Bucket: 'fruit-bucket',
    // File uploads need to be converted into streams, and appended with the appropriate ContentType
    Body: fs.createReadStream(path.resolve(__dirname, './assets/images/estudio-bloom-oo3kSFZ7uHk-unsplash.jpg')),
    ContentType: 'image/jpeg',
    Key: '/assets/images/apple2.jpg',
    ContentEncoding: 'base64',
    Metadata: {
      colour: 'Green',
      type: 'Granny smith',
      pickedOn: 'Tuesday 22nd July'
    }
  })
    .promise()
    .then(result => console.log('Successfully uploaded', result))
    .catch(error => console.error(error))
}

init()
