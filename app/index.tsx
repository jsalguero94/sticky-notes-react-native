import React from "react";
import { BoardProvider } from "./context/BoardContext";
import Board from "./components/Board";
import Header from "./components/Header";
import EmptyState from "./components/EmptyState";
import { useBoard } from "./context/BoardContext";

import { View } from "react-native";
import { Dimensions } from "react-native";

// Main app wrapper with providers
const App: React.FC = () => {
  return (
    <BoardProvider>
      <AppContent />
    </BoardProvider>
  );
};

// App content that can access context
const AppContent: React.FC = () => {
  const { notes, addNote } = useBoard();
  const { width, height } = Dimensions.get("window");

  // Generate position for the first note
  const createFirstNote = () => {
    addNote({
      content:
        "Welcome to your sticky board! 📝\n\nYou can:\n- Drag this note around\n- Edit by clicking the pencil icon\n- Add more notes with the + button\n- Change note colors\n- Resize by dragging the bottom-right corner",
      position: { x: width / 2 - 110, y: height / 2 - 110 },
      color: "yellow",
      width: 260,
      height: 260,
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Header />
      <View className="flex-1 pt-14">
        {notes.length === 0 ? (
          <EmptyState onCreateNote={createFirstNote} />
        ) : (
          <Board />
        )}
      </View>
    </View>
  );
};

export default App;
