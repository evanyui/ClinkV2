import io from 'socket.io-client';

export const SERVICE_ENDPOINT = 'http://localhost:3000/'

export default class Sockets {
  constructor({afterUpdate, afterResults, afterSync}) {
    this.socket = io(SERVICE_ENDPOINT, {query: "sessionId=" + window.location.hash.substring(1)})

    this.socket.on('update', urls => {
      console.log('update! ' + urls)
      // afterUpdate(urls)
    })

    this.socket.on('result', results => {
      afterResults(results)
    })

    this.socket.on('syncSession', data => {
      const urls = data ? data.urls : []
      const currentTab = data? data.currentTab : -1

      afterSync(urls, currentTab)
    })
  }

  shareUrls({hash, urls}) {
    this.socket.emit('share', hash, urls)
  }

  search({hashKey, prevHashKey}) {
    this.socket.emit('search', hashKey, prevHashKey)
  }
}
