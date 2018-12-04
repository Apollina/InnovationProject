import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ajax from '../../ajax';
import CoursesList from './CoursesList';
import CourseDetails from './CourseDetails';
import LoadingWheel from "../../components/LoadingWheel";
import PropTypes from "prop-types";
import SearchBar from './SearchBar';
import globalStyles from '../../styles';


class Courses extends Component {

    constructor() {
        super();
        this.state = {
            courses: {},
            coursesFromSearch: [],
            images: [],
            currentCourseId: null,
        }
    }

    static propTypes = {
        filteredCourses: PropTypes.object
    };

    async componentDidMount() {
        if (this.props.filteredCourses !== undefined && this.props.filteredCourses !== null) {
            this.setState({courses: this.props.filteredCourses});
        } else {
            const courseResponse = await ajax.fetchInitialCourses();
            //Filter courses to only get english courses
            let coursesEN = [];
            courseResponse.data.map((courseData) => {
                if (courseData.name.en !== undefined && courseData.name.en !== null && courseData.description.en !== undefined && courseData.description.en !== null) {
                    coursesEN.push(courseData);
                }
            });

            this.setState({courses: coursesEN});
        }
    }

    searchCourses = async (searchTerm) => {
        let coursesEN = [];
        if (searchTerm) {
            const courseResponse = await ajax.fetchICoursesSearchResults(searchTerm);
            courseResponse.data.map((courseData) => {
                if (courseData.name.en !== undefined && courseData.name.en !== null && courseData.description.en !== undefined && courseData.description.en !== null) {
                    coursesEN.push(courseData);
                }
            });
        }

        this.setState({coursesFromSearch: coursesEN});
        console.log('COURSES FROM SEARCH' + coursesFromSearch)
        console.log('COURSES FROM SEARCH LENGTH' + Object.keys(this.state.coursesFromSearch).length)
    };


    setCurrentCourse = (courseId) => {
        this.setState({
            currentCourseId: courseId
        });
    };
    unsetCurrentCourse = () => {
        this.setState({
            currentCourseId: null
        });
    };
    currentCourse = () => {
        return this.state.courses.find((course) => course.id === this.state.currentCourseId);
    };

    render() {
        if (this.state.courses === undefined) {
            return (<LoadingWheel/>);
        }
        if (this.state.currentCourseId) {
            return <CourseDetails initialCourseData={this.currentCourse()} onBack={this.unsetCurrentCourse}/>;
        } 
        const coursesToDisplay =
            Object.keys(this.state.coursesFromSearch).length > 0 ? this.state.coursesFromSearch : this.state.courses;
        console.log(this.state.coursesFromSearch);
        console.log(coursesToDisplay);
        //console.log(Object.keys(coursesToDisplay));
        if (Object.keys(this.state.coursesFromSearch).length > 0) {
            return (
                <View style={globalStyles.screen}>
                    <SearchBar searchCourses={this.searchCourses}/>
                    <CoursesList courses={this.state.coursesFromSearch} onItemPress={this.setCurrentCourse}/>
                </View>
            )
        } else if (Object.keys(this.state.courses).length > 0) {
            //Don't show SearchBar when displaying the course in the chatbot
            if (this.props.filteredCourses !== undefined && this.props.filteredCourses !== null) {
                return (
                    <View style={globalStyles.screen}>
                        <CoursesList courses={this.state.courses} onItemPress={this.setCurrentCourse}/>
                    </View>
                )
            } else {
                return (
                    <View style={globalStyles.screen}>
                        <SearchBar searchCourses={this.searchCourses}/>
                        <CoursesList courses={this.state.courses} onItemPress={this.setCurrentCourse}/>
                    </View>
                )
            }
        } else {
            return (<LoadingWheel/>);
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
});

export default Courses;

