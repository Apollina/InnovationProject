import React, {Component} from 'react';
import ajax from '../../ajax';
import PropTypes from "prop-types";
import Courses from "../OfferedCourses/Courses";
import LoadingWheel from "../../components/LoadingWheel";

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
        const keywordArr = this.props.keywordCategories[categoryIndex].keywords;
        let strKeywords = '';

        strKeywords += this.mapKeywords(keywordArr);
        const userAgeKeyword = this.getUserAgeKeyword(userAge);
        if (userAgeKeyword !== undefined) {
            strKeywords += ',' + userAgeKeyword;
        }
        console.log(strKeywords);

        const courseResponse = await ajax.fetchCoursesByKeyword(strKeywords);
        const courses = courseResponse.data;
        const numberOfCourses = courses.length;
        console.log(courses);

        const randIndex = Math.floor(Math.random() * numberOfCourses);
        console.log('num of courses ' + numberOfCourses + ' rand index: ' + randIndex);
        this.setState({course: courses[randIndex]});
        this.setState({courseId: courses[randIndex].id});
        console.log(this.state.course);
    }

    mapKeywords(keywordArr) {
        let strKeywords = '';
        const arrayLength = keywordArr.length;
        for (let i = 0; i < arrayLength - 1; i++) {
            strKeywords += keywordArr[i].id + ',';
        }
        strKeywords += keywordArr[arrayLength - 1].id;
        return strKeywords;
    }

    getUserAgeKeyword(userAge) {
        if (userAge <= 18) {
            if (userAge <= 13) {
                return this.props.ageCategories[0].keywords[0].id;
            }
            return this.props.ageCategories[1].keywords[0].id;
        } else {
            return undefined;
        }
    }

    render() {
        let courseArr = {'data': [this.state.course]};
        if (this.state.course === undefined || this.state.courseId === undefined) {
            return <LoadingWheel/>
        }
        else {
            return <Courses filteredCourses={courseArr}/>
        }
    }
}

export default CourseKeywords;