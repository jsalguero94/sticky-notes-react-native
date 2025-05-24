import React from "react";
import { View, Text } from "react-native";
import { StickyNote } from "lucide-react-native";

const Header: React.FC = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bg-white shadow-sm z-50 h-14 flex-row items-center px-4">
      <View className="flex-row items-center space-x-2">
        <StickyNote size={24} color="#3B82F6" />
        <Text className="text-xl font-semibold text-gray-800">
          Sticky Board
        </Text>
      </View>
    </View>
  );
};

export default Header;
