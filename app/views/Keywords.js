import React, {Component} from 'react';
import ajax from '../ajax';
import firebase from '../firebase';
import ChatbotPage from './ChatbotPage';

class Keywords extends Component {
    constructor() {
        super();
        this.state = {
            keywordList: [],
            keywordCategories: [],
            ageCategories: {},
            op: [{value: 1, label: 'train', trigger: '0'}, {value: 2, label: 'Exit', end: true}]
        }
    }

    async componentDidMount() {
        const keywordResponse = await ajax.fetchInitialKeywords();

        //Keywords do not always have an English name defined (name.en)
        //Defining fallback to Finnish name
        let tempKeywordList = [];
        keywordResponse.data.map((keywordData) => {
            if (keywordData.name.en === undefined || keywordData.name.en == null) {
                if (keywordData.name.fi !== undefined && keywordData.name.fi != null)
                    tempKeywordList.push(keywordData.name.fi);
            } else {
                tempKeywordList.push(keywordData.name.en);
            }
        });

        console.log('LIST ' + tempKeywordList);
        //this.setState({KeywordList: tempKeywordList});
        this.getCategories();
        //this.getCategories();
        //console.log(cat);
        //console.log('ageCat: '+ ageCat);

        this.assignCategoriesToKeywords(tempKeywordList, cat, ageCat);
    }

    assignCategoriesToKeywords(tempKeywordList, cat, ageCat) {

        //Predefined


    }

    getCategories() {
        firebase.database().ref('categories/').once('value', function (snapshot) {
            console.log(snapshot.val()[0]);
        });
    }

    render() {
        return (
            <ChatbotPage categoriesOptions={this.state.op}/>
        );
    }
}

export default Keywords;