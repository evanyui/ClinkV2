import {strict as assert} from 'assert'
import MemDB from '../../src/lib/memDB'

describe('memDB', function() {

  const memDB = new MemDB({ttl: 1000})
  describe('put()', function() {
    it('should create new hash channel if it does not exist', function() {
      memDB.put({hash: '123', url: 'www.test.com'})
      assert.equal(memDB.get('123')[0], 'www.test.com')
    })
  })

  describe('put()', function() {
    it('should add to existing channel', function() {
      memDB.put({hash: '123', url: 'www.another.com'})
      assert.equal(memDB.get('123')[1], 'www.another.com')
    })
  })

  describe('putBatch()', function() {
    it('should add multiple urls in batches', function() {
      memDB.putBatch({hash: '123', urls: ['www.test1.com', 'www.test2.com']})
      assert.equal(memDB.get('123')[3], 'www.test2.com')
    })
  })

  describe('get()', function() {
    it('should get urls from existing channel', function() {
      assert.equal(memDB.get('123').length, 4)
    })
  })

  describe('clean()', function() {
    it('should not get urls that are expired', function(done) {
      setTimeout(function() {
        memDB.clean()
        assert.equal(memDB.get('123').length, 0)
        done()
      }, 1200)
    })
  })

  describe('clean()', function() {
    it('should delete empty hashChannels', function() {
      assert.equal(memDB.db.size, 0)
    })
  })
})