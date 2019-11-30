'use strict'

import { create as createNotification } from '@/helper/notification'
import { chooseWordDictionary } from '@/helper/prompt'
import dictionary from '@/helper/dictionary'
import { name } from '../../package.json'
import DB from '@/app/DB'

const db = new DB()

/* | ------------------------------------------------------------------------------
 * | - Content Menu -
 * | ------------------------------------------------------------------------------
 */

db.init().then(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: name,
      title: 'Add translate to dictionary',
      documentUrlPatterns: [
        '*://translate.google.com/*',
        '*://translate.google.com.ru/*',
        '*://translate.google.com.ua/*'
      ],
      onclick: (evt, tab) => {
        chrome.tabs.executeScript(tab.id, {
          file: 'scripts/parse.js'
        }, (results) => {
          const result = results[0]
          if (!result) {
            createNotification('Error', 'No results found')
            return
          }

          // Return null if some property is empty
          const validationProperties = ['name', 'translate', 'lang_to']

          const isValid = validationProperties.every((validate) => {
            const val = result[validate]

            if (!val) {
              createNotification('Validation is failed', validate)
            }

            return val
          })

          if (isValid) {
            result._dictionary = chooseWordDictionary(dictionary.get() || '')

            db.add(result)
              .then(() => createNotification('Translation added', result.name))
              .catch((err) => createNotification(err))
          }
        })
      }
    })
  })
})
