import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import tw, { useAppColorScheme } from "twrnc";
import type { SortedCountries } from "@/lib/types";
import { Image } from "expo-image";
import PagerView from "react-native-pager-view";

export default function Country() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [colorScheme] = useAppColorScheme(tw);

  //set header options
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: country?.name.common,
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerStyle: tw`bg-white dark:bg-[#000F24]`,
      headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
    });
  }, [navigation]);

  // get and sort cached data
  const cachedData: SortedCountries[] =
    queryClient.getQueryData(["allCountries"]) ?? [];
  const country = useMemo(() => {
    return cachedData
      .flatMap((group) => group.data)
      .find(
        (country) => country.cca3.toLowerCase() === id?.toString().toLowerCase()
      );
  }, [cachedData, id]);

  // components
  const CountryDetail = ({ title, data }: { title: string; data: any }) => {
    return (
      <View style={tw`gap-2 flex-row items-center`}>
        <Text style={tw`font-semibold dark:text-[#F2F4F7]`}>{title}:</Text>
        <Text style={tw`text-gray-500 dark:text-[#F2F4F7]`}>{data}</Text>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 gap-6 px-5 py-4 bg-white dark:bg-[#000F24]`}>
      <PagerView style={tw`h-52`} initialPage={0}>
        <Image
          key={1}
          source={{ uri: country?.flags.png }}
          style={tw`w-full h-full rounded-lg`}
        />
        <Image
          key={2}
          source={{ uri: country?.coatOfArms?.png }}
          style={tw`w-full h-full rounded-lg`}
        />
      </PagerView>

      <View style={tw`gap-2`}>
        <CountryDetail title="Population" data={country?.population} />
        <CountryDetail title="Region" data={country?.region} />
        <CountryDetail title="Capital" data={country?.capital} />
      </View>

      <View style={tw`gap-2`}>
        <CountryDetail
          title="Official Language"
          data={
            country?.languages ? Object.values(country.languages)[0] : "N/A"
          }
        />
        <CountryDetail title="Area" data={`${country?.area} km²`} />
      </View>
    </View>
  );
}
