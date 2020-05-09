import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import SocketIO from 'socket.io';
import http from 'http';

// Setup express app
const app = Express()
app.use(Express.json())

// Setup socket.io
const server = http.Server(app)
const io = new SocketIO(server)

// Globals
const sessionData = {}
// TODO: clean memory with some scheme
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

// NOT used in client, just for dev
app.post('/api/getSession', function (req, res) {
  const {id} = req.body
  console.log(`Grabbing session: ${id}`)

  const data = sessionData[id]
  delete sessionData[id]

  res.json(data)
})

// NOT used in client, just for dev
app.post('/api/share', function (req, res) {
  const { hash, urls } = req.body
  console.log(`sharing urls: ${urls} with hash ${hash}`)

  urlsDB[hash] = urls

  res.sendStatus(200)
})

io.on('connection', socket => {
  const sessionId = socket.handshake.query.sessionId;
  console.log(`Grabbing data with sessionId: ${sessionId}`)
  const data = sessionData[sessionId]
  delete sessionData[sessionId]
  socket.emit('syncSession', data)

  // When user share urls
  socket.on('share', (hash, urls) => {
    console.log(`sharing urls: ${urls} with hash ${hash}`)
    urlsDB[hash] = urls
  })
})

// TODO : use socket.io to get urls

server.listen(3000, () => {
  console.log('listening on port 3000!')
})
