'use strict'

import BaseElement from '@/app/BaseElement'

export default class Section extends BaseElement {
  constructor(section) {
    super()
    this._title = ''
    this._content = ''
    this._section = section
  }

  title(title) {
    this._title = `
      <div class="section--title">${title}</div>
    `

    return this
  }

  content(content) {
    this._content = `
      <div class="section--content">${content}</div>
    `

    return this
  }

  get output() {
    return `
      <section class="${this._section}">
        ${this._title + this._content}
      </section>
    `
  }
}
