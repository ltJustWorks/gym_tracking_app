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
            fontSize: 20 
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
        setRow: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
        },
        dividerContainer: {
            flex: 1,
            justifyContent: "space-between"
        }
    }
)

export default styles;