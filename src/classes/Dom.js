'use strict'

export default class Dom {

  /**
   * @param {String} html representing a single element
   * @return {ChildNode}
   */
  static strToElement(html) {
    const template = document.createElement('template')
    html = html.trim() // Never return a text node of whitespace as the result
    template.innerHTML = html
    return template.content.firstChild
  }
}
