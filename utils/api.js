import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, formatDecksData } from './_Data'

export function fetchDecksData () {
  AsyncStorage.clear()
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(formatDecksData)
}

export function submitDeck ({ key, deck }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function submitQuestion ({ deckId, newDeck }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckId]: newDeck
  }))
}
