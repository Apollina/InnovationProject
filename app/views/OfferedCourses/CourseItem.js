import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Button} from "native-base";
import globalStyles from "../../styles";

class CourseItem extends Component {

    static propTypes = {
        course: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    handlePress = () => {
        this.props.onPress(this.props.course.id);
        console.log(this.props.course.id);
    };

    render() {

        const {course} = this.props;

        return (
            <TouchableOpacity onPress = {this.handlePress}>
                <View style={globalStyles.course}>
                <Text style={globalStyles.H1}>{course.name.en}</Text>
                <View style={globalStyles.infoWrapper}>
                    <Image
                        source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                        //source={{uri: course.images[0]}}
                        style={globalStyles.profilePicture}
                    />
                    <View style={globalStyles.textWrapper}>
                    <Text style={globalStyles.smallText}>Start time: {course.start_time}</Text>
                    <Text style={globalStyles.smallText}>End time: {course.end_time}</Text>
                    </View>
                </View>
                <View style={globalStyles.btnWrapper}>
                    <Button bordered rounded dark style={globalStyles.editButton}
                            onPress = {this.handlePress}
                            title="Learn More">
                        <Text style={globalStyles.textBtn}> Learn More </Text>
                    </Button>
                    <Button bordered rounded dark style={globalStyles.enrollButton}
                            title="Enroll">
                        <Text style={globalStyles.textBtn}> Enroll </Text>
                    </Button>
                </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CourseItem;

