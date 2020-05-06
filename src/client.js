import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main.jsx'
import { number } from 'prop-types'

const SERVICE_ENDPOINT = 'http://localhost:3000/'


// Send request to get session data and render the page
const xhr = new XMLHttpRequest()
xhr.onreadystatechange = () => {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    // const {urls, currentTab} = xhr.response
    // Dev use placeholder
    const urls = ['www.google.com', 'www.amazon.com', 'www.example.com', 'www.github.com', 'www.facebook.com']
    const currentTab = 1
    ReactDOM.render(<Main urls={urls} currentTab={currentTab}/>, document.getElementById('app'))
  }
}
xhr.responseType = 'json'
xhr.open("POST", `${SERVICE_ENDPOINT}api/getSession`, true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(JSON.stringify({
  id: window.location.hash.substring(1)
}))
