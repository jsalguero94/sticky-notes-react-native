import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  PanResponder,
  StyleSheet,
} from "react-native";
import { Move, Edit, Trash2 } from "lucide-react-native";
import { Note } from "../types";
import { useBoard } from "../context/BoardContext";
import { getContrastTextColor, getRandomRotation } from "../utils/helpers";

interface NoteProps {
  note: Note;
}

const NoteComponent: React.FC<NoteProps> = ({ note }) => {
  const { updateNote, deleteNote, bringToFront } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [rotation] = useState(() => getRandomRotation());

  const pan = useRef({ x: note.position.x, y: note.position.y });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => bringToFront(note.id),
      onPanResponderMove: (_, gestureState) => {
        const newX = pan.current.x + gestureState.dx;
        const newY = pan.current.y + gestureState.dy;

        updateNote(note.id, { position: { x: newX, y: newY } });
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.current.x += gestureState.dx;
        pan.current.y += gestureState.dy;
      },
    }),
  ).current;

  const textColorClass = getContrastTextColor(note.color);
  const colorStyles: Record<string, string> = {
    yellow: "bg-amber-200",
    blue: "bg-blue-300",
    green: "bg-green-200",
    pink: "bg-pink-200",
    purple: "bg-purple-300",
  };

  const saveContent = () => {
    setIsEditing(false);
    updateNote(note.id, { content });
  };

  return (
    <View
      {...panResponder.panHandlers}
      className={`absolute rounded-md shadow-md p-2 ${colorStyles[note.color] || "bg-amber-200"} ${textColorClass}`}
      style={{
        left: note.position.x,
        top: note.position.y,
        width: note.width,
        height: note.height,
        zIndex: note.zIndex,
        transform: [
          {
            rotate: rotation.replace("rotate(", "").replace("deg)", "") + "deg",
          },
        ],
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Move size={16} color="black" />
        <View className="flex-row space-x-2">
          <Pressable onPress={() => setIsEditing(true)}>
            <Edit size={16} color="black" />
          </Pressable>
          <Pressable onPress={() => deleteNote(note.id)}>
            <Trash2 size={16} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {isEditing ? (
          <TextInput
            value={content}
            onChangeText={setContent}
            onBlur={saveContent}
            multiline
            className={`flex-1 text-base ${textColorClass}`}
            autoFocus
          />
        ) : (
          <Text className="whitespace-pre-wrap">{content}</Text>
        )}
      </View>
    </View>
  );
};

export default NoteComponent;
