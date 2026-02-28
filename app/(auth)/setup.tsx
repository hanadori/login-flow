import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Setup() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Button title="Pick Profile Photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        rules={{ required: "First Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} />
        )}
      />
      <Text style={styles.error}>{errors.firstName?.message as string}</Text>

      <Text>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        rules={{ required: "Last Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} onChangeText={onChange} value={value} />
        )}
      />
      <Text style={styles.error}>{errors.lastName?.message as string}</Text>

      <Button title="Complete Setup" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f2f2f2"
  },
  error: {
    color: "red",
    marginBottom: 10
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10
  }
});