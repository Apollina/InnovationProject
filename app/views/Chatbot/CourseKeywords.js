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
        console.log(categoryIndex);
        console.log(keywordArr);

        //map Array of Keywords to ajax call parameter
        let strKeywords = '';
        let arrayLength = keywordArr.length;
        for (let i = 0; i < arrayLength - 1; i++) {
            strKeywords += keywordArr[i].id + ',';
        }
        strKeywords += keywordArr[arrayLength - 1].id;

        const courseResponse = await ajax.fetchCoursesByKeyword(strKeywords);
        //Remove later: console log, to see the courses
        courseResponse.data.map((courseData) => {
            if (courseData.name.en === undefined || courseData.name.en == null) {
                if (courseData.name.fi !== undefined && courseData.name.fi != null)
                    console.log(courseData.name.fi);
            } else {
                console.log(courseData.name.en);
            }
        });
        this.setState({course: courseResponse.data[13]});
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