import React, {Component} from 'react';
import { Platform, View, ScrollView, Text, StyleSheet } from 'react-native';
import ChatBot from 'react-native-chatbot';

const steps = [
  {
    id: '0',
    message: 'Welcome to course chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'If you answer some of my questions I can recommmend courses for you!',
    trigger: '2',
  },
  {
    id: '2',
    message: 'How old are you?',
    trigger: '3',
  },
  {
    id: '3',
	user: true,
	validator: ({ currentStep, steps})  => 'Input number only',
    trigger: '4',
  },
  {
	id: '4',
    message: ({ previousValue, steps }) => 'Alright, ' + previousValue + '',
    trigger: '5',
  },
  {
    id: '5',
	message: 'What do you like to do for a hobby?',
    trigger: '6',
  },
  {
    id: '6',
	user: true,
    trigger: '7',
  },
  {
	id: '7',
    message: ({ previousValue, steps }) => 'Alright, ' + previousValue + '',
    trigger: 8,
  },
  {
  id: '8',
  options: [
    { value: 1, label: 'Start over', trigger: '0' },
    { value: 2, label: 'Exit', end: true },
  ],
  },
];


type Props = {};
class ChatbotPage extends Component<Props> {
    render() {
        return (
           <ChatBot steps={steps} />
        );
    }
}
const styles = StyleSheet.create({
    textFirst: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 300,
    },
});

export default ChatbotPage;

