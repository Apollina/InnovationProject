import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    screen: {
        marginTop: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    pageContainer: {
        marginTop: 0
    },
    profilePicture: {
        marginRight: 10,
        height: 90,
        width: 160,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'black'
    },
    flex1: {
        flex: 1,
        alignItems: 'center'
    },
    flexCenter: {
        justifyContent: 'center'
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
    },
    btnWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    textWrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    viewWrapper: {
        margin: 20
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    coursesWrapper: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 40
    },
    H1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    H2: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    courseHeader: {
        fontWeight: 'bold',
        marginTop: 5
    },
    inputHeader: {
        fontWeight: 'bold',
        fontSize: 20
    },
    smallText: {
        fontSize: 15,
        paddingBottom: 10
    },
    reallySmallText: {
        fontSize: 5
    },
    progressBar: {
        marginTop: 5,
        marginBottom: 15
    },
    editButton: {
        marginVertical: 15,
        alignSelf: "center",
        flex: 1,
        borderColor: "#22f",
    },
    enrollButton: {
        marginVertical: 15,
        marginHorizontal: 15,
        borderColor: "#22f",
        flex: 1
    },
    listOfCourses: {
        width: '100%'
    },
    course: {
        marginHorizontal: 12,
        marginTop: 12,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    textBtn: {
        alignSelf: "center",
        textAlign: "center",
        color: "#22f",
    },
    courseDetailsPage: {
        marginHorizontal: 12,
    },
    backLink: {
        marginBottom: 10,
        color: "#22f"
    },
    searchBar: {
        height: 40,
        marginHorizontal: 12
    }
});
