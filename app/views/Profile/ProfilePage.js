import React, {Component} from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Container, Button} from 'native-base'
import DatePicker from 'react-native-datepicker'
import styles from '../../styles';
import firebase from '../../firebase';
import ProfileInfo from './ProfileInfo';
import RenderCourses from './RenderCourses';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditing: false,
            userData: {},
            levelData: {},
            levelSystem: [],
            date: new Date(),
            isLoading: true
        };
    }

    async componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        firebase.database().ref('userList/').once('value', (snapshot) => {
            console.log(snapshot.val()[0]);
            this.setState({userData: snapshot.val()[0]});
        }).then(() => {
            this.getLevelSystemData();
        }).catch((error) => {
            //error callback
            console.log('[ProfilePage] DB getUserInfo() error ', error)
        })
    }

    getLevelSystemData() {
        firebase.database().ref('levelsystem/').once('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({levelSystem: snapshot.val()});
        }).then(() => {
            this.mapPointsToProgress();
        }).catch((error) => {
            //error callback
            console.log('[ProfilePage] DB getUserInfo() error ', error)
        })
    }

    mapPointsToProgress() {
        const currentLevel = this.state.userData.userLevel;
        let levelData = {};
        //Add the description of the current level
        levelData.description = this.state.levelSystem[currentLevel - 1].description;

        if (currentLevel == 6) {
            //user reached max level
            levelData.progression = 1;
            levelData.pointsTillLevelUp = 0;
        } else {
            //DB Index starts with 0
            const levelProgress = this.state.userData.points / this.state.levelSystem[currentLevel].points;
            console.log(levelProgress);
            levelData.progression = levelProgress;
            levelData.pointsTillLevelUp = this.state.levelSystem[currentLevel].points - this.state.userData.points;

        }
        console.log(this.state.levelData);
        this.setState({levelData: levelData});
        this.setState({isLoading: false});
    }

    render() {
        if (this.state.isLoading) {
            return <Text>Loading ...</Text>
        } else {
            return (
                <Container style={styles.pageContainer}>
                    <ScrollView style={styles.viewWrapper}>
                        {!this.state.showEditing &&
                        <ProfileInfo userData={this.state.userData} levelData={this.state.levelData}/>
                        }
                        {this.state.showEditing &&
                        <View>
                            <View style={styles.inputWrapper}>
                                <Text style={[styles.flex1, styles.inputHeader]}>Nickname: </Text>
                                <TextInput
                                    style={{
                                        flex: 1,
                                        fontSize: 20
                                    }}
                                    onChangeText={(nickName) => this.setState({nickName})}
                                    value={this.state.userData.nickName}
                                    maxLength={20}
                                />
                            </View>
                            <Text style={styles.smallText}>
                                Only visible to you
                            </Text>
                            <View style={styles.inputWrapper}>
                                <Text style={[styles.flex1, styles.inputHeader]}>Date of Birth: </Text>
                                <DatePicker
                                    style={{
                                        width: 200,
                                        flex: 1,
                                        alignItems: 'center'
                                    }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1900-01-01"
                                    maxDate={this.state.date}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none'
                                        }
                                    }}
                                    onDateChange={(date) => {
                                        this.setState({date: date})
                                    }}
                                />
                            </View>
                            <Text style={styles.smallText}>
                                Only used for course recommendations
                            </Text>
                            {this.state.userData.activeCourses && this.state.userData.activeCourses.length &&
                            <View style={{
                                marginTop: 50
                            }}>
                                <Text style={styles.courseHeader}>
                                    Active courses
                                </Text>
                                <RenderCourses coursesToMap={this.state.userData.activeCourses}/>
                            </View>
                            }
                        </View>
                        }
                        <Button bordered rounded dark style={styles.editButton}
                                onPress={() => this.setState({showEditing: !this.state.showEditing})}>
                            {this.state.showEditing ? <Text> Save changes </Text> : <Text> Edit </Text>}
                        </Button>
                    </ScrollView>
                </Container>
            );
        }
    }

}

export default ProfilePage;

