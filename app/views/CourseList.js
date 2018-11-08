import React, {Component} from 'react';
import { Text, View } from 'react-native';
import ajax from '../ajax';
import styles from '../styles';

class CourseList extends Component {
    async componentDidMount() {
        const courses = await ajax.fetchInitialCourses();
        console.log(courses);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}> Course List </Text>
                <Text style={styles.textFirst}> COURSE LIST </Text>
            </View>
        );
    }
}

export default CourseList;
