import { Platform } from "react-native";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: Platform.OS !== "web",
      }}
    />
  );
  // return <Stack screenOptions={{ headerShown: false }} />;
}
