import React, {Component} from 'react';
import { ScrollView, Text } from 'react-native';
import styles from '../styles';

class LevelMap extends Component {
    render() {
        return (
            <ScrollView>
                <Text style={styles.textFirst}> LEVEL MAP </Text>
            </ScrollView>
        );
    }
}

export default LevelMap;

