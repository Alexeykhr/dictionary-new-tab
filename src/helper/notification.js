'use strict'

import { name } from '../../package'

export function create(title, message) {
  chrome.notifications.create(name, {
    type: 'basic',
    iconUrl: 'img/book128.png',
    title: title,
    silent: true,
    message: message
  }, (notificationId) => {
    setTimeout(() => {
      chrome.notifications.clear(notificationId)
    }, 2000)
  })
}

export default {
  create
}
