import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from "native-base";
import globalStyles from "../../styles";
import ajax from '../../ajax';

class CourseDetails extends Component {

    static propTypes = {
        initialCourseData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    };
    state = {
        course: this.props.initialCourseData,
    };
    async componentDidMount() {
        const fullDeal = await ajax.fetchICourseDetails(this.state.course.id);
        console.log('FULL DEAL' + fullDeal);
        this.setState({
            deal: fullDeal,
        })

    }

    render() {
        const { course } = this.state;

        return (
            <ScrollView>
            <View style={globalStyles.courseDetailsPage}>
                <TouchableOpacity onPress={this.props.onBack}>
                <Text style={globalStyles.backLink}>Go back</Text>
                </TouchableOpacity>
                <Text style={globalStyles.H1}>{course.name.en}</Text>
                <View style={globalStyles.infoWrapper}>
                    <Image
                        source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                        style={globalStyles.profilePicture}
                    />
                    <View style={globalStyles.textWrapper}>
                        <Text style={globalStyles.smallText}>Start time: {course.start_time}</Text>
                        <Text style={globalStyles.smallText}>End time: {course.end_time}</Text>
                    </View>
                </View>
                <Text style={globalStyles.smallText}>{course.description.en}</Text>
                <View style={globalStyles.btnWrapper}>
                    <Button bordered rounded dark style={globalStyles.enrollButton}
                            title="Enroll">
                        <Text style={globalStyles.textBtn}> Enroll </Text>
                    </Button>
                </View>
            </View>
            </ScrollView>

        );
    }
}

export default CourseDetails;

