'use strict'

import Example from '@/elements/home/Example'
import Section from '@/elements/home/Section'
import Header from '@/elements/home/Header'
import Translate from '@/classes/Translate'
import PouchDB from 'pouchdb-browser'
import Page from '@/classes/Page'
import Arr from '@/classes/Arr'

const TABLE_NAME = 'dictionary'

export default class Home extends Page {
  constructor({ from, to }) {
    super()
    this.toLocale = to
    this.fromLocale = from
    this.data = null
    this.db = new PouchDB(`${TABLE_NAME}_${from}_${to}`)

    document.addEventListener('keydown', this.onKeydownHandler)
  }

  mount(word) {
    return this.db.get(word)
      .then((resp) => {
        this.clear()
        this.data = resp

        this.app.append(this.htmlHeader)
        this.app.append(this.htmlDefinitions)
        this.app.append(this.htmlExamples)

        this.registerTtlClickEvent()
      })
  }

  get htmlHeader() {
    return new Header()
      .word(this.data._id, this.data.transcription)
      .languages(this.fromLocale, this.toLocale)
      .translate(this.data.translate)
      .render()
  }

  get htmlExamples() {
    if (!this.data.examples) {
      return ''
    }

    const examplesHtml = Arr.shuffle(this.data.examples)
      .slice(0, 5)
      .reduce((result, example) => {
        result += new Example()
          .content(example, this.data._id)
          .output

        return result
      }, '')

    return new Section('section-examples')
      .title('Примеры')
      .content(`<ul>${examplesHtml}</ul>`)
      .render()
  }

  get htmlDefinitions() {
    if (!this.data.definitions) {
      return ''
    }

    const definitionsHtml = this.data.definitions
      .slice(0, 5)
      .reduce((result, example) => {
        result += `
        <p class="name">${example.name}</p>
        <ul>
          <li>
            123
          </li>
        </ul>`

        return result
      }, '')

    return new Section('section-definitions')
      .title('Определения')
      .content(definitionsHtml)
      .render()
  }

  onKeydownHandler(evt) {
    // S - Speak this word
    if (this.data && evt.altKey && evt.key === 's') {
      window.chrome.tts.speak(this.data._id)
    }

    // Q - Query. Go to Google Translate home with this word
    if (evt.altKey && evt.key === 'q') {
      window.location = Translate.url(this.fromLocale, this.toLocale, this.data._id)
    }

    // Next Word
    if (evt.key === 'space') {
      // TODO Next word
    }
  }

  registerTtlClickEvent() {
    this.app.querySelectorAll('[data-ttl]')
      .forEach((el) => {
        el.addEventListener('click', (evt) => {
          window.chrome.tts.speak(evt.target.textContent)
        })
      })
  }

  destroy() {
    super.clear()
    document.removeEventListener('keydown', this.onKeydownHandler)
  }
}
