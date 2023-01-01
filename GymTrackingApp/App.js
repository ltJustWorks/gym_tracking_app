import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainMenu from './screens/MainMenu'
import ExerciseList from './screens/ExerciseList'
import NewExerciseForm from './screens/NewExerciseForm'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="ExerciseList" component={ExerciseList} />
        <Stack.Screen name="NewExerciseForm" component={NewExerciseForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;