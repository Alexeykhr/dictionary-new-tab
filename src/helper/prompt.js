'use strict'

export function chooseWordDictionary(currentDictionary = '') {
  return prompt('Change the dictionary for this word', currentDictionary) || null
}

export function chooseGlobalDictionary(currentDictionary = '') {
  return prompt('Select the dictionary by which words will be taken', currentDictionary) || null
}

export default {
  chooseWordDictionary
}
