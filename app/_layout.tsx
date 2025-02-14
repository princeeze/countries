import { Stack } from "expo-router";
import tw, { useDeviceContext } from "twrnc";
import { setPositionAsync, setBackgroundColorAsync } from "expo-navigation-bar";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const setBar = async () => {
      await setBackgroundColorAsync("#55555500");
      await setPositionAsync("absolute");
    };
    setBar();
  }, []);
  useDeviceContext(tw);
  return <Stack screenOptions={{ headerShown: false }} />;
}
