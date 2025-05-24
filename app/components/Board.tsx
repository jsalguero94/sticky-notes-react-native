import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBoard, noteColors } from "../context/BoardContext";
import NoteComponent from "./NoteComponent";
import { Plus, Palette } from "lucide-react-native";
import { generateRandomPosition } from "../utils/helpers";
import type { NoteColor } from "../types";
import clsx from "clsx";

const Board: React.FC = () => {
  const { notes, addNote } = useBoard();
  const [selectedColor, setSelectedColor] = useState<NoteColor>("yellow");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });

  const createNewNote = () => {
    const position = generateRandomPosition(boardSize.width, boardSize.height);
    addNote({
      content: "New note",
      position,
      color: selectedColor,
      width: 220,
      height: 220,
    });
  };

  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setBoardSize({ width, height });
  };

  const ColorIndicator = () => (
    <View
      className={clsx(
        "w-4 h-4 rounded-full ml-1",
        selectedColor === "yellow"
          ? "bg-amber-200"
          : selectedColor === "blue"
            ? "bg-blue-300"
            : selectedColor === "green"
              ? "bg-green-200"
              : selectedColor === "pink"
                ? "bg-pink-200"
                : "bg-purple-300",
      )}
    />
  );

  return (
    <SafeAreaView
      onLayout={handleLayout}
      className="w-full h-full bg-gray-100"
      style={{ flex: 1, position: "relative" }} // 👈 this is the key
    >
      {/* Notes */}
      {notes.map((note) => (
        <NoteComponent key={note.id} note={note} />
      ))}

      {/* Controls */}
      <View
        className="absolute bottom-4 right-4 items-end"
        style={{
          zIndex: 9999, // 👈 very hight
          elevation: 20, // 👈 for Android
          paddingBottom: 16,
          paddingRight: 16,
        }}
      >
        {showColorPicker && (
          <View
            className="flex-row bg-white p-2 rounded-full shadow-sm mb-2"
            style={{ marginBottom: 8 }}
          >
            {noteColors.map((color) => (
              <Pressable
                key={color}
                onPress={() => {
                  setSelectedColor(color as NoteColor);
                  setShowColorPicker(false);
                }}
                className={clsx(
                  "w-8 h-8 rounded-full",
                  selectedColor === color
                    ? "scale-110 ring-2 ring-gray-600"
                    : "hover:scale-105",
                  color === "yellow"
                    ? "bg-amber-200"
                    : color === "blue"
                      ? "bg-blue-300"
                      : color === "green"
                        ? "bg-green-200"
                        : color === "pink"
                          ? "bg-pink-200"
                          : "bg-purple-300",
                )}
                style={{ marginRight: 8 }}
              />
            ))}
          </View>
        )}

        <Pressable
          onPress={() => setShowColorPicker(!showColorPicker)}
          className="flex-row items-center justify-center p-3 bg-white rounded-full shadow-sm hover:bg-gray-50"
          style={{ marginBottom: 8 }}
        >
          <Palette size={20} color="black" />
          <ColorIndicator />
        </Pressable>

        <Pressable
          onPress={createNewNote}
          className="items-center justify-center p-4 bg-blue-500 rounded-full shadow-sm"
        >
          <Plus size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Board;
