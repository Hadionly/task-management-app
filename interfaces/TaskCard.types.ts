export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

export interface TaskCardProps {
  task: Task;
  onStatusUpdate: (id: string, status: "pending" | "completed") => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
