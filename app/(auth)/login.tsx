import { Colors } from '@/constants/themes';
import { useThemeStore } from '@/store/themeStore';
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const { theme } = useThemeStore();
  const colors = Colors[theme];

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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