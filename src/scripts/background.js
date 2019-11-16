'use strict'

console.log('background js')

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

chrome.contextMenus.remove('dictionary-new-tab')
chrome.contextMenus.create({
  id: 'dictionary-new-tab',
  title: 'Some title',
  documentUrlPatterns: ['*://translate.google.com/*'],
  onclick: (evt, tab) => {
    chrome.tabs.executeScript(tab.id, {
      file: 'scripts/parse.js'
    }, (results) => {
      // TODO Validation input
      console.log(results[0])
    })
  }
})
