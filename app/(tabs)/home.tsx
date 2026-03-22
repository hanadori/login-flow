import { Colors } from '@/constants/themes';
import { useThemeStore } from '@/store/themeStore';
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  const { theme, toggleTheme } = useThemeStore();
  const colors = Colors[theme];

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Welcome to Homepage</Text>
      <Button title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`} onPress={toggleTheme} />
      <Button title="Logout" onPress={() => router.replace("/login")} />
    </View>
  );
}