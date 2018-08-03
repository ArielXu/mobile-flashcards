import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { white, orange } from '../utils/colors'

class Quiz extends Component {
  state = {
    quesCounter: 0,
    correctCounter: 0,
    incorrectCounter: 0,
    showAnswer: false
  }
  render () {
    const { decks, deckId } = this.props
    const { quesCounter, correctCounter, incorrectCounter, showAnswer } = this.state
    const questions = decks[deckId].questions
    const remainedQues = questions.length - quesCounter - 1
    return (
      <View style={styles.quizCard}>
        {quesCounter < questions.length
          ? <View>
              <Text style={{fontSize: 20, textAlign: 'center'}}>{showAnswer === false ? questions[quesCounter].question : questions[quesCounter].answer}</Text>
              <TextButton 
                style={{margin: 20}} 
                onPress={() => this.setState({
                  showAnswer: !showAnswer
                })}
              >
                {showAnswer === false ? 'Show Answer' : 'Show Question'}
              </TextButton>
              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                onPress={() => this.setState({
                  quesCounter: quesCounter + 1,
                  correctCounter: correctCounter + 1,
                  showAnswer: false
                })}>
                  <Text  style={styles.submitBtnText}>CORRECT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                onPress={() => this.setState({
                  quesCounter: quesCounter + 1,
                  incorrectCounter: incorrectCounter + 1,
                  showAnswer: false
                })}>
                  <Text  style={styles.submitBtnText}>INCORRECT</Text>
              </TouchableOpacity>
              <Text style={{textAlign: 'center'}}>{remainedQues} {remainedQues > 1 ? 'questions' : 'question'} {remainedQues > 1 ? 'remain' : 'remains'}</Text>
            </View>
          : <View>
              <Text>Your Score</Text>
              <Text>{Math.floor((correctCounter / (correctCounter + incorrectCounter)) * 100)}</Text>
              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                onPress={() => this.setState({
                  quesCounter: 0,
                  correctCounter: 0,
                  incorrectCounter: 0,
                  showAnswer: false
                })}>
                  <Text  style={styles.submitBtnText}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                onPress={() => {
                  this.props.navigation.goBack()
                }}>
                  <Text  style={styles.submitBtnText}>Go Back To Deck</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  quizCard: {
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
  },
  iosSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

function mapStateToProps (decks, { navigation }) {
  const { deckId } = navigation.state.params
  return {
    decks,
    deckId
  }
}
export default connect(mapStateToProps)(Quiz)