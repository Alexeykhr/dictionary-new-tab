'use strict'

import Dom from '@/classes/Dom'

export default class BaseElement {

  get output() {
    return ''
  }

  render() {
    return Dom.strToElement(this.output)
  }
}
