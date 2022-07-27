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
    Bucket: 'fruit-bucket',
    Body: fs.createReadStream(path.resolve(__dirname, './assets/images/estudio-bloom-oo3kSFZ7uHk-unsplash.jpg')),
    Key: '/assets/images/apple2.jpg',
    ContentType: 'image/jpeg',
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
