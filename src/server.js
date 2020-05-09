import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

// Setup express app
const app = Express()
app.use(Express.json())

// Globals
const sessionData = {}
const urlsDB = {} // using mem temporarily

app.get('/', (req, res) => {
  res.send(ReactDOMServer.renderToString(
    <div>
      <div id="app"/>
      <script src="client.js"/>
    </div>
  ))
})
app.use('/', Express.static('public'))

app.get('/op/getSession', function (req, res) {
  res.json(sessionData)
})

app.get('/op/getUrls', function (req, res) {
  res.json(urlsDB)
})

app.post('/api/storeSession', function (req, res) {
  // TODO: validate inputs
  const {id, urls, currentTab} = req.body
  console.log(`Storing session: ${JSON.stringify(req.body)}`)

  sessionData[id] = {urls, currentTab}

  res.sendStatus(200)
})

app.post('/api/getSession', function (req, res) {
  // TODO: validate inputs
  const {id} = req.body
  console.log(`Grabbing session: ${id}`)

  const data = sessionData[id]
  delete sessionData[id]

  res.json(data)
})

app.post('/api/share', function (req, res) {
  // TODO: validate inputs
  const { hash, urls } = req.body
  console.log(`sharing urls: ${urls} with hash ${hash}`)

  urlsDB[hash] = urls

  res.sendStatus(200)
})

// TODO : use socket.io to get urls

app.listen(3000, () => {
  console.log('listening on port 3000!')
})
