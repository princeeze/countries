import { Stack } from "expo-router";
import tw, { useDeviceContext } from "twrnc";
import { setPositionAsync, setBackgroundColorAsync } from "expo-navigation-bar";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();
  useDeviceContext(tw);
  useEffect(() => {
    setPositionAsync("absolute");
    setBackgroundColorAsync("#ffffff00");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
