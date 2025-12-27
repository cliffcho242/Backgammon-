import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        🎲 Backgammon
      </Text>
      <Button title="Start Game" onPress={() => router.push("/game")} />
    </View>
  );
}