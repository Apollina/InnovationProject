import React, {Component} from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Container, Button} from 'native-base'
import DatePicker from 'react-native-datepicker'
import styles from '../../styles';
import firebase from '../../firebase';
import ProfileInfo from './ProfileInfo';
import RenderCourses from './RenderCourses';
import LoadingWheel from "../../components/LoadingWheel";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditing: false,
            userData: {},
            levelData: {},
            levelSystem: [],
            isLoading: true
        };
    }

    async componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        firebase.database().ref('userList/').once('value', (snapshot) => {
            this.setState({userData: snapshot.val()[0]});
        }).then(() => {
            this.getLevelSystemData();
        }).catch((error) => {
            //error callback
            console.log('[ProfilePage] DB getUserInfo() error ', error)
        });
        firebase.database().ref('userList/').on('value', (snapshot) => {
            this.setState({userData: snapshot.val()[0]});
            this.getLevelSystemData();
        });
    }

    getLevelSystemData() {
        firebase.database().ref('levelsystem/').once('value', (snapshot) => {
            this.setState({levelSystem: snapshot.val()});
        }).then(() => {
            this.mapPointsToProgress();
        }).catch((error) => {
            //error callback
            console.log('[ProfilePage] DB getLevelSystemData() error ', error)
        });
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
            levelData.progression = levelProgress;
            levelData.pointsTillLevelUp = this.state.levelSystem[currentLevel].points - this.state.userData.points;
        }
        this.setState({levelData: levelData});
        this.setState({isLoading: false});
    }

    resetLevelData = () => {
        const startPoints = 0;
        const startLevel = 1;

        let updates = {};
        updates['/points'] = startPoints;
        updates['/userLevel'] = startLevel;
        return firebase.database().ref('userList/0').update(updates);
    };

    updateUserData = () => {
        this.setState({showEditing: !this.state.showEditing});
        let updates = {};

        updates['/nickName'] = this.state.userData.nickName;
        updates['/birthDate'] = this.state.userData.birthDate;
        return firebase.database().ref('userList/0').update(updates);
    };

    cancelProfileEdit = () => {
        this.setState({showEditing: !this.state.showEditing});
        //reset State to UserData from DB
        this.getUserInfo();
    };

    render() {
        if (this.state.isLoading) {
            return <LoadingWheel/>
        } else {
            return (
                <Container style={styles.pageContainer}>
                    <ScrollView style={styles.viewWrapper}>
                        {!this.state.showEditing &&
                        <Button bordered rounded dark style={styles.editButton}
                                onPress={() => this.setState({showEditing: !this.state.showEditing})}>
                            <Text> Edit Profile </Text>
                        </Button>
                        }
                        {!this.state.showEditing &&
                        <ProfileInfo userData={this.state.userData} levelData={this.state.levelData}/>
                        }
                        {this.state.showEditing &&
                        <View>
                            <Button bordered rounded dark style={styles.editButton}
                                    onPress={this.resetLevelData}
                                    title="Reset User Level">
                                <Text style={styles.textBtn}> Reset User Level </Text>
                            </Button>
                            <View style={styles.inputWrapper}>
                                <Text style={[styles.flex1, styles.inputHeader]}>Nickname: </Text>
                                <TextInput
                                    style={{
                                        flex: 1,
                                        fontSize: 20
                                    }}
                                    onChangeText={
                                        (nickName) => this.setState(prevState => ({
                                            userData: {
                                                ...prevState.userData,
                                                nickName: nickName
                                            }
                                        }))}
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
                                    date={new Date(this.state.userData.birthDate)}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1900-01-01"
                                    maxDate={new Date()}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none'
                                        }
                                    }}
                                    onDateChange={
                                        (date) => this.setState(prevState => ({
                                            userData: {
                                                ...prevState.userData,
                                                birthDate: date.toString()
                                            }
                                        }))}
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
                                <RenderCourses coursesToMap={this.state.userData.activeCourses} editMode={true}/>
                            </View>
                            }
                        </View>
                        }
                        {this.state.showEditing &&
                        <View style={styles.btnWrapper}>
                            <Button bordered rounded dark style={styles.editButton}
                                    onPress={this.updateUserData}
                                    title="Save Changes">
                                <Text> Save Changes </Text>
                            </Button>
                            <Button bordered rounded dark style={styles.editButton}
                                    onPress={this.cancelProfileEdit}
                                    title="Cancel">
                                <Text> Cancel </Text>
                            </Button>
                        </View>
                        }
                    </ScrollView>
                </Container>
            );
        }
    }

}

export default ProfilePage;

