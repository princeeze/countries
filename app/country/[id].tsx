import { AllCountries } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { SortedCountries } from "..";
import { Image } from "expo-image";

export default function Country() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const queryClient = useQueryClient();
  const cachedData: SortedCountries[] =
    queryClient.getQueryData(["allCountries"]) ?? [];
  const country = useMemo(() => {
    return cachedData
      .flatMap((group) => group.data)
      .find(
        (country) => country.cca3.toLowerCase() === id?.toString().toLowerCase()
      );
  }, [cachedData, id]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: country?.name.common,
      headerTitleAlign: "center",
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={tw`flex-1 gap-6 px-5 bg-white`}>
      <Image
        source={{ uri: country?.flags.png }}
        style={tw`w-full h-52 rounded-lg`}
      />

      <View style={tw`gap-2`}>
        <View style={tw`flex-row gap-2 items-center `}>
          <Text style={tw` font-semibold`}>Population:</Text>
          <Text style={tw`text-gray-500`}>{country?.population}</Text>
        </View>
        <View style={tw`flex-row gap-2 items-center `}>
          <Text style={tw` font-semibold`}>Region:</Text>
          <Text style={tw`text-gray-500`}>{country?.region}</Text>
        </View>
        <View style={tw`flex-row gap-2 items-center `}>
          <Text style={tw` font-semibold`}>Capital:</Text>
          <Text style={tw`text-gray-500`}>{country?.capital}</Text>
        </View>
      </View>

      <View style={tw`gap-2`}>
        <View style={tw`flex-row gap-2 items-center `}>
          <Text style={tw` font-semibold`}>Population:</Text>
          <Text style={tw`text-gray-500`}>
            {country?.languages ? Object.values(country.languages)[0] : "N/A"}
          </Text>
        </View>
        <View style={tw`flex-row gap-2 items-center `}>
          <Text style={tw` font-semibold`}>Region:</Text>
          <Text style={tw`text-gray-500`}>{country?.region}</Text>
        </View>
        <View style={tw`flex-row gap-2 items-center `}>
          <Text style={tw` font-semibold`}>Capital:</Text>
          <Text style={tw`text-gray-500`}>{country?.capital}</Text>
        </View>
      </View>
    </View>
  );
}
