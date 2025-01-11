import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation.types";
import { RouteProp } from "@react-navigation/native";

export interface TaskFormProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "TaskForm">;
  route: RouteProp<RootStackParamList, "TaskForm">;
}

export interface FormValues {
  title: string;
  description: string;
  status: "pending" | "completed";
}
