'use strict'

import { rnd } from '@/helper/arr'

export default class DB {
  init() {
    return new Promise((resolve, reject) => {
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

      request.onsuccess = (evt) => {
        this.connection = evt.target.result

        resolve(this.connection)
      }

      request.onerror = (evt) => reject(evt)
    })
  }

  /**
   * Get random a word
   * @return {Promise<object>}
   */
  getRndWord() {
    return new Promise((resolve, reject) => {
      return this.getCountRecords()
        .then((count) => {
          if (!count) {
            reject('No Records Found')
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
                resolve(result.value)
              }
            } else {
              resolve(result.value)
            }
          }

          cursor.onerror = (evt) => reject(evt)
        })
        .catch((err) => reject(err))
    })
  }

  /**
   * Get count of records
   * @returns {Promise<number>}
   */
  getCountRecords() {
    return new Promise((resolve, reject) => {
      const count = +localStorage.getItem(this.storageCount)

      if (count) {
        resolve(count)
        return
      }

      const request = this.store.count()

      request.onsuccess = () => {
        localStorage.setItem(this.storageCount, request.result)
        resolve(request.result)
      }

      request.onerror = (evt) => reject(evt)
    })
  }

  get store() {
    if (this.connection) {
      return this.connection.transaction(['dictionary'], 'readwrite')
        .objectStore('dictionary')
    }

    return null
  }

  get storageCount() {
    return 'records_count'
  }

  get dbName() {
    return 'dictionary_new_tab'
  }

  get dbVersion() {
    return 1
  }
}
