import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ajax from '../../ajax';
import CoursesList from './CoursesList';
import CourseDetails from './CourseDetails';
import LoadingWheel from "../../components/LoadingWheel";
import PropTypes from "prop-types";

class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: {},
            images: [],
            currentCourseId: null,
        }
    }

    static propTypes = {
        filteredCourses: PropTypes.object
    };

    async componentDidMount() {
        if (this.props.filteredCourses !== undefined && this.props.filteredCourses !== null) {
            this.setState({courses: this.props.filteredCourses});
        } else {
            const courses = await ajax.fetchInitialCourses();
            this.setState({courses});
        }
    }

    setCurrentCourse = (courseId) => {
        this.setState({
            currentCourseId: courseId
        });
    };
    unsetCurrentCourse = () => {
        this.setState({
            currentCourseId: null
        });
    };
    currentCourse = () => {
        return this.state.courses.data.find((course) => course.id === this.state.currentCourseId);
    };

    render() {
        if (this.state.currentCourseId) {
            return <CourseDetails initialCourseData={this.currentCourse()} onBack={this.unsetCurrentCourse}/>;
        }
        if (Object.keys(this.state.courses).length > 0) {
            return <CoursesList courses={this.state.courses.data} onItemPress={this.setCurrentCourse}/>
        }
        return (
            <LoadingWheel/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    header: {
        fontSize: 40,
    },
    textFirst: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 300,
    },
});

export default Courses;

