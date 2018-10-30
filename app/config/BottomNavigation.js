import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';


import CourseList from '../views/CourseList';
import LevelMap from '../views/LevelMap';
import ProfilePage from '../views/ProfilePage';
import ChatbotPage from '../views/ChatbotPage';

export const TabNav = createBottomTabNavigator ({
    CourseList: {
        screen: CourseList,
        navigationOptions: ({ navigation }) => ({
            title: "Courses",
        })
    },
    LevelMap: {
        screen: LevelMap,
        navigationOptions: ({ navigation }) => ({
            title: "Map",
        })
    },
    ProfilePage: {
        screen: ProfilePage,
        navigationOptions: ({ navigation }) => ({
            title: "Profile",
        })
    },
	ChatbotPage: {
        screen: ChatbotPage,
        navigationOptions: { tabBarVisible: false,  }
    },
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
		
        activeTintColor: '#f2f2f2',
        activeBackgroundColor: '#2EC4B6',
        inactiveTintColor: '#666',
        labelStyle: {
            fontSize: 22,
            padding: 12
        }
    }
});
