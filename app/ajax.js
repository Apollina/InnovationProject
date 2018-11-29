const apiHost = 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1'

export default {
    async fetchInitialCourses() {
        try {
            const response = await fetch(apiHost + '/event/?format=json');
            const responseJson = await response.json();
            console.log(Object.keys(responseJson).length);
            console.log('ID' + responseJson.data);

            let key, count = 0;
            for (key in responseJson) {
                if (responseJson.hasOwnProperty(key)) {
                    count++;
                }
            }
            console.log('COUNT' + count);

            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchICourseDetails(courseId) {
        try {
            const response = await fetch(apiHost + '/event/?format=json' + courseId);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchICoursesSearchResults(searchTerm) {
        try {
            const response = await fetch(apiHost + '/event/?text=' + searchTerm);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchCoursesByKeyword(keyword) {
        try {
            let response = await fetch(apiHost + '/event/?keyword='+keyword);
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchInitialKeywords() {
        try {
            let response = await fetch(apiHost + '/keyword/?format=json');
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }
};
