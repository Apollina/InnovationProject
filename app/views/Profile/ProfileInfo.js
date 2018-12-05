import React, {Component} from 'react';
import { Image, View } from 'react-native'
import { Text } from 'native-base'
import * as Progress from 'react-native-progress'
import styles from '../../styles';
import RenderCourses from './RenderCourses';
import PropTypes from "prop-types";

class ProfileInfo extends Component {
    static propTypes = {
        userData: PropTypes.object.isRequired,
        levelData: PropTypes.object.isRequired
    };

    render() {
        console.log(this.props.userData);
        return (
            <View>
                <Text style={styles.H1}>
                    {this.props.userData.nickName}
                </Text>
                <View style={styles.infoWrapper}>
                    <Image source={{uri: 'http://c1.peakpx.com/wallpaper/515/960/868/trekking-hiking-mountaineering-wallpaper.jpg'}} style={styles.profilePicture}/>
                    <View style={styles.textWrapper}>
                        <Text style={styles.smallItalicText}>Member since</Text>
                        <Text style={styles.smallText}>{this.props.userData.signInDate}</Text>
                        <Text style={styles.smallItalicText}>Day of Birth</Text>
                        <Text style={styles.smallText}>{this.props.userData.birthDate}</Text>
                    </View>
                </View>
                <Text style={styles.H1}>
                    Level {this.props.userData.userLevel}: {this.props.levelData.description}
                </Text>
                <Text>
                    {this.props.levelData.pointsTillLevelUp == 0 ? 'Max-Level reached!' : this.props.levelData.pointsTillLevelUp +' points till next level up.'}
                </Text>
                <Progress.Bar style={styles.progressBar} progress={this.props.levelData.progression} height={10} width={null}
                              borderWidth={2} borderColor={'black'} borderRadius={10}/>
                {this.props.userData.coursesVisited && this.props.userData.coursesVisited.length &&
                <View>
                    <Text style={styles.courseHeader}>
                        Last course locations visited
                    </Text>
                    <RenderCourses coursesToMap={this.props.userData.coursesVisited}/>
                </View>
                }
                {this.props.userData.activeCourses && this.props.userData.activeCourses.length &&
                <View>
                    <Text style={styles.courseHeader}>
                        Active courses
                    </Text>
                    <RenderCourses coursesToMap={this.props.userData.activeCourses} editMode={false}/>
                </View>
                }
            </View>
        );
    }
}

export default ProfileInfo;
