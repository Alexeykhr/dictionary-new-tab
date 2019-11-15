'use strict'

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
