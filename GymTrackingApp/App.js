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
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Exercise Template List" component={ExerciseTemplateList} />
        <Stack.Screen name="New Template Form" component={NewTemplateForm} />
        <Stack.Screen name="Exercise List" component={ExerciseList} />
        <Stack.Screen name="New Exercise Form" component={NewExerciseForm} />
        <Stack.Screen name="Select Template" component={SelectTemplate} />
        <Stack.Screen name="Workout Progress" component={WorkoutProgress} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;