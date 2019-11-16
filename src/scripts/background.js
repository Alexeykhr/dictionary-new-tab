'use strict'

import DB from '@/app/DB'

const db = new DB()

/* | ------------------------------------------------------------------------------
 * | - Content Menu -
 * | ------------------------------------------------------------------------------
 */

chrome.contextMenus.remove('dictionary-new-tab')

db.init().then(() => {
  chrome.contextMenus.create({
    id: 'dictionary-new-tab',
    title: 'Add translation to dictionary',
    documentUrlPatterns: ['*://translate.google.com/*'],
    onclick: (evt, tab) => {
      chrome.tabs.executeScript(tab.id, {
        file: 'scripts/parse.js'
      }, (results) => {
        const result = results[0]
        if (!result) {
          // TODO Show notification
          return
        }

        // Return null if some property is empty
        const validationProperties = ['name', 'translate', 'lang_to']

        const isValid = validationProperties.every((validate) => {
          const val = result[validate]

          if (!val) {
            console.log('Fail', validate)
            // TODO Show notification
          }

          return val
        })

        console.log('valid', isValid, chrome)
        if (isValid) {
          db.add(result)
            .then((obj) => {
              console.log(obj)
            })
            .catch((err) => {
              // TODO Show notification
              console.log(err)
            })
        }
      })
    }
  })
})

/* | ------------------------------------------------------------------------------
 * | - Alarm -
 * | ------------------------------------------------------------------------------
 */

// chrome.alarms.create('asd', {
//   when: Date.now() + 1
// })

// chrome.notifications.create('dictionary-new-tab', {
//   type: 'basic',
//   iconUrl: '', // TODO
//   title: 'test',
//   requireInteraction: false,
//   silent: true,
//   message: 'контрольная работа'
// })

// setTimeout(() => {
//   chrome.notifications.clear('dictionary-new-tab')
// }, 2000)
