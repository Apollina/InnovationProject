import React from 'react';
import {Image, View} from 'react-native'
import {Button, Text} from 'native-base'
import globalStyles from "../../styles";

const RenderCourses = props => {
    const {coursesToMap} = props;
    return Courses = coursesToMap.map(function(course, i) {
        return(
            <View key={i} style={globalStyles.course}>
                <Text style={globalStyles.H1}>{course.courseName}</Text>
                <View style={globalStyles.infoWrapper}>
                    <View style={globalStyles.textWrapper}>
                        <Text style={globalStyles.smallText}>{course.courseLocation}</Text>
                        <Text style={globalStyles.smallText}>{course.courseLocation}</Text>
                    </View>
                </View>
            </View>
        );
    });
};

export default RenderCourses;