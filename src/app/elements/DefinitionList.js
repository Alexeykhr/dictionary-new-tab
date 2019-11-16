'use strict'

import BaseElement from '@/app/BaseElement'
import Definition from '@/app/elements/Definition'

export default class DefinitionList extends BaseElement {
  constructor() {
    super()
    this._content = ''
  }

  content(arr) {
    this._content = arr
      .reduce((result, definition) => {
        result += new Definition()
          .title(definition.name)
          .content(definition.rows)
          .output

        return result
      }, '')

    return this
  }

  get output() {
    return `
      <div>
        ${this._content}
      </div>
    `
  }
}
