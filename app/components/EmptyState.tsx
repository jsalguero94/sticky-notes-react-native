import React from "react";
import { View, Text, Pressable } from "react-native";
import { StickyNote } from "lucide-react-native";

interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNote }) => {
  return (
    <View className="flex flex-col items-center justify-center h-full text-center p-4 animate-fade-in">
      <StickyNote size={64} color="#9CA3AF" className="mb-4" />
      <Text className="text-2xl font-semibold text-gray-700 mb-2">
        No notes yet
      </Text>
      <Text className="text-gray-500 mb-6 max-w-md text-center">
        Create your first note to get started. You can drag, edit, and organize
        notes on this board.
      </Text>
      <Pressable
        onPress={onCreateNote}
        accessibilityLabel="Create your first note"
        className="px-4 py-2 bg-blue-500 rounded-md shadow-sm"
        android_ripple={{ color: "#2563EB" }}
      >
        <Text className="text-white text-center">Create your first note</Text>
      </Pressable>
    </View>
  );
};

export default EmptyState;
