'use strict'

const key = 'dictionary'

export default {
  get(cb) {
    chrome.storage.sync.get([key], (val) => {
      cb(val.dictionary)
    })
  },
  set(val = null) {
    chrome.storage.sync.set({ [key]: val })
  }
}
