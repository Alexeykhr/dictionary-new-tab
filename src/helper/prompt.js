'use strict'

export function chooseWordDictionary(currentDictionary = '') {
  return prompt('Change the dictionary for this word', currentDictionary)
}

export function chooseGlobalDictionary(currentDictionary = '') {
  return prompt('Select the dictionary by which words will be taken', currentDictionary)
}

export default {
  chooseWordDictionary
}
