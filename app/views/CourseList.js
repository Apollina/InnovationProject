import React, {Component} from 'react';
import { ScrollView, Text, StyleSheet, View, Button, ActivityIndicator, FlatList, Image, TouchableOpacity  } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ajax from '../ajax';
import { List, ListItem } from "react-native-elements";
import firebase from '../firebase';

class CourseList extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            content: [],
            keywords: [],
        }
    }

    async componentDidMount() {
        const courses = await ajax.fetchInitialCourses();
        //console.log(courses);
        //console.log(courses.data);
        list = [];
        for (i in courses.data){
            if (courses.data[i].name.fi == null){
                courses.data[i].name.fi = "Kurssin nimi";
            }
            //console.log(courses.data[i].images);
            if (courses.data[i].images.length == 0){
                var imagesNew = {
                    url:"https://facebook.github.io/react-native/docs/assets/favicon.png"
                }
                courses.data[i].images.push(imagesNew);
                //console.log(courses.data[i].images[0].url);
            }
            list.push(courses.data[i]);
            this.setState({content: list});
        }

        // get keywords from HELDEV
        const keywords = await ajax.fetchKeywords();

        let keywordList = [];
        keywords.data.map((keywordData) => {
            if (keywordData.name.fi != null){
                keywordList.push(keywordData.name.fi);
            }
        });
        console.log('LIST ' +keywordList);
        this.setState({keywords: keywordList});
    }

    saveKeywords(keywords) {
        firebase.database().ref().set({
            ListOfKeywords: {
                keywords
            }
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    };

    render() {
        if (this.state.isLoading){
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            // save keywords to firebase
            this.saveKeywords(this.state.keywords);
            return (

                <View>
                    <Button
                        title="Talk with Chatbot"onPress={() => this.props.navigation.navigate('ChatbotPage')}/>
                    <FlatList

                        data={this.state.content}

                        renderItem={({item}) => <TouchableOpacity><View style={{					marginLeft: 20, flexDirection: 'row', marginTop: 8}}>
                            <Image
                                style={{width: 100, height: 75}}
                                source={{uri: item.images[0].url }}
                            />
                            <View>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                    {item.name.fi}
                                </Text>
                                <Text style={{fontSize: 16}}>
                                    {item.created_time}
                                </Text>
                            </View>
                        </View></TouchableOpacity>}
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
        alignItems: 'center',
        flexWrap: 'wrap'
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
    listText:{
        alignItems: 'center'
    },
});

export default CourseList;