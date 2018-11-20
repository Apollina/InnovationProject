import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {Button} from "native-base";
import globalStyles from "../../styles";

class CourseItem extends Component {

    static propTypes = {
        course: PropTypes.object.isRequired,
    };

    render() {

        const { course } = this.props;

        return (
            <View style={styles.course}>
                <Image
                    source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{course.name.fi}</Text>
                    <Text>{course.description.fi}</Text>
                <View>
                    <Button bordered rounded dark style={globalStyles.editButton}
                        title="Learn More">
                        <Text> Learn More </Text>
                    </Button>
                </View>
                </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
        course: {
            marginHorizontal: 12,
            marginTop: 12,
        },
        image: {
            width: '100%',
            height: 150,
            backgroundColor: '#ccc',
        },
        info: {
            padding: 10,
            backgroundColor: '#fff',
            borderColor: '#bbb',
            borderWidth: 1,
            borderTopWidth: 0,
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,
        },
    });

export default CourseItem;

