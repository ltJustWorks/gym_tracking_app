import AsyncStorage from '@react-native-async-storage/async-storage'

/* Data form

Exercises:
[
    {
        name: ...,
        sets: ...,
        reps: ...,
        weight: ...,
    },
    ...
]

Templates:

[
    [
        1: {exercise1},
        2: {exercise2},
    ]
]

New templates form: 

[
    {
        id: ...,
        name: ...,
        exercises: [
            exercise1,
            ...
        ]
    }
]

*/

const saveData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    }
    catch (e) {
        console.log(e)
    }
}

const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export { saveData, getData }