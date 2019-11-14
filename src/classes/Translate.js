'use strict'

export default class Translate {
  static url(from, to, text) {
    return `${Translate.DOMAIN}/?hl=${from}#view=home&op=translate&sl=${to}&tl=${from}&text=${text}`
  }

  static get DOMAIN() {
    return 'https://translate.google.com'
  }
}
