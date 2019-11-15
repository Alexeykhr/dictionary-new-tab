'use strict'

import BaseElement from '@/app/BaseElement'

export default class Header extends BaseElement {
  constructor() {
    super()
    this._word = ''
    this._translate = ''
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

  get output() {
    const output = this._word + this._translate

    return `<header>${output}</header>`
  }
}
