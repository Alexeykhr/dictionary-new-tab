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
        store.createIndex('_dictionary', '_dictionary', { unique: false })
      }

      request.onsuccess = (evt) => {
        this.connection = evt.target.result
        resolve(this.connection)
      }

      request.onerror = reject
    })
  }

  /**
   * Get random a word
   * @param {string|null} dictionary
   * @return {Promise<object>}
   */
  getRndWord(dictionary = null) {
    return new Promise((resolve, reject) => {
      const selectWord = (result) => {
        if (result) {
          resolve(result.value)
        } else {
          reject('Word not found')
        }
      }

      return this.getCountRecords(dictionary)
        .then((count) => {
          if (!count) {
            reject('No Records Found')
            return
          }

          const cursor = dictionary
            ? this.store.index('_dictionary').openCursor(dictionary)
            : this.store.openCursor()

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
        .catch(reject)
    })
  }

  /**
   * Get count of records
   * @param {string|null} dictionary
   * @returns {Promise<number>}
   */
  getCountRecords(dictionary = null) {
    return new Promise((resolve, reject) => {
      const request = dictionary
        ? this.store.index('_dictionary').count(dictionary)
        : this.store.count()

      request.onsuccess = () => resolve(request.result)
      request.onerror = reject
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
        reject('No database connection')
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

      request.onerror = reject
    })
  }

  /**
   * @param {object} record - word
   */
  delete(record) {
    return new Promise((resolve, reject) => {
      if (!this.store) {
        reject('No database connection')
        return
      }

      const request = this.store.delete(record.id)

      request.onsuccess = resolve
      request.onerror = reject
    })
  }

  /**
   * @param {object} record - word
   */
  increaseViews(record) {
    record._view_at = Date.now()
    record._views = (+record._views || 0) + 1
    this.store.put(record)
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
