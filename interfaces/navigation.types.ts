import { Task } from "../components/TaskCard";

// Define types for navigation
export type RootStackParamList = {
  Home: undefined;
  TaskForm: {
    isEditing: boolean;
    selectedTask: Task | null;
  };
};
