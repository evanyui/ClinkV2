import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

// Setup express app
const app = Express()
app.use(Express.json())

// Globals
const sessionData = {}

app.get('/', (req, res) => {
  res.send(ReactDOMServer.renderToString(
    <div>
      <div id="app"/>
      <script src="client.js"/>
    </div>
  ))
})
app.use('/', Express.static('public'))

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

  res.json(data)
})

app.listen(3000, () => {
  console.log('listening on port 3000!')
})
