import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from "native-base";
import globalStyles from "../../styles";

class CourseItem extends Component {

    static propTypes = {
        course: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    handlePress = () => {
        this.props.onPress(this.props.course.id);
        console.log(this.props.course.id);
    };

    render() {

        const {course} = this.props;

        return (
            <TouchableOpacity style={styles.course} onPress = {this.handlePress}>
                <Image
                    source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{course.name.en}</Text>
                    <Text>{course.description.en}</Text>
                    <View style={styles.footer}>
                        <Button bordered rounded dark style={globalStyles.editButton}
                                title="Learn More">
                            <Text> Learn More </Text>
                        </Button>
                        <Button bordered rounded dark style={globalStyles.enrollButton}
                                title="Enroll">
                            <Text> Enroll </Text>
                        </Button>
                    </View>
                </View>
            </TouchableOpacity>
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
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CourseItem;

