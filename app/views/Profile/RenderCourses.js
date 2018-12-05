import React from 'react';
import {Image, View} from 'react-native'
import {Button, Text} from 'native-base'
import globalStyles from "../../styles";
import RenderCoursesEditMode from "./RenderCoursesEditMode";

const RenderCourses = props => {
    const {coursesToMap} = props;
    const {editMode} = props;
    return Courses = coursesToMap.map(function(course, i) {
        return(
            <View key={i} style={globalStyles.course}>
                <Text style={globalStyles.H1}>{course.courseName}</Text>
                <View style={globalStyles.infoWrapper}>
                    <View style={globalStyles.textWrapper}>
                        <Text style={globalStyles.smallText}>{course.locationName}</Text>
                        <Text style={globalStyles.smallText}>{course.locationAddress}</Text>
                    </View>
                </View>
                {editMode !== undefined && editMode &&
                    <RenderCoursesEditMode activeCourses={coursesToMap} courseIndex={i}/>
                }
            </View>
        );
    });
};

export default RenderCourses;