import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import { white } from '../utils/colors'

class DeckCard extends Component {
  render () {
    const { deck } = this.props
    return (
      <View style={styles.deckCard} key={deck.title}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          {deck.title}
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center'}}>
          {deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckCard: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
})

export default DeckCard
