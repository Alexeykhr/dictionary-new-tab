'use strict'

import Example from '@/app/elements/Example'
import Section from '@/app/elements/Section'
import { shuffle, rnd } from '@/scripts/arr'
import Header from '@/app/elements/Header'

export default class HomePage {
  constructor(app, db) {
    this.app = app
    this.db = db
  }

  mount() {
    this.getCountRecords((count) => {
      if (!count) {
        console.log('no count')
        // TODO
        return
      }

      const request = this.db.store.get(rnd(1, count))

      request.onsuccess = () => {
        if (request.result) {
          console.log(request.result, count)
          this.generate(request.result)
        } else {
          console.log('DATA NOT FOUND')
        }
      }

      request.onerror = (evt) => {
        console.log('Error', request, evt, count)
      }
    })

    // console.log(this.dbRequest, this.app, request)
    // this.dbRequest
    // return this.db.get(word)
    //   .then((resp) => {
    //     this.clear()
    //     this.data = resp
    //
    //     this.app.append(this.htmlHeader)
    //     this.app.append(this.htmlDefinitions)
    //     this.app.append(this.htmlExamples)
    //   })
  }

  generate(word) {
    console.log('generate', word)
  }

  get htmlHeader() {
    return new Header()
      .word(this.data._id, this.data.transcription)
      .translate(this.data.translate)
      .render()
  }

  get htmlExamples() {
    if (!this.data.examples) {
      return ''
    }

    const examplesHtml = shuffle(this.data.examples)
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

  getCountRecords(cb) {
    localStorage.removeItem('count') // TODO Temporary

    const count = +localStorage.getItem('count')

    if (count) {
      cb(count)
      return
    }

    const request = this.db.store.count()

    request.onsuccess = () => {
      localStorage.setItem('count', request.result)
      cb(request.result)
    }

    request.onerror = () => cb(0)
  }
}
