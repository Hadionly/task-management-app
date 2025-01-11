import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation.types";

// Types
interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

interface HomeProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

interface RootState {
  tasks: {
    tasks: Task[];
    loading: boolean;
    error: string | null;
  };
}

export type { Task, HomeProps, RootState };
