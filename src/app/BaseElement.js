'use strict'

export default class BaseElement {

  get output() {
    return ''
  }

  /**
   * @param {String} html representing a single element
   * @return {ChildNode}
   */
  strToElement(html) {
    const template = document.createElement('template')
    html = html.trim() // Never return a text node of whitespace as the result
    template.innerHTML = html
    return template.content.firstChild
  }

  /**
   * @returns {ChildNode}
   */
  render() {
    return this.strToElement(this.output)
  }
}
