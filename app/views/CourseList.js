import React, {Component} from 'react';
import { ScrollView, Text, StyleSheet, View, Button, ActivityIndicator, FlatList, Image  } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ajax from '../ajax';
import { List, ListItem } from "react-native-elements";

class CourseList extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			isLoading: false,
			content: [],
		}
	}

	
    async componentDidMount() {
        const courses = await ajax.fetchInitialCourses();
		//console.log(courses);
		console.log(courses.data);
		list = [];
		for (i in courses.data){
			console.log(i);
			console.log(courses.data[i].name);
			if (courses.data[i].name.fi == null){
				courses.data[i].name.fi = "Kurssin nimi";
			}
			list.push(courses.data[i]);
			this.setState({content: list});
		} 
    }
	
    render() {
	if (this.state.isLoading){
		return (
			<View style={styles.container}>
				<ActivityIndicator/>
			</View>
		)
		
	} else {
			return (
			
				<View style={{flex: 1, paddingTop:20}}>
				<Button
				title="Talk with Chatbot"onPress={() => this.props.navigation.navigate('ChatbotPage')}/>
				<FlatList
				data={this.state.content}
				renderItem={({item}) => <Text>{item.name.fi} {item.created_time}</Text>}
				keyExtractor={({id}, index) => id}
				/>
				</View>
			)
		}
	}
}
			
			
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    header: {
        fontSize: 40,
    },
    textFirst: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 300,
	},
	ratingImage: {
    height: 19.21,
    width: 100
	},
});

export default CourseList;

