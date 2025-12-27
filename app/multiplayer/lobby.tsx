import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface Player {
  id: string;
  name: string;
  status: "online" | "in-game";
}

export default function MultiplayerLobby() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Player 1", status: "online" },
    { id: "2", name: "Player 2", status: "in-game" },
    { id: "3", name: "Player 3", status: "online" },
  ]);

  const handleCreateGame = () => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    // TODO: Implement game creation logic
    console.log("Creating game for:", playerName);
    router.push("/game");
  };

  const handleJoinGame = (playerId: string) => {
    if (!playerName.trim()) {
      alert("Please enter your name");
      return;
    }
    // TODO: Implement join game logic
    console.log("Joining game with player:", playerId);
    router.push("/game");
  };

  const renderPlayer = ({ item }: { item: Player }) => (
    <View style={styles.playerItem}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text
          style={[
            styles.playerStatus,
            item.status === "online" ? styles.online : styles.inGame,
          ]}
        >
          {item.status}
        </Text>
      </View>
      {item.status === "online" && (
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => handleJoinGame(item.id)}
        >
          <Text style={styles.joinButtonText}>Challenge</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Multiplayer Lobby</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={playerName}
          onChangeText={setPlayerName}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateGame}>
        <Text style={styles.createButtonText}>Create New Game</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Available Players</Text>
      
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
        style={styles.playerList}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
    color: "#555",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 20,
  },
  playerList: {
    flex: 1,
  },
  playerItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  playerStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  online: {
    color: "#4CAF50",
  },
  inGame: {
    color: "#FF9800",
  },
  joinButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  joinButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#666",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
