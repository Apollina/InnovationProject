import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {Button} from "native-base";
import globalStyles from "../../styles";

class CourseDetails extends Component {

    static propTypes = {
        course: PropTypes.object.isRequired,
    };

    render() {

        const { course } = this.props;

        return (
            <View>
                <Image
                    source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                    style={styles.image}
                />
                <View>
                    <Text>{course.name.en}</Text>
                    <Text>{course.description.en}</Text>
                </View>
                <View>
                    <Button bordered rounded dark style={globalStyles.editButton}
                        title="Learn More">
                        <Text> Learn More </Text>
                    </Button>
                </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
    }
});

export default CourseDetails;

