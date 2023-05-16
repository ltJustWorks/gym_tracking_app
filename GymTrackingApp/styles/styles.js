import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        exerciseContainer: {
            backgroundColor: "#eaeaea",
            margin: 10
        },
        title: {
            fontWeight: "bold",
            fontSize: 30,
            alignSelf: "center"
        },
        itemtitle: {
            fontSize: 25
        },
        subtext: {
            fontSize: 20,
            flexWrap: "wrap"
        },
        subtext2: {
            fontSize: 18
        },
        templateList: {
            //flex: 1
        },
        template: {
            backgroundColor: "#eaeaea",
            margin: 10
        },
        setEntry: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
        },
        setRow: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            flexGrow: 5
        },
        dividerContainer: {
            flex: 1,
            justifyContent: "space-between"
        },
        exerciseItemButton: {
            flex: 1,
            justifyContent: "flex-start"
        },
        mainMenu: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around"
        },
        mainMenuButton: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#2196f3",
            margin: 25,
            elevation: 4
        }
    }
)

export default styles;