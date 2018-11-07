import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ajax from '../ajax';
import CoursesList from './CoursesList';


class Courses extends Component {
    // use the below to initialise state
    constructor() {
        super();
        this.state = {
            courses: [],
        }
    }
    async componentDidMount() {
        const courses = await ajax.fetchInitialCourses();
        this.setState(prevState => {
            return { courses };
        });
        console.log(courses);
    }


    render() {

        //console.log(this.state.courses);
        //console.log(Object.keys(this.state.courses).length);

        return (
            <View style={styles.container}>
                {this.state.courses.length > 0 ? (
                    <CoursesList courses={this.state.courses}/>
                ) : (
                    <Text style={styles.header}> Course List </Text>
                )}
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

