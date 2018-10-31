import React, {Component} from 'react'
import { ScrollView, StyleSheet, Image, View, TextInput } from 'react-native'
import { Text, Container, Button } from 'native-base'
import * as Progress from 'react-native-progress'
import DatePicker from 'react-native-datepicker'

import AppHeader from '../components/AppHeader'

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showEditing: false,
            nickName: "Ben Lonely",
            signInDate: '1.10.2018',
            userLevel: '4',
            levelProgression: 0.7,
            coursesVisited: [
                {
                    courseName: 'Taekwondo',
                    courseLocation: 'Asiakkaankatu, Helsinki',
                    courseDate: '25.10.2018'
                },
                {
                    courseName: 'Pitsinnypläys',
                    courseLocation: 'Asiakkaankatu, Helsinki',
                    courseDate: '25.10.2018'
                }
            ],
            activeCourses: [
                {
                    courseName: 'Taekwondo',
                    courseLocation: 'Asiakkaankatu, Helsinki',
                },
                {
                    courseName: 'Pitsinnypläys',
                    courseLocation: 'Asiakkaankatu, Helsinki',
                }
            ],
            date: new Date()
        };
    }
    
    renderCourses(coursesToMap) {
        return Courses = coursesToMap.map(function(course, i) {
            return(
                <View key={i} style={styles.coursesWrapper}>
                    <Text style={styles.courseHeader}>
                        {course.courseName}
                    </Text>
                    <Text>
                        at {course.courseLocation}
                    </Text>
                    {course.courseDate && 
                        <Text>
                            {course.courseDate}
                        </Text>
                    }
                </View>
            ); 
        });
    }

    render() {
        return ( 
            <Container>
                <AppHeader headerTitle='Profile' />  
                <ScrollView style={styles.viewWrapper}>
                    {!this.state.showEditing &&  
                        <View >
                            <Text style={styles.H1}>
                                {this.state.nickName}
                            </Text>
                            <View style={styles.infoWrapper}>
                                <Image source={{uri: 'http://placekitten.com/320/180'}} style={styles.profilePicture} />
                                <View style={styles.textWrapper}>
                                    <Text style={styles.H2}>Member since</Text>
                                    <Text style={styles.smallText}>{this.state.signInDate}</Text>
                                </View>
                            </View>
                            <Text style={styles.H1}>
                                Level {this.state.userLevel}
                            </Text>
                            <Text>
                                Level progress
                            </Text>
                            <Progress.Bar style={styles.progressBar} progress={this.state.levelProgression} height={10} width={null} borderWidth={2} borderColor={'black'} borderRadius={10}/>
                            {this.state.coursesVisited && this.state.coursesVisited.length &&       
                                <View>
                                    <Text style={styles.courseHeader}>
                                        Last course locations visited
                                    </Text>
                                    {this.renderCourses(this.state.coursesVisited)}
                                </View>
                                }
                                {this.state.activeCourses && this.state.activeCourses.length &&
                                    <View>
                                        <Text style={styles.courseHeader}>
                                            Active courses
                                        </Text>
                                        {this.renderCourses(this.state.activeCourses)}
                                    </View>
                                }
                            </View>
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
                                value={this.state.nickName}
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
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                        <Text style={styles.smallText}>
                            Only used for course recommendations
                        </Text>
                        {this.state.activeCourses && this.state.activeCourses.length &&
                            <View style={{
                                marginTop: 50
                            }}>
                                <Text style={styles.courseHeader}>
                                    Active courses
                                </Text>
                                {this.renderCourses(this.state.activeCourses)}
                            </View>
                        }
                    </View>
                    }
                    <Button bordered rounded dark style={styles.editButton} onPress={()=> this.setState({showEditing: !this.state.showEditing})}>
                        {this.state.showEditing ? <Text> Save changes </Text> : <Text> Edit </Text>}
                    </Button>   
                </ScrollView>                
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    profilePicture: {
        marginRight: 10,
        height: 90,
        width: 160,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'black'
    },
    flex1: {
        flex: 1,
        alignItems: 'center'
    },
    flexCenter: {
        justifyContent: 'center'
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    textWrapper: {
        flexDirection: 'column'
    },
    viewWrapper: {
        margin: 20
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    coursesWrapper: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 40
    },
    H1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    H2: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    courseHeader: {
        fontWeight: 'bold',
        marginTop: 5
    },
    inputHeader: {
        fontWeight: 'bold',
        fontSize: 20
    },
    smallText: {
        fontSize: 15
    },
    reallySmallText: {
        fontSize: 5
    },
    progressBar: {
        marginTop: 5,
        marginBottom: 15
    },
    editButton: {
        marginVertical: 15,
        alignSelf: "center"
    }
});

export default ProfilePage;

