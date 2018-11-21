import React, {Component} from 'react';
import ChatBot from 'react-native-chatbot';
import PropTypes from "prop-types";
import {Text} from "react-native";
import CourseKeywords from './CourseKeywords';

class ChatbotPage extends Component {
    constructor() {
        super();
        this.state = {
            userCategoryIndex: null,
        }
    }

    static propTypes = {
        keywordCategories: PropTypes.array.isRequired,
        ageCategories: PropTypes.array.isRequired,
        categoriesOptions: PropTypes.array.isRequired
    };

    render() {
        if (this.props.ageCategories.length !== 0 && this.props.keywordCategories.length !== 0 && this.props.categoriesOptions.length !== 0) {
                return (
                    <ChatBot
                        steps={[
                            {
                                id: '0_msg_welcome',
                                message: 'Welcome to course chatbot!',
                                trigger: '1_msg_welcome',
                            },
                            {
                                id: '1_msg_welcome',
                                message: 'If you answer some of my questions I can recommend courses for you!',
                                trigger: '2_msg_welcome',
                            },
                            {
                                id: '2_msg_welcome',
                                message: 'How old are you?',
                                trigger: '3_user_age',
                            },
                            {
                                id: '3_user_age',
                                user: true,
                                validator: (value) => {
                                    if (isNaN(value)) {
                                        return 'Input should be a number';
                                    }
                                    else if (value < 1 || value > 100) {
                                        return 'Number should be between 1 and 100';
                                    }
                                    return true;
                                },
                                trigger: '4_msg_age',
                            },
                            {
                                id: '4_msg_age',
                                message: ({previousValue, steps}) => 'Alright, ' + previousValue + '',
                                trigger: '5_msg_category',
                            },
                            {
                                id: '5_msg_category',
                                message: 'What do you like to do for a hobby?',
                                trigger: '6_options_category',
                            },
                            {
                                id: '6_options_category',
                                options: this.props.categoriesOptions
                            },
                            {
                                id: '7_msg_category',
                                message: ({previousValue, steps}) => 'Alright, ' + this.props.keywordCategories[previousValue].description,
                                trigger: '8_msg_search',
                            },
                            {
                                id: '8_msg_search',
                                message: 'I am going to search for suitable courses ...',
                                trigger: '9_custom_result',
                            },
                            {
                                id: '9_custom_result',
                                component: (
                                    <CourseKeywords keywordCategories={this.props.keywordCategories}
                                                    ageCategories={this.props.ageCategories}></CourseKeywords>
                                ),
                                trigger: '10_msg_result'
                            },
                            {
                                id: '10_msg_result',
                                message: 'You can click on a course if you like to get more information.',
                                end: true
                            },
                        ]}
                    />
                )
        } else {
            return <Text> Chatbot loading... </Text>
        }
    }
}

export default ChatbotPage;