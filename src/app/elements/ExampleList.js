'use strict'

import Example from '@/app/elements/Example'
import BaseElement from '@/app/BaseElement'

export default class ExampleList extends BaseElement {
  constructor() {
    super()
    this._content = ''
  }

  content(arr, word) {
    this._content = arr
      .reduce((result, example) => {
        result += new Example()
          .content(example, word)
          .output

        return result
      }, '')

    return this
  }

  get output() {
    return `
      <ul>
        ${this._content}
      </ul>
    `
  }
}
