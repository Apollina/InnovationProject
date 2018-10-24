import React, {Component} from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { Text, Container, Button } from 'native-base';
import * as Progress from 'react-native-progress';

import AppHeader from '../components/AppHeader';

class ProfilePage extends Component {
    render() {
        return ( 
            <Container>
                <AppHeader headerTitle='Profile' />  
                <ScrollView style={styles.viewWrapper}>
                <Text style={styles.H1}>Ben Lonely</Text>
                <View style={styles.infoWrapper}>
                    <Image source={{uri: 'http://placekitten.com/320/180'}} style={styles.profilePicture} />
                    <View style={styles.textWrapper}>
                        <Text style={styles.H2}>Member since</Text>
                        <Text style={styles.smallText}>1.10.2018</Text>
                    </View>
                </View>
                <Text style={styles.H1}>Level 4</Text>
                <Text>Level progress</Text>
                <Progress.Bar style={styles.progressBar} progress={0.3} height={10} width={null} borderWidth={2} borderColor={'black'} borderRadius={10}/>
                <Text style={styles.H2}>Last course locations visited</Text>
                <Text>Taekwondo</Text>
                <Text>at Asiakkaankatu, Helsinki</Text>
                <Text>25.10.2018</Text>
                <Text style={styles.H2}>Active courses</Text>
                <Text>Taekwondo</Text>
                <Text>at Asiakkaankatu, Helsinki</Text>
                <Button bordered rounded dark style={styles.editButton}>
                    <Text>Edit</Text>
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
    infoWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    textWrapper: {
        flexDirection: 'column'
    },
    viewWrapper: {
        marginHorizontal: 20
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
    smallText: {
        fontSize: 15
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

