class Url {
  constructor(url) {
    this.url = url
    this.timestamp = Date.now()
  }
}

class HashChannel {
  constructor(ttl) {
    this.ttl = ttl
    this.urls = []
  }

  add(url) {
    this.urls.push(url)
  }

  clean(timeNow) {
    this.urls = this.urls.filter(urlObj => Math.abs(timeNow - urlObj.timestamp) < this.ttl)
  }

  getUrls() {
    this.clean(Date.now())
    return this.urls.map(urlObj => urlObj.url)
  }

  isEmpty() {
    return this.urls.length == 0
  }
}

export default class MemDB {
  constructor({ttl}) {
    this.db = new Map()
    this.ttl = ttl
  }

  initializeCleanUp(interval) {
    setInterval(this.clean, interval)
  }

  put({hash, url}) {
    if (!this.db.has(hash)) {
      this.db.set(hash, new HashChannel(this.ttl))
    }

    this.db.get(hash).add(new Url(url))
  }

  putBatch({hash, urls}) {
    for (const url of urls) {
      this.put({hash, url})
    }
  }

  get(hash) {
    if (!this.db.has(hash)) {
      return []
    }

    return this.db.get(hash).getUrls()
  }

  clean() {
    const timeNow = Date.now()
    for (const [key, value] of this.db.entries()) {
      value.clean(timeNow)

      if (value.isEmpty()) {
        this.db.delete(key)
      }
    }
  }
}