import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
export default class Description extends Component {
  render() {
    return (
        <Text style={styles.textFirst}> PROFILE PAGE </Text>
    );
  }
}
const styles = StyleSheet.create({
    textFirst: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 300,
    },
});