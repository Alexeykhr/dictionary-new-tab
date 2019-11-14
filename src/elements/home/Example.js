'use strict'

import BaseElement from '@/classes/BaseElement'

export default class Example extends BaseElement {
  constructor() {
    super()
    this._content = ''
  }

  content(text, word) {
    this._content = text.replace(this.regex(word), '<strong>$&</strong>')

    return this
  }

  // TODO Improved regex
  regex(word) {
    return new RegExp(word + '(?!([^<]+)?<)', 'gi')
  }

  get output() {
    return `
      <li>
        ${this._content}
      </li>
    `
  }
}
