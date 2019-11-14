'use strict'

import PouchDB from 'pouchdb-browser'
import HomePage from '@/pages/Home'

// Enable logs on Development mode
if (process.env.NODE_ENV === 'development') {
  PouchDB.plugin(require('pouchdb-debug').default)
  PouchDB.debug.enable('*')
}

// TODO Core - define language
// TODO Config home

// const db = new PouchDB(`dictionary_en_ru`)
// require('../languages/en-ru.json').forEach((l) => {
//   db.put(l)
// })

const page = new HomePage({ from: 'en', to: 'ru' })
page.mount('test')
  .catch(() => {
    // TODO Notification, other home?
  })
