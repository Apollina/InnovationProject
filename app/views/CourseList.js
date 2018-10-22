import React, {Component} from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';


class CourseList extends Component {
    render() {
        return (
            <ScrollView>
                <Text style={styles.textFirst}> COURSE LIST </Text>
            </ScrollView>
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

export default CourseList;

