'use strict'

import { rnd } from '@/scripts/arr'

export default class DB {
  init() {
    const request = window.indexedDB.open(this.dbName, this.dbVersion)

    request.onupgradeneeded = (evt) => {
      const db = evt.target.result

      const store = db.createObjectStore('dictionary', {
        keyPath: 'id',
        autoIncrement: true
      })

      // Static
      store.createIndex('name', 'name', { unique: true })
    }

    return request
  }

  /**
   * Get random a word
   * @param {function} cb
   * @return {void} call cb
   */
  getRndWord(cb) {
    this.getCountRecords((count) => {
      if (!count) {
        cb(null)
        return
      }

      const cursor = this.store.openCursor()
      let needRandom = true

      cursor.onsuccess = (evt) => {
        const result = evt.target.result

        if (needRandom) {
          const advance = rnd(0, count - 1)
          if (advance > 0) {
            needRandom = false
            result.advance(advance)
          } else {
            cb(result.value)
          }
        } else {
          cb(result.value)
        }
      }

      cursor.onerror = () => cb(null)
    })
  }

  /**
   * Get count of records
   * @param {function} cb
   * @return {void} call cb
   */
  getCountRecords(cb) {
    localStorage.removeItem('count') // TODO Temporary

    const count = +localStorage.getItem('count')

    if (count) {
      cb(count)
      return
    }

    const request = this.store.count()

    request.onsuccess = () => {
      localStorage.setItem('count', request.result)
      cb(request.result)
    }

    request.onerror = () => cb(0)
  }

  set dbRequest(val) {
    this._dbRequest = val
  }

  get dbRequest() {
    return this._dbRequest
  }

  get store() {
    if (this._dbRequest) {
      return this._dbRequest.transaction(['dictionary'], 'readwrite') // readonly
        .objectStore('dictionary')
    }

    return null
  }

  get dbName() {
    return 'dictionary_new_tab'
  }

  get dbVersion() {
    return 1
  }
}
