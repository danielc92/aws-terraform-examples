'use strict'
const figlet = require('figlet')

module.exports.hello = async (event) => {
  console.log('[LOG] Hello from daniels-first-lambda')
  console.warn('[WARN] Test warning from daniels-first-lambda!')
  figlet('THIS IS A SIMPLE LAMBDA!', (err, result) => {
    if (!err) {
      console.log(result)
    } else {
      console.error('Failed to use figlet.')
    }
  })
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Looks like the lambda is working...',
        input: event
      },
      null,
      2
    )
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
