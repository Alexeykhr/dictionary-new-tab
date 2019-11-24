'use strict'

const key = 'dictionary'

export default {
  get() {
    return localStorage.getItem(key)
  },
  set(val = null) {
    if (val) {
      localStorage.setItem(key, val)
    } else {
      localStorage.removeItem(key)
    }
  }
}
