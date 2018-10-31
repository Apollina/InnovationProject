import React, { Component } from 'react';
import { Image } from 'react-native';
export default class Picture extends Component {
    render() {
        return (
            <view style={styles.pictureWrapper}>
                <Image source={{uri: 'http://placekitten.com/320/180'}} style={styles.profilePicture} />
            </view>
        );
    }
}
const styles = StyleSheet.create({
    profilePicture: {
    },
    pictureWrapper: {
        flex: 2
    }
});