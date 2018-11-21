import React, {Component} from 'react';
import {Text} from "react-native";
import ajax from '../../ajax';
import PropTypes from "prop-types";
import CourseItem from "../OfferedCourses/CourseItem";

class CourseKeywords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            course: undefined
        };
    }

    static propTypes = {
        keywordCategories: PropTypes.array.isRequired
    };

    async componentDidMount() {
        const {steps} = this.props;
        const categoryIndex = steps['6_options_category'].value;
        let keywordArr = this.props.keywordCategories[categoryIndex].keywords;
        console.log(keywordArr);

        //map Array of Keywords to ajax call parameter
        let strKeywords = '';
        let arrayLength = keywordArr.length;
        for (let i = 0; i < arrayLength - 1; i++) {
            strKeywords += keywordArr[i].id + ',';
        }
        strKeywords += keywordArr[arrayLength - 1].id;
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
        console.log(this.state.course);
    }

    render() {
        if (this.state.course === undefined){
            return (
                <Text>Loading...</Text>
            );
        }
        else {
            return (
                <CourseItem course={this.state.course}/>
            );
        }
    }
}

export default CourseKeywords;