'use strict'

/**
 * Shuffles array in place. ES6 version
 * @param {Array} arr items An array containing the items.
 * @returns {Array}
 */
export function shuffle(arr) {
  const len = arr.length

  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

/**
 * Always returns a random number between min and max (both included)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
  shuffle,
  rnd
}
