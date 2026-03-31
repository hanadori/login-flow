import { auth } from "@/config/firebaseConfig";
import { Colors } from "@/constants/themes";
import { useThemeStore } from "@/store/themeStore";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {
  const { theme } = useThemeStore();
  const colors = Colors[theme];

  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.replace("/setup");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  const onGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/setup");
    } catch (error: any) {
      Alert.alert("Google Sign-up Failed", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Register</Text>

      <Text style={{ color: colors.text }}>Email</Text>
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
            style={[styles.input, { borderColor: colors.icon, color: colors.text, backgroundColor: colors.background }]}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            placeholderTextColor={colors.icon}
          />
        )}
      />
      <Text style={styles.error}>{errors.email?.message as string}</Text>

      <Text style={{ color: colors.text }}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
          }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text, backgroundColor: colors.background }]}
            secureTextEntry
            onChangeText={onChange}
            value={value}
            placeholderTextColor={colors.icon}
          />
        )}
      />
      <Text style={styles.error}>{errors.password?.message as string}</Text>

      <Text style={{ color: colors.text }}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          validate: value =>
            value === password || "Passwords do not match"
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text, backgroundColor: colors.background }]}
            secureTextEntry
            onChangeText={onChange}
            value={value}
            placeholderTextColor={colors.icon}
          />
        )}
      />
      <Text style={styles.error}>{errors.confirmPassword?.message as string}</Text>

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Sign up with Google" onPress={onGoogleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 10
  }
});