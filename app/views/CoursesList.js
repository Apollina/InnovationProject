import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';


class CoursesList extends React.Component {

    static propTypes = {
        courses: PropTypes.array.isRequired,
    };

    render() {
        return (
            <View style={styles.list}>
                <Text> Courses.. </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        paddingTop: 50,
    }
});

export default CoursesList;
