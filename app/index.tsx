import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  Button,
  Pressable,
  SectionList,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";
import { Image } from "expo-image";
// @ts-ignore
import logo from "@/assets/images/ex_logo.png";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetch } from "expo/fetch";
import { AllCountries } from "@/lib/types";

export type SortedCountries = {
  title: string;
  data: AllCountries[];
};

type Sections = {
  [key: string]: AllCountries[];
};
export default function Home() {
  const router = useRouter();

  const getCountries = async (): Promise<SortedCountries[]> => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const unSorterdCountries: AllCountries[] = await response.json();
    const sections: Sections = {};
    unSorterdCountries.forEach((country) => {
      const firstLetter = country.name.common.charAt(0).toUpperCase();
      if (!sections[firstLetter]) {
        sections[firstLetter] = [];
      }
      sections[firstLetter].push(country);
    });

    const sectionKeys = Object.keys(sections).sort();
    const sortedSections = sectionKeys.map((letter) => {
      return {
        title: letter,
        data: sections[letter].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        ),
      };
    });
    return sortedSections;
  };

  // Queries
  const { data, isPending } = useSuspenseQuery({
    queryKey: ["allCountries"],
    queryFn: getCountries,
  });

  const renderSectionHeader = ({ section }: { section: SortedCountries }) => (
    <View style={tw`py-2 px-4 bg-white dark:bg-gray-800`}>
      <Text style={tw`text-sm font-semibold text-gray-500 dark:text-gray-400`}>
        {section.title}
      </Text>
    </View>
  );

  const renderCountryItem = ({ item }: { item: AllCountries }) => (
    <TouchableOpacity
      style={tw`flex-row items-center p-4 bg-white dark:bg-gray-900`}
      onPress={() => router.push(`/country/${item.cca3.toLowerCase()}`)}
    >
      <Image
        source={{ uri: item.flags.png }}
        style={tw`w-9 h-9 rounded-lg mr-4`}
        contentFit="cover"
      />
      <View>
        <Text style={tw`font-semibold text-black dark:text-white`}>
          {item.name.common}
        </Text>
        <Text style={tw`text-gray-500 dark:text-gray-400`}>
          {item.capital?.[0] || "No capital"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-gray-900`}>
      <View style={tw`flex-1`}>
        <View style={tw`p-4`}>
          <View style={tw`justify-between flex-row items-center`}>
            <Image
              source={logo}
              style={tw`text-2xl w-32 h-7 font-bold my-4 text-black dark:text-white`}
            />
            <TouchableOpacity
              style={tw`p-2 rounded-full bg-gray-100 dark:bg-gray-800`}
            >
              <Feather name="sun" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={tw`flex-row items-center mb-5 rounded-lg px-4 bg-[#F2F4F7] dark:bg-gray-800`}
          >
            <Feather
              name="search"
              size={20}
              style={tw`text-gray-500 dark:text-gray-400`}
            />
            <TextInput
              placeholder="Search Country"
              style={tw`ml-2 flex-1 py-3 text-black dark:text-white`}
            />
          </View>

          <View style={tw`flex-row justify-between mb-4`}>
            <TouchableOpacity
              style={tw`flex-row rounded-sm bg-white gap-0.5 border-[#A9B8D4] border-[0.5px] px-3 py-2 justify-center items-center`}
            >
              <Ionicons
                name="globe-outline"
                size={20}
                style={tw`text-black dark:text-white`}
              />
              <Text
                style={tw`ml-1 text-black small-caps text-xs dark:text-white`}
              >
                EN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-row rounded-sm gap-0.5 bg-[#FCFCFD] border-[#A9B8D4] border-[0.5px] px-3 py-2 justify-center items-center`}
            >
              <Ionicons
                name="funnel-outline"
                size={20}
                style={tw`text-black dark:text-white`}
              />
              <Text style={tw`ml-1 text-black text-xs dark:text-white`}>
                Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isPending ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-black dark:text-white text-lg`}>
              Loading...
            </Text>
          </View>
        ) : (
          <SectionList
            sections={data}
            renderItem={renderCountryItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled
            keyExtractor={(item) => item.cca3}
            contentContainerStyle={tw`pb-4`}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
