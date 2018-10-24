import React, {Component} from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import ajax from '../ajax';


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

export default CourseList;

