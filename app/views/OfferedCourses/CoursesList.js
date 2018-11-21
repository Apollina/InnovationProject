import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList} from 'react-native';
import CourseItem from "./CourseItem";
import globalStyles from "../../styles";



class CoursesList extends React.Component {

    static propTypes = {
        courses: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={globalStyles.listOfCourses}>
                <FlatList
                    data={this.props.courses}
                    renderItem={({item}) => <CourseItem course={item} onPress={this.props.onItemPress}/>}
                />
            </View>
        );
    }
}

export default CoursesList;
