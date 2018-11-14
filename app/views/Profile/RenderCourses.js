import React from 'react';
import { View } from 'react-native'
import { Text } from 'native-base'

const RenderCourses = props => {
    const {coursesToMap} = props;
    return Courses = coursesToMap.map(function(course, i) {
        return(
            <View key={i} style={styles.coursesWrapper}>
                <Text style={styles.courseHeader}>
                    {course.courseName}
                </Text>
                <Text>
                    at {course.courseLocation}
                </Text>
                {course.courseDate && 
                    <Text>
                        {course.courseDate}
                    </Text>
                }
            </View>
        ); 
    });
}

export default RenderCourses;