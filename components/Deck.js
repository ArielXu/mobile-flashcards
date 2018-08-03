import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Deck extends Component {
  render () {
    const { deckId, state } = this.props
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          {deckId}
        </Text>
        <Text style={{textAlign: 'center'}}>
          {state[deckId].questions.length} {state[deckId].questions.length > 1 ? 'cards' : 'card'}
        </Text>
        <TextButton 
          style={{margin: 20}} 
          onPress={() => this.props.navigation.navigate(
            'AddQuestion',
            { deckId: deckId }
          )}
        >
          Add Cards
        </TextButton>
        <TextButton
          style={{margin: 20}}
          onPress={() => {
            clearLocalNotification()
              .then(setLocalNotification)
            this.props.navigation.navigate(
              'Quiz',
              { deckId: deckId }
            )
          }}>
          Start Quiz
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    state
  }
}

export default connect(mapStateToProps)(Deck)
