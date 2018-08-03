import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, orange } from '../utils/colors'
import { addQuestion } from '../actions'
import { submitQuestion } from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text  style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddQuestion extends Component {
  state = {
    question: '',
    answer: '',
  }

  submit = () => {
    const { question, answer } = this.state
    const { deckId, decks } = this.props
    const que = {
      question: question,
      answer: answer
    }
    const newDeck = {
      title: deckId,
      questions: decks[deckId].questions.concat([que])
    }
    this.props.dispatch(addQuestion(deckId, que))

    this.setState(() => ({
      question: '',
      answer: ''
    }))

    this.toHome()

    submitQuestion({ deckId, newDeck })
  }

  toHome = () => {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>
          What is the question?
        </Text>
        <TextInput
          value={this.state.question}
          style={styles.input}
          onChangeText={question => this.setState({ question })}/>
        <Text style={{textAlign: 'center'}}>
          What is the answer of this question?
        </Text>
        <TextInput
          value={this.state.answer}
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}/>
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

function mapStateToProps (decks, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    deckId,
    decks
  }
}

export default connect(mapStateToProps)(AddQuestion)
