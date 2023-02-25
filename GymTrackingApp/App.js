import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainMenu from './screens/MainMenu'
import ExerciseList from './screens/ExerciseList'
import NewExerciseForm from './screens/NewExerciseForm'
import ExerciseTemplateList from './screens/ExerciseTemplateList';
import NewTemplateForm from './screens/NewTemplateForm';
import SelectTemplate from './screens/SelectTemplate';
import WorkoutProgress from './screens/WorkoutProgress';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="ExerciseTemplateList" component={ExerciseTemplateList} />
        <Stack.Screen name="NewTemplateForm" component={NewTemplateForm} />
        <Stack.Screen name="ExerciseList" component={ExerciseList} />
        <Stack.Screen name="NewExerciseForm" component={NewExerciseForm} />
        <Stack.Screen name="SelectTemplate" component={SelectTemplate} />
        <Stack.Screen name="WorkoutProgress" component={WorkoutProgress} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;