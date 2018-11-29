import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';


import Courses from '../views/OfferedCourses/Courses';
import LevelMap from '../views/LevelMap';
import Keywords from '../views/Chatbot/Keywords';
import ProfilePage from '../views/Profile/ProfilePage';

export const TabNav = createBottomTabNavigator ({
    CourseList: {
        screen: Courses,
        navigationOptions: ({ navigation }) => ({
            title: "Courses",
        })
    },
    ProfilePage: {
        screen: ProfilePage,
        navigationOptions: ({ navigation }) => ({
            title: "Profile",
        })
    },
    Keywords: {
        screen: Keywords,
        navigationOptions: ({ navigation }) => ({
            title: "Chat",
        })
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
