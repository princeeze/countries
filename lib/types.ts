export type SortedCountries = {
  title: string;
  data: AllCountries[];
};

export interface AllCountries {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  independent?: boolean;
  status: Status;
  unMember: boolean;
  currencies?: { [key: string]: Currency };
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: Region;
  languages?: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  car: Car;
  timezones: string[];
  continents: Continent[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  cioc?: string;
  subregion?: string;
  fifa?: string;
  borders?: string[];
  gini?: { [key: string]: number };
  postalCode?: PostalCode;
}

interface CapitalInfo {
  latlng?: number[];
}

interface Car {
  signs?: string[];
  side: Side;
}

enum Side {
  Left = "left",
  Right = "right",
}

interface CoatOfArms {
  png?: string;
  svg?: string;
}

enum Continent {
  Africa = "Africa",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

interface Currency {
  name: string;
  symbol: string;
}

interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

interface Eng {
  f: string;
  m: string;
}

interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

interface Idd {
  root?: string;
  suffixes?: string[];
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: Translation };
}

interface Translation {
  official: string;
  common: string;
}

interface PostalCode {
  format: string;
  regex?: string;
}

enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

enum StartOfWeek {
  Monday = "monday",
  Saturday = "saturday",
  Sunday = "sunday",
}

enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}
