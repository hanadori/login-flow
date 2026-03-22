import { Colors } from '@/constants/themes';
import { useThemeStore } from '@/store/themeStore';
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {
  const { theme } = useThemeStore();
  const colors = Colors[theme];

  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = () => {
    router.replace("/setup");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text, backgroundColor: colors.background }]}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={colors.icon}
          />
        )}
      />

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