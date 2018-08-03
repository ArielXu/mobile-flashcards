import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, orange } from '../utils/colors'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text  style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    const { title } = this.state
    const deck = {
      title: title,
      questions: []
    }
    this.props.dispatch(addDeck({ 
      [title]: deck 
    }))

    this.toNewDeck()

    this.setState(() => ({
      title: ''
    }))

    submitDeck({ title, deck })
  }

  toNewDeck = () => {
    const { title } = this.state
    this.props.navigation.navigate(
      'Deck',
      { deckId: title }
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          What is the title of the new deck?
        </Text>
        <TextInput
          value={this.state.title}
          style={styles.input}
          onChangeText={title => this.setState({ title })}/>
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  input: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: '#fff',
    margin: 24,
  },
  iosSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

export default connect()(AddDeck)
