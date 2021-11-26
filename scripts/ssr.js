/**
 * Pre Render JavaScript
 */

const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 8989

app.use(express.static('src'))

const server = app.listen(port, () => console.log('Server started. Press Ctrl+C to quit'))

const ssr = async url => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('request', req => {
    const blacklist = ['buttons.github.io/buttons.js', 'img.shields.io']
    if (blacklist.find(regex => req.url().match(regex))) {
      return req.abort()
    }

    req.continue()
  })

  await page.goto(url, { waitUntil: 'networkidle2' })

  // https://github.com/lichtquelle/generate-static-site/blob/main/src/crawl.ts
  await page
    .evaluate(() => {
      const ssr = document.querySelectorAll('[SSROnly]')
      for (let i = 0; i < ssr.length; i++) {
        ssr[i].remove()
      }
    })
    .catch(err => {
      console.log('[evaluate] remove SSROnly', err.message)
    })

  const html = await page.content() // serialized HTML of page DOM.
  await browser.close()
  return html
}

const render = async () => {
  const html = await ssr(`http://localhost:${port}/docs.html`)
  fs.writeFileSync(path.resolve(__dirname, '../src', 'docs.html'), html)
  server.close()
  process.exit(0)
}

render()
