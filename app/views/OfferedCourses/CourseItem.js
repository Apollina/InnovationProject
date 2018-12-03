import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Button} from "native-base";
import globalStyles from "../../styles";
import firebase from "../../firebase";

class CourseItem extends Component {
    constructor() {
        super();
        this.state = {
            enrollPoints: 500,
            currentUserLevel: undefined,
            currentUserPoints: undefined,
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
        firebase.database().ref('levelsystem/').once('value', (snapshot) => {
            this.setState({levelSystem: snapshot.val()});
        }).then(() => {
            this.getUserInfo();
        }).catch((error) => {
            //error callback
            console.log('[CourseItem] DB getLevelSystemData() error ', error)
        })
    };

    getUserInfo() {
        firebase.database().ref('userList/').once('value', (snapshot) => {
            this.setState({currentUserLevel: snapshot.val()[0].userLevel});
            this.setState({currentUserPoints: snapshot.val()[0].points});
        }).then(() => {
            this.savePointsDB();
        }).catch((error) => {
            //error callback
            console.log('[CourseItem] DB getUserInfo() error ', error)
        })
    }

    savePointsDB() {
        console.log(this.state.currentUserLevel);
        //Max level is 6
        if (this.state.currentUserLevel != 6) {
            const newUserPoints = this.state.currentUserPoints + this.state.enrollPoints;
            if (newUserPoints >= this.state.levelSystem[this.state.currentUserLevel].points) {
                //Level up
                const newLevel = this.state.currentUserLevel + 1;
                this.setState({currentUserLevel: newLevel});
            }
            this.setState({currentUserPoints: newUserPoints});

            //Update the first user
            let updates = {};
            updates['/points'] = this.state.currentUserPoints;
            updates['/userLevel'] = this.state.currentUserLevel;

            return firebase.database().ref('userList/0').update(updates);
        }
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

