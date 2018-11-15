import React, {Component} from 'react';
import ChatBot from 'react-native-chatbot';

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ChatBot
                steps={[
                    {
                        id: '0',
                        message: 'Welcome to course chatbot!',
                        trigger: '1',
                    },
                    {
                        id: '1',
                        message: 'If you answer some of my questions I can recommend courses for you!',
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
                        validator: (value) => {
                            if (isNaN(value)) {
                                return 'Input should be a number';
                            }
                            return true;
                        },
                        trigger: '4',
                    },
                    {
                        id: '4',
                        message: ({previousValue, steps}) => 'Alright, ' + previousValue + '',
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
                        message: ({previousValue, steps}) => 'Alright, ' + previousValue + '',
                        trigger: 8,
                    },
                    {
                        id: '8',
                        options: [
                            {value: 1, label: 'Start over', trigger: '0'},
                            {value: 2, label: 'Exit', end: true},
                        ],
                    },
                ]}
            />
        );
    }
}

export default Chatbot;

