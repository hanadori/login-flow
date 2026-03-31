import { auth } from "@/config/firebaseConfig";
import { Colors } from "@/constants/themes";
import { useThemeStore } from "@/store/themeStore";
import { router } from "expo-router";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const { theme } = useThemeStore();
  const colors = Colors[theme];

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const onGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Google Login Failed", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

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
        rules={{ required: "Password is required" }}
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

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Sign in with Google" onPress={onGoogleLogin} />
      <View style={{ marginVertical: 5 }} />
      <Button title="Go to Register" onPress={() => router.push("/register")} />
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