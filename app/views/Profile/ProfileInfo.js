import React, {Component} from 'react';
import { Image, View } from 'react-native'
import { Text } from 'native-base'
import * as Progress from 'react-native-progress'
import styles from '../../styles';
import RenderCourses from './RenderCourses';
import PropTypes from "prop-types";

class ProfileInfo extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired
    };

    render() {
        return (
            <View>
                <Text style={styles.H1}>
                    {this.props.userInfo.nickName}
                </Text>
                <View style={styles.infoWrapper}>
                    <Image source={{uri: 'http://placekitten.com/320/180'}} style={styles.profilePicture}/>
                    <View style={styles.textWrapper}>
                        <Text style={styles.H2}>Member since</Text>
                        <Text style={styles.smallText}>{this.props.userInfo.signInDate}</Text>
                    </View>
                </View>
                <Text style={styles.H1}>
                    Level {this.props.userInfo.userLevel}
                </Text>
                <Text>
                    Level progress
                </Text>
                <Progress.Bar style={styles.progressBar} progress={this.props.userInfo.levelProgression} height={10} width={null}
                              borderWidth={2} borderColor={'black'} borderRadius={10}/>
                {this.props.userInfo.coursesVisited && this.props.userInfo.coursesVisited.length &&
                <View>
                    <Text style={styles.courseHeader}>
                        Last course locations visited
                    </Text>
                    <RenderCourses coursesToMap={this.props.userInfo.coursesVisited}/>
                </View>
                }
                {this.props.userInfo.activeCourses && this.props.userInfo.activeCourses.length &&
                <View>
                    <Text style={styles.courseHeader}>
                        Active courses
                    </Text>
                    <RenderCourses coursesToMap={this.props.userInfo.activeCourses}/>
                </View>
                }
            </View>
        );
    }
}

export default ProfileInfo;
