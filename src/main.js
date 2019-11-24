'use strict'

import { chooseGlobalDictionary, chooseWordDictionary } from '@/helper/prompt'
import { create as createNotification } from '@/helper/notification'
import { deleteWord } from '@/helper/confirm'
import dictionary from '@/helper/dictionary'
import DB from '@/app/DB'

const globalDictionary = dictionary.get()
const db = new DB()

db.init()
  .then(() => db.getRndWord(globalDictionary).then(mount))
  .catch((err) => {
    if (globalDictionary) {
      createNotification('Active Dictionary Removed', `${globalDictionary}: ${err}`)
      dictionary.set()
      location.reload()
      return
    }

    document.body.innerHTML = `
      ${err}: <a style="color: #fff; text-decoration: underline" href="https://github.com/Alexeykhr/dictionary-new-tab">Documentation</a>
    `
  })

function mount(obj) {
  const app = document.querySelector('#app')
  app.style.opacity = null

  /*
   * Main Content
   */

  document.querySelector('#word').textContent = obj.name
  document.querySelector('#translate').textContent = obj.translate

  /*
   * Top-Left Buttons
   */

  document.querySelector('#action-audio')
    .addEventListener('click', () => {
      chrome.tts.speak(obj.name)
    })

  document.querySelector('#action-clipboard')
    .addEventListener('click', () => {
      navigator.clipboard.writeText(obj.name)
    })

  document.querySelector('#action-google_translate')
    .setAttribute('href', `https://translate.google.com/#view=home&op=translate&sl=${obj.lang_from}&tl=${obj.lang_to}&text=${obj.name}`)

  /*
   * Top-Left buttons
   */

  const dictionaryElement = document.querySelector('#dictionary')
  const dictionaryTextElement = dictionaryElement.querySelector('span')

  dictionaryTextElement.textContent = obj._dictionary || '-'
  dictionaryElement.addEventListener('click', () => {
    // Change dictionary for this word
    db.add(Object.assign(obj, { _dictionary: chooseWordDictionary(obj._dictionary || '') }))
      .then((resp) => {
        dictionaryTextElement.textContent = resp._dictionary || '-'
      })
      .catch((err) => createNotification('Error', err))
  })

  const dictionaryGlobalElement = document.querySelector('#dictionary-global')

  if (globalDictionary) {
    dictionaryGlobalElement.setAttribute('title', globalDictionary)
  }

  dictionaryGlobalElement.addEventListener('click', () => {
    dictionary.set(chooseGlobalDictionary(globalDictionary || ''))
  })

  document.querySelector('#views > span').textContent = obj._views || '0'

  document.querySelector('#action-delete')
    .addEventListener('click', () => {
      if (deleteWord()) {
        db.delete(obj)
          .then(() => {
            createNotification('Word Successfully Deleted', obj.name)
            location.reload()
          })
          .catch((err) => createNotification('Error', err))
      }
    })

  /*
   * Detail Content
   */

  const homeContentElement = document.querySelector('.main--home__content')
  setTimeout(() => homeContentElement.style.opacity = '1')

  homeContentElement.addEventListener('click', () => {
    app.classList.add('top')

    setTimeout(() => {
      document.querySelector('.main--detail').style = null
    }, 300)
  })

  db.increaseViews(obj)
}
