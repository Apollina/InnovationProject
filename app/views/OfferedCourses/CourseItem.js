import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Button} from "native-base";
import globalStyles from "../../styles";
import firebase from "../../firebase";
import ajax from "../../ajax";

class CourseItem extends Component {
    constructor() {
        super();
        this.state = {
            enrollPoints: 500,
            currentUserLevel: undefined,
            currentUserPoints: undefined,
            currentUserActiveCourses: undefined,
            levelSystem: {}
        }
    }

    static propTypes = {
        course: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    handlePress = () => {
        this.props.onPress(this.props.course.id);
        console.log(this.props.course.id);
    };

    getLevelSystemData = () => {
        alert('You successfully enrolled!');
        console.log('ddd');
        console.log(this.props.course);
        firebase.database().ref('levelsystem/').once('value', (snapshot) => {
            this.setState({levelSystem: snapshot.val()});
        }).then(() => {
            this.getUserInfo();
            this.getCourseLocation();
        }).catch((error) => {
            //error callback
            console.log('[CourseItem] DB getLevelSystemData() error ', error)
        })
    };

    getUserInfo() {
        firebase.database().ref('userList/').once('value', (snapshot) => {
            this.setState({currentUserLevel: snapshot.val()[0].userLevel});
            this.setState({currentUserPoints: snapshot.val()[0].points});
            this.setState({currentUserActiveCourses: snapshot.val()[0].activeCourses});
        }).then(() => {
            this.savePointsDB();
        }).catch((error) => {
            //error callback
            console.log('[CourseItem] DB getUserInfo() error ', error)
        })
    }

    savePointsDB() {
        //Max level is 6
        if (this.state.currentUserLevel != 6) {
            const newUserPoints = this.state.currentUserPoints + this.state.enrollPoints;
            if (newUserPoints >= this.state.levelSystem[this.state.currentUserLevel].points) {
                //Level up
                const newLevel = this.state.currentUserLevel + 1;
                this.setState({currentUserLevel: newLevel});
            }
            this.setState({currentUserPoints: newUserPoints});

            let updates = {};
            updates['/points'] = this.state.currentUserPoints;
            updates['/userLevel'] = this.state.currentUserLevel;
            return firebase.database().ref('userList/0').update(updates);
        }
    }

    async getCourseLocation() {
        let locationID = this.props.course.location['@id'];
        locationID = locationID.substring(0, locationID.length - 1);
        const startIndex = locationID.lastIndexOf('/');
        locationID = locationID.substring(startIndex + 1);

        const locationResponse = await ajax.fetchLocationDetails(locationID);
        const location = 'at ' + locationResponse.name.en + ': ' + locationResponse.street_address.en + ', ' + locationResponse.address_locality.en;

        this.saveCoursesDB(location);
    }

    saveCoursesDB(location) {
        //Push new course data into the courseList of the user
        let listCourses = [];
        console.log(this.state.currentUserActiveCourses);
        const newCourse = {courseLocation: location, courseName: this.props.course.name.en};
        if (this.state.currentUserActiveCourses !== undefined && this.state.currentUserActiveCourses !== null) {
            listCourses = this.state.currentUserActiveCourses;
        }
        listCourses.push(newCourse);

        let updates = {};
        updates['/activeCourses'] = listCourses;
        return firebase.database().ref('userList/0').update(updates);
    }

    render() {

        const {course} = this.props;

        return (
            <TouchableOpacity onPress={this.handlePress}>
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
                                onPress={this.handlePress}
                                title="Learn More">
                            <Text style={globalStyles.textBtn}> Learn More </Text>
                        </Button>
                        <Button bordered rounded dark style={globalStyles.enrollButton}
                                onPress={this.getLevelSystemData}
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

