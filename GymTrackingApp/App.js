import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainMenu from './screens/MainMenu'
import ExerciseList from './screens/ExerciseList'
import ExerciseTemplateList from './screens/ExerciseTemplateList';
import NewTemplateForm from './screens/NewTemplateForm';
import SelectTemplate from './screens/SelectTemplate';
import WorkoutProgress from './screens/WorkoutProgress';
import ViewExercise from './screens/ViewExercise';
import WorkoutHistory from './screens/WorkoutHistory';
import ViewWorkoutRecord from './screens/ViewWorkoutRecord';
import EditTemplateForm from './screens/EditTemplateForm';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Exercise Template List" component={ExerciseTemplateList} />
        <Stack.Screen name="New Template Form" component={NewTemplateForm} />
        <Stack.Screen name="Edit Template Form" component={EditTemplateForm} />
        <Stack.Screen name="Exercise List" component={ExerciseList} />
        <Stack.Screen name="View Exercise" component={ViewExercise} />
        <Stack.Screen name="Select Template" component={SelectTemplate} />
        <Stack.Screen name="Workout Progress" component={WorkoutProgress} />
        <Stack.Screen name="Workout History" component={WorkoutHistory} />
        <Stack.Screen name="View Workout Record" component={ViewWorkoutRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;