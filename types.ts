import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Signup: undefined;
};

export type AuthNavProp = NativeStackNavigationProp<RootStackParamList>;
