import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text>Welcome to Homepage</Text>
      <Button title="Logout" onPress={() => router.replace("/login")} />
    </View>
  );
}