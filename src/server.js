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
  const {id, urls, currentTab} = req.body
  sessionData[id] = {urls, currentTab}
  res.sendStatus(200)
})

io.on('connection', socket => {
  const sessionId = socket.handshake.query.sessionId;
  const data = sessionData[sessionId]
  delete sessionData[sessionId]
  socket.emit('syncSession', data)

  // When user share urls
  socket.on('share', (hash, urls) => {
    urlsDB[hash] = urlsDB[hash]? [...urlsDB[hash], ...urls] : urls
    socket.broadcast.to(hash).emit('update', urls)
  })

  // When user search
  socket.on('search', (hashKey, prevHashKey) => {
    socket.leave(prevHashKey)
    socket.join(hashKey)

    const results = urlsDB[hashKey]
    socket.emit('result', results)
  })
})

server.listen(3000, () => {
  console.log('listening on port 3000!')
})
