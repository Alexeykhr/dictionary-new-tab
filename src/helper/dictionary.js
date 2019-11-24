'use strict'

const key = 'dictionary'

export default {
  get() {
    return localStorage.getItem(key)
  },
  set(val = '') {
    localStorage.setItem(key, val)
  }
}
