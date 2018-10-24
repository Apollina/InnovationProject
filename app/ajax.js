const apiHost = 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1'

export default {
    async fetchInitialCourses() {
        try {
            let response = await fetch(apiHost + '/event/?format=json');
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

};
