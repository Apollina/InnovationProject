import React from 'react';
import { Image, View } from 'react-native'
import { Text } from 'native-base'
import * as Progress from 'react-native-progress'
import styles from '../../styles';
import RenderCourses from './RenderCourses';

const ProfileInfo = props => {
    const {stateData: {
        nickName, signInDate, userLevel, levelProgression, coursesVisited, activeCourses
        }
    } = props;
    return (
        <View >
            <Text style={styles.H1}>
                {nickName}
            </Text>
            <View style={styles.infoWrapper}>
                <Image source={{uri: 'http://placekitten.com/320/180'}} style={styles.profilePicture} />
                <View style={styles.textWrapper}>
                    <Text style={styles.H2}>Member since</Text>
                    <Text style={styles.smallText}>{signInDate}</Text>
                </View>
            </View>
            <Text style={styles.H1}>
                Level {userLevel}
            </Text>
            <Text>
                Level progress
            </Text>
            <Progress.Bar style={styles.progressBar} progress={levelProgression} height={10} width={null} borderWidth={2} borderColor={'black'} borderRadius={10}/>
            {coursesVisited && coursesVisited.length &&       
                <View>
                    <Text style={styles.courseHeader}>
                        Last course locations visited
                    </Text>
                    <RenderCourses coursesToMap={coursesVisited} />
                </View>
            }
            {activeCourses && activeCourses.length &&
                <View>
                    <Text style={styles.courseHeader}>
                        Active courses
                    </Text>
                    <RenderCourses coursesToMap={activeCourses} />
                </View>
            }
        </View>
    );
}

export default ProfileInfo;
