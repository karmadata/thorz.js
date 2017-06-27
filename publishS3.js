require('dotenv').config()
const s3 = require('s3')
const pjson = require('./package.json')

const client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
})

let paramsFolder = {
  localDir: './dist',
  deleteRemoved: true,
  s3Params: {
    Bucket: process.env.BUCKET_NAME,
    Prefix: `js/thorz-${pjson.version}/`
  }
}

let uploader = client.uploadDir(paramsFolder)
uploader.on('error', function(err) {
  console.error(`Unable to sync ${paramsFolder.localDir}:`, err, err.stack)
})

uploader.on('end', function() {
  console.log(`Published ${paramsFolder.localDir} to ${paramsFolder.s3Params.Prefix}`)
})
