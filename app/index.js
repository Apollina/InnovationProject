import React, { Component } from 'react';
import { TabNav } from "./config/BottomNavigation";
import CoursesList from "./views/OfferedCourses/CoursesList";

export default class App extends Component {
    render() {
        return(<TabNav/>);
    }
}
