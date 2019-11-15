'use strict'

import HomePage from '@/app/HomePage'
import DB from '@/app/DB'

export default class Core {
  constructor() {
    this.app = document.querySelector('#app')
    this.db = new DB()
  }

  start() {
    this.db.init().onsuccess = (evt) => {
      this.db.dbRequest = evt.target.result

      const page = new HomePage(this.app, this.db)
      page.mount()
    }
  }
}
