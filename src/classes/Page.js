'use strict'

export default class Page {
  constructor() {
    this.app = document.querySelector('#app')
  }

  get appEl() {
    return this.app
  }

  clear() {
    this.app.innerHTML = null
  }
}
