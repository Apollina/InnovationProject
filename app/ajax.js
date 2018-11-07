const apiHost = 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1'
//const apiHost = 'https://bakesaleforgood.com'
//const apiHost = 'https://api.hel.fi/linkedevents/v'
//const apiHost = 'https://linkedcourses-api.test.hel.ninja/linkedcourses-test/v1/events/?format=api'

export default {
    async fetchInitialCourses() {
        try {
            let response = await fetch(apiHost + '/event/?format=json');
            let responseJson = await response.json();
            console.log(responseJson);
            console.log(Object.keys(responseJson).length);
            console.log("test json read");
            console.log(responseJson.data.id);

            let key, count = 0;
            for(key in responseJson) {
                if(responseJson.hasOwnProperty(key)) {
                    count++;
                }
            }
            console.log(count);


            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

};
