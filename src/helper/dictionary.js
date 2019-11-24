'use strict'

const key = 'dictionary'

export default {
  get() {
    return localStorage.getItem(key)
  },
  set(val = null) {
    localStorage.setItem(key, val)
  }
}
