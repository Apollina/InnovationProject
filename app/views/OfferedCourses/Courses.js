import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ajax from '../../ajax';
import CoursesList from './CoursesList';
import CourseDetails from './CourseDetails';


class Courses extends Component {
    // use the below to initialise state
    constructor() {
        super();
        this.state = {
            courses: [],
            currentCourseId: null,
        }
    }
    async componentDidMount() {
        const courses = await ajax.fetchInitialCourses();
        this.setState({ courses });
        console.log('COURSES' + courses);
    }
    setCurrentCourse = (courseId) => {
        this.setState({
            currentCourseId: courseId
        });
    };
    currentCourse = () => {
        return this.state.courses.data.find((course) => course.id === this.state.currentCourseId);
    };

    render() {
        if (this.state.currentCourseId) {
            return <CourseDetails course={this.currentCourse()} />;
        }
        if (Object.keys(this.state.courses).length > 0) {
            return <CoursesList courses={this.state.courses.data} onItemPress={this.setCurrentCourse}/>
        }
        return (
            <View style={styles.container}>
                    <Text style={styles.header}> Course List </Text>
            </View>
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

