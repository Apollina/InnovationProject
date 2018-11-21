const apiHost = 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1'
//const apiHost = 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/events/?format=api'

export default {
    async fetchInitialCourses() {
        try {
            const response = await fetch(apiHost + '/event/?format=json');
            const responseJson = await response.json();
            console.log('RESPONSE JSON' + responseJson);
            console.log(responseJson);
            console.log(Object.keys(responseJson).length);
            console.log("test json read");
            console.log('ID' + responseJson.data);

            let key, count = 0;
            for(key in responseJson) {
                if(responseJson.hasOwnProperty(key)) {
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
            console.log('RESPONSE JSON' + responseJson);
            console.log(responseJson);
            console.log(Object.keys(responseJson).length);
            console.log("test json read");
            console.log('ID' + responseJson.data);

            let key, count = 0;
            for(key in responseJson) {
                if(responseJson.hasOwnProperty(key)) {
                    count++;
                }
            }
            console.log('COUNT' + count);


            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

};
