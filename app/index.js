import React, { Component } from 'react';
import { TabNav } from "./config/BottomNavigation";
import Keywords from "./views/Chatbot/Keywords";
console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return(<TabNav/>);
    }
}
