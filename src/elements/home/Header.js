'use strict'

import BaseElement from '@/classes/BaseElement'

export default class Header extends BaseElement {
  constructor() {
    super()
    this._word = ''
    this._translate = ''
    this._languages = ''
  }

  word(word, transcription) {
    this._word = `
      <div id="word">
        <span data-ttl>${word}</span><span id="transcription">${transcription}</span>
      </div>
    `

    return this
  }

  translate(word) {
    this._translate = `
      <div id="translate">${word}</div>
    `

    return this
  }

  languages(from, to) {
    // TODO Move from header element
    this._languages = `
      <div id="languages">
        <span>${from}</span>-<span>${to}</span>
      </div>
    `

    return this
  }

  get output() {
    const output = this._word + this._translate + this._languages

    return `<header>${output}</header>`
  }
}
