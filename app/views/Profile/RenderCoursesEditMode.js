import React, {Component} from 'react';
import { View } from 'react-native'
import {Button, Text} from 'native-base'
import globalStyles from "../../styles";
import PropTypes from "prop-types";
import firebase from "../../firebase";

class RenderCoursesEditMode extends Component {
    static propTypes = {
        courseIndex: PropTypes.number.isRequired,
        activeCourses: PropTypes.array.isRequired
    };

    saveCourseCancellation = () => {
        this.props.activeCourses.splice(this.props.courseIndex, 1);
        let updates = {};
        updates['/activeCourses'] = this.props.activeCourses;
        return firebase.database().ref('userList/0').update(updates);
    };

    render() {
        console.log(this.props.activeCourses);
        return (
            <View style={globalStyles.btnWrapper}>
                <Button bordered rounded dark style={globalStyles.editButton}
                        onPress={this.saveCourseCancellation}
                        title="Cancel Enrollment">
                    <Text style={globalStyles.textBtn}> Cancel Enrollment </Text>
                </Button>
            </View>
        );
    }
}

export default RenderCoursesEditMode;
