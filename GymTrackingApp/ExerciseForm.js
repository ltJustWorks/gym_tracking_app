import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const ExerciseForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();

  return (
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
      <Button title="Save Exercise" onPress={() => onSubmit(name, sets, reps, weight)} />
    </View>
  );
};

export default ExerciseForm;
