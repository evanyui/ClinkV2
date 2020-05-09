import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main.jsx'
import io from 'socket.io-client';

export const SERVICE_ENDPOINT = 'http://localhost:3000/'

export const socket = io('http://localhost:3000/', {query: "sessionId=" + window.location.hash.substring(1)})

socket.on('syncSession', data => {
  console.log("Synced data: " + data)
// const urls = ['www.google.com', 'www.amazon.com', 'www.example.com', 'www.github.com', 'www.facebook.com']
// const currentTab = 1
  const urls = data ? data.urls : []
  const currentTab = data? data.currentTab : -1
  ReactDOM.render(<Main urls={urls} currentTab={currentTab}/>, document.getElementById('app'))
})
