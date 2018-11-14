import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import CourseItem from "./CourseItem";



class CoursesList extends React.Component {

    static propTypes = {
        courses: PropTypes.array.isRequired,
    };

    render() {
        return (
            <View style={styles.list}>
               {/* {this.props.courses.map((course) =>
                <Text key={course.key}> {course.name.en}
                </Text>
                )}*/}

                <FlatList
                    data={this.props.courses}
                    renderItem={({item}) => <CourseItem course={item}/>}
                />
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
