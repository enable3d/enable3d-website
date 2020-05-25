/**
 * Deploy Website to AWS S3
 */

const S3 = require('aws-sdk/clients/s3')
const CloudFront = require('aws-sdk/clients/cloudfront')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

const Bucket = process.env.BUCKET
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const DistributionId = process.env.DISTRIBUTION_ID

const s3 = new S3({ apiVersion: '2006-03-01', accessKeyId, secretAccessKey })
const cloudfront = new CloudFront({ apiVersion: '2019-03-26', accessKeyId, secretAccessKey })

const params = {
  DistributionId: DistributionId,
  InvalidationBatch: {
    CallerReference: Math.round(new Date().getTime() / 1000).toString(),
    Paths: {
      Quantity: 1,
      Items: ['/*']
    }
  }
}

const { resolve } = require('path')
const { readdir } = require('fs').promises

const getFiles = async dir => {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(res) : res
    })
  )
  return Array.prototype.concat(...files)
}

const readFile = (path, cb) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err, err.stack)
      throw err
    }
    cb(data)
  })
}

const upload = (file, data) => {
  const Key = file.match(/\/src\/[\S]+$/gm)[0].replace('/src/', '')
  const Body = data
  const ContentType = mime.getType(file)

  let CacheControl = 'public, max-age=300, s-maxage=864000' // public, 5 minutes, 10 days
  const oneMonth = 'public, max-age=2592000, s-maxage=864000' // public, 30 days, 10 days
  if (/css/.test(ContentType)) CacheControl = oneMonth
  if (/image/.test(ContentType)) CacheControl = oneMonth
  if (/model/.test(ContentType)) CacheControl = oneMonth
  if (/application/.test(ContentType)) CacheControl = oneMonth

  s3.putObject({ Bucket, Key, Body, ContentType, CacheControl }, (err, data) => {
    if (err) {
      console.log(err, err.stack)
      throw err
    }
    // an error occurred
    // else console.log(data) // successful response
  })
}

;(async () => {
  const paths = await getFiles('./src')

  paths.forEach(p => {
    readFile(p, data => {
      upload(p, data)
    })
  })

  cloudfront.createInvalidation(params, (err, data) => {
    if (err) {
      console.log(err, err.stack)
      throw err
    }
  })
})()
