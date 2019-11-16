'use strict'

import DefinitionList from '@/app/elements/DefinitionList'
import ExampleList from '@/app/elements/ExampleList'
import { exists, shuffle } from '@/helper/arr'
import Section from '@/app/elements/Section'
import Header from '@/app/elements/Header'

export default class HomePage {
  constructor(app, db) {
    this.app = app
    this.db = db
  }

  mount() {
    this.db.getRndWord()
      .then((word) => {
        this.data = word

        this.app.append(this.htmlHeader)

        if (exists(this.data.definitions)) {
          this.app.append(this.htmlDefinitions)
        }

        if (exists(this.data.examples)) {
          this.app.append(this.htmlExamples)
        }
      })
      .catch((evt) => {
        // TODO Show notification
        console.log(evt)
      })
  }

  get htmlHeader() {
    return new Header()
      .word(this.data.name, this.data.transcription)
      .translate(this.data.translate)
      .render()
  }

  get htmlExamples() {
    const data = shuffle(this.data.examples).slice(0, 5)

    return new Section('section-examples')
      .title('Примеры')
      .content(new ExampleList()
        .content(data, this.data.name)
        .output
      )
      .render()
  }

  get htmlDefinitions() {
    return new Section('section-definitions')
      .title('Определения')
      .content(new DefinitionList()
        .content(this.data.definitions)
        .output
      )
      .render()
  }
}
