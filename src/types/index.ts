export type TaskStatus = "pending" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type SortOption =
  | "original"
  | "due-date"
  | "priority"
  | "title";

export type Theme = "light" | "dark";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskFilters {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  search: string;
}

export interface TaskFormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

export interface TaskFormProps {
  taskToEdit: Task | null;
  onSubmit: (formData: TaskFormData) => void;
  onCancelEdit: () => void;
}

export interface TaskFilterProps {
  filters: TaskFilters;
  sortOption: SortOption;
  onFilterChange: (filters: TaskFilters) => void;
  onSortChange: (sortOption: SortOption) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (
    taskId: string,
    newStatus: TaskStatus,
  ) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMove: (
    taskId: string,
    direction: "up" | "down",
  ) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (
    taskId: string,
    newStatus: TaskStatus,
  ) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMove: (
    taskId: string,
    direction: "up" | "down",
  ) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export interface TaskStatistics {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}