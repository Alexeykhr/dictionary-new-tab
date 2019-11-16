'use strict'

import BaseElement from '@/app/BaseElement'

export default class DefinitionList extends BaseElement {
  constructor() {
    super()
    this._title = ''
    this._content = ''
  }

  title(text) {
    this._title = text

    return this
  }

  content(list) {
    this._content = list.reduce((result, item) => {
      result += `
        <li class="definition-item">
          <div class="definition-item-name">${item.name}</div>
          ${item.example ? `<div class="definition-item-example">${item.example}</div>` : ''}
        </li>
      `

      return result
    }, '')

    return this
  }

  get output() {
    return `
      <div class="definition">
        <p class="definition-name">
          ${this._title}
        </p>
        <ul class="definition-list">
          ${this._content}
        </ul>
      </div>
    `
  }
}
