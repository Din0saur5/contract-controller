import { Stack } from "expo-router";
// This is our router where we define paths

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
