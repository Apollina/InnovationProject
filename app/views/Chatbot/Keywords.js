import React, {Component} from 'react';
import ajax from '../../ajax';
import firebase from '../../firebase';
import ChatbotPage from './ChatbotPage';

class Keywords extends Component {
    constructor() {
        super();
        this.state = {
            keywordListFromAPI: [],
            keywordCategories: [],
            ageCategories: [],
            categoriesOptions: []
        }
    }

    async componentDidMount() {
        const keywordResponse = await ajax.fetchInitialKeywords();

        let tempKeywordList = [];
        keywordResponse.data.map((keywordData) => {
            let keywordName = "";
            if (keywordData.name.en === undefined || keywordData.name.en == null) {
                if (keywordData.name.fi !== undefined && keywordData.name.fi != null)
                    keywordName = keywordData.name.fi;
            } else {
                keywordName = keywordData.name.en;
            }
            tempKeywordList.push({keyword: keywordName, id: keywordData.id});
        });

        this.setState({keywordListFromAPI: tempKeywordList});

        this.getKeywordCategories();
        this.getAgeCategories();
    }

    getKeywordCategories() {
        firebase.database().ref('categories/').once('value', (snapshot) => {
            //Assign the keywords from the API to the category they belong to regarding the DB
            let catList = [];
            snapshot.val().forEach((category) => {
                catList.push(this.checkKeywordsFromAPI(category.keywords, category.description));
            });
            this.setState({keywordCategories: catList});
            //console.log(this.state.keywordCategories);

        }).then(() => {
            this.mapCategoriesToOptions();
        }).catch((error) => {
            //error callback
            console.log('[Keywords] DB getKeywordCategories() error ', error)
        })
    }

    getAgeCategories() {
        firebase.database().ref('ageCategories/').once('value', (snapshot) => {
            //Assign the keywords from the API to the category they belong to regarding the DB
            let catList = [];
            snapshot.val().forEach((category) => {
                catList.push(this.checkKeywordsFromAPI(category.keywords, category.description));
            });
            this.setState({ageCategories: catList});
            //console.log(this.state.ageCategories);

        }).catch((error) => {
            //error callback
            console.log('[Keywords] DB getAgeCategories() error ', error)
        })
    }

    checkKeywordsFromAPI(catKeywords, catDescription) {
        // Check if keywords from the API belong in current category
        let currentKeywords = [];
        this.state.keywordListFromAPI.forEach((keywordAPI) => {
            catKeywords.forEach((catKeyword) => {
                if (catKeyword.id === keywordAPI.id) {
                    currentKeywords.push(keywordAPI);
                    return;
                }
            });
        });
        return {description: catDescription, keywords: currentKeywords};
    }

    mapCategoriesToOptions() {
        let tempOptions = [];
        for (let i = 0; i < this.state.keywordCategories.length; i++) {
            tempOptions.push({value: i, label: this.state.keywordCategories[i].description, trigger: "7_msg_category"});
        }
        this.setState({categoriesOptions: tempOptions});
    }

    render() {
        return (
            <ChatbotPage
                keywordCategories={this.state.keywordCategories}
                ageCategories={this.state.ageCategories}
                categoriesOptions={this.state.categoriesOptions}
            />

        );
    }
}

export default Keywords;