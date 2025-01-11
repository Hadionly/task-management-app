import { Task } from "./Home.types";

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  currentTask: Task | null;
}

export interface TaskUpdate {
  id: string;
  title?: string;
  description?: string;
  status?: "pending" | "completed";
}
