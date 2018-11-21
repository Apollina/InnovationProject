import React, {Component} from 'react';
import {Text} from "react-native";
import ajax from '../../ajax';
import PropTypes from "prop-types";
import CourseItem from "../OfferedCourses/CourseItem";

class CourseKeywords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: undefined,
            courseId: undefined
        };
    }

    static propTypes = {
        keywordCategories: PropTypes.array.isRequired,
        ageCategories: PropTypes.array.isRequired
    };

    async componentDidMount() {
        const {steps} = this.props;
        const categoryIndex = steps['6_options_category'].value;
        const userAge = steps['3_user_age'].value;
        let keywordArr = this.props.keywordCategories[categoryIndex].keywords;

        let userAgeKeyword = this.getUserAgeKeyword(userAge);
        if (userAgeKeyword !== undefined){keywordArr.push(userAgeKeyword)}

        let strKeywords = this.mapKeywords(keywordArr);
        console.log(strKeywords);

        const courseResponse = await ajax.fetchCoursesByKeyword(strKeywords);
        let numberOfCourses = 0;
        //Remove later: console log, to see the courses

        let courses = [];
        courseResponse.data.map((courseData) => {
            if (courseData.name.en === undefined || courseData.name.en == null) {
                if (courseData.name.fi !== undefined && courseData.name.fi != null)
                    console.log(courseData.name.fi);
                    courses.push(courseData);
                    numberOfCourses++;
            } else {
                console.log(courseData.name.en);
                courses.push(courseData);
                numberOfCourses++;
            }
        });

        let randIndex = Math.floor(Math.random() * (numberOfCourses) );
        console.log('num of courses '+ numberOfCourses+' rand index: '+randIndex);
        this.setState({course: courses[randIndex]});
        this.setState({courseId: courses[randIndex].id});
        console.log(this.state.course);
    }

    mapKeywords(keywordArr){
        let strKeywords = '';
        let arrayLength = keywordArr.length;
        for (let i = 0; i < arrayLength - 1; i++) {
            strKeywords += keywordArr[i].id + ',';
        }
        strKeywords += keywordArr[arrayLength - 1].id;
        return strKeywords;
    }

    setCurrentCourse = (courseId) => {
        this.setState({
            currentCourseId: courseId
        });
    };

    render() {
        if (this.state.course === undefined || this.state.courseId === undefined){
            return (
                <Text>Loading...</Text>
            );
        }
        else {
            return (
                <CourseItem course={this.state.course} onPress={this.setCurrentCourse}/>
            );
        }
    }

    getUserAgeKeyword(userAge) {
        if (userAge <= 17){
            if (userAge <= 13){
                return this.props.ageCategories[0].keywords[0].id;
            }
            return this.props.ageCategories[1].keywords[0].id;
        } else {
            return undefined;
        }
    }
}

export default CourseKeywords;