import React, {Component} from 'react';
import {TextInput} from 'react-native';
import globalStyles from '../../styles';
import PropTypes from "prop-types";
import debounce from 'lodash.debounce';

class SearchBar extends Component {
    static propTypes = {
        searchCourses: PropTypes.func.isRequired,
    };
    state = {
        searchTerm: '',
    };
    debounceSearchCourses = debounce(this.props.searchCourses, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debounceSearchCourses(this.state.searchTerm);
            console.log('SEARCH TERM: ' + this.state.searchTerm)
        });
    };

    render() {
        return (
                <TextInput placeholder="Search All Courses" style={globalStyles.searchBar} onChangeText={this.handleChange}/>
        );
    }
}

export default SearchBar;
