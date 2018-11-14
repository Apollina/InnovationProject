import React, {Component} from 'react'
import { ScrollView, View, TextInput } from 'react-native'
import { Text, Container, Button } from 'native-base'
import DatePicker from 'react-native-datepicker'
import styles from '../../styles';
import ProfileInfo from './ProfileInfo';
import RenderCourses from './RenderCourses';

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
    
    render() {
        return ( 
            <Container style={styles.pageContainer}>
                <ScrollView style={styles.viewWrapper}>
                    {!this.state.showEditing &&  
                       <ProfileInfo stateData={this.state} /> 
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
                                <RenderCourses coursesToMap={this.state.activeCourses} />
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

export default ProfilePage;

