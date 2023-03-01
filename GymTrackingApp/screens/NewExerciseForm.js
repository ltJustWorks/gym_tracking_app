import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { getData, saveData } from '../storage/dataHelper';
import styles from '../styles/styles';

const updateExerciseList = (exerciseObj) => {
  // Generate an id for exercise when submitting
  return getData("exercises")
    .then((exerciseList) => {
      exerciseList.push(exerciseObj)
      saveData("exercises", exerciseList)
    })

}

const NewExerciseForm = ({navigation}) => {
  const [name, setName] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  return (
    <View style={styles.dividerContainer}>
      <View>
        <TextInput
          placeholder="Exercise Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Sets"
          keyboardType="number-pad"
          value={sets}
          onChangeText={(text) => setSets(text)}
        />
        <TextInput
          placeholder="Reps"
          keyboardType="number-pad"
          value={reps}
          onChangeText={(text) => setReps(text)}
        />
        <TextInput
          placeholder="Weight (lbs)"
          keyboardType="number-pad"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
      </View>
      <Button 
        title="Save Exercise" 
        onPress={() => {
          updateExerciseList({name: name, sets: sets, reps: reps, weight: weight})
            .then(() => navigation.navigate("Exercise List"))
        }} 
      />
    </View>
  );
};

export default NewExerciseForm