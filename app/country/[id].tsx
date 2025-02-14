import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

export default function Country() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text>Country {id}</Text>
    </View>
  );
}
