import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Invalid email format"
          }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      <Text style={styles.error}>{errors.email?.message as string}</Text>

      <Text>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Text style={styles.error}>{errors.password?.message as string}</Text>

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <Button title="Go to Register" onPress={() => router.push("/register")} />
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
  }
});