import type {
  SortOption,
  Task,
  TaskFilters,
  TaskFormData,
  TaskFormErrors,
} from "../types";

export function filterTasks(
  tasks: Task[],
  filters: TaskFilters,
): Task[] {
  const searchTerm = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus =
      filters.status === "all" ||
      task.status === filters.status;

    const matchesPriority =
      filters.priority === "all" ||
      task.priority === filters.priority;

    const matchesSearch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm);

    return (
      matchesStatus &&
      matchesPriority &&
      matchesSearch
    );
  });
}

export function sortTasks(
  tasks: Task[],
  sortOption: SortOption,
): Task[] {
  const sortedTasks = [...tasks];

  if (sortOption === "due-date") {
    return sortedTasks.sort((a, b) =>
      a.dueDate.localeCompare(b.dueDate),
    );
  }

  if (sortOption === "priority") {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return sortedTasks.sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority],
    );
  }

  if (sortOption === "title") {
    return sortedTasks.sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

  return sortedTasks;
}

export function validateTaskForm(
  formData: TaskFormData,
): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!formData.title.trim()) {
    errors.title = "A task title is required.";
  } else if (formData.title.trim().length < 3) {
    errors.title =
      "The title must contain at least 3 characters.";
  }

  if (!formData.description.trim()) {
    errors.description = "A description is required.";
  } else if (formData.description.trim().length < 5) {
    errors.description =
      "The description must contain at least 5 characters.";
  }

  if (!formData.dueDate) {
    errors.dueDate = "A due date is required.";
  }

  return errors;
}

export function formatDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isValidTask(value: unknown): value is Task {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    ["pending", "in-progress", "completed"].includes(
      task.status as string,
    ) &&
    ["low", "medium", "high"].includes(
      task.priority as string,
    ) &&
    typeof task.dueDate === "string" &&
    typeof task.createdAt === "string"
  );
}