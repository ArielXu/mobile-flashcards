import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import { fetchDecksData } from '../utils/api'
import { connect } from 'react-redux'
import DeckCard from './DeckCard'
import { receiveDecks } from '../actions'

class DeckList extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    fetchDecksData()
      .then((decks) => dispatch(receiveDecks(decks)))
  }
  render () {
    const { decks } = this.props
    return (
      <ScrollView>
        {Object.keys(decks).map((deck) => {
          return (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'Deck',
                { deckId: deck }
              )}
              key={deck}
            >
              <DeckCard deck={decks[deck]} key={deck} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList)
