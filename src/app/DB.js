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
      const selectWord = (result) => {
        if (result) {
          resolve(result.value)
        } else {
          reject('Word not found')
        }
      }

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

            if (!result) {
              reject('Something went wrong')
              return
            }

            if (needRandom) {
              const advance = rnd(0, count - 1)

              if (advance > 0) {
                needRandom = false
                result.advance(advance)
              } else {
                selectWord(result)
              }
            } else {
              selectWord(result)
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
      const request = this.store.count()

      request.onsuccess = () => resolve(request.result)
      request.onerror = (evt) => reject(evt)
    })
  }

  /**
   * Add ew Translate to database
   * @param {object} obj
   * @returns {Promise<object>}
   */
  add(obj) {
    return new Promise((resolve, reject) => {
      if (!this.store) {
        reject('No database connections')
        return
      }

      const request = this.store.index('name').get(obj.name)

      request.onsuccess = () => {
        const data = Object.assign(request.result || {}, obj, { updated_at: Date.now() })

        if (request.result) {
          this.store.put(data)
        } else {
          this.store.add(data)
        }

        resolve(data)
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

  get dbName() {
    return 'dictionary_new_tab'
  }

  get dbVersion() {
    return 1
  }
}
