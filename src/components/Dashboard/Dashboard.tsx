import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import type {
  SortOption,
  Task,
  TaskFilters,
  TaskFormData,
  TaskStatistics,
  TaskStatus,
  Theme,
} from "../../types";
import {
  filterTasks,
  isValidTask,
  sortTasks,
} from "../../utils/taskUtils";

const TASKS_STORAGE_KEY = "task-dashboard-tasks";
const THEME_STORAGE_KEY = "task-dashboard-theme";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Review React notes",
    description:
      "Practice React components, props, and state management.",
    status: "pending",
    priority: "low",
    dueDate: "2026-10-05",
    createdAt: "2026-09-20T12:00:00.000Z",
  },
  {
    id: "2",
    title: "Complete the task dashboard",
    description:
      "Finish the dashboard features and test the application.",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-10-01",
    createdAt: "2026-09-20T12:05:00.000Z",
  },
  {
    id: "3",
    title: "Set up the project",
    description:
      "Connect React, TypeScript, Vite, and Tailwind CSS.",
    status: "completed",
    priority: "medium",
    dueDate: "2026-09-25",
    createdAt: "2026-09-20T12:10:00.000Z",
  },
];

const defaultFilters: TaskFilters = {
  status: "all",
  priority: "all",
  search: "",
};

function loadSavedTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(
      TASKS_STORAGE_KEY,
    );

    if (!savedTasks) {
      return initialTasks;
    }

    const parsedTasks: unknown = JSON.parse(savedTasks);

    if (
      Array.isArray(parsedTasks) &&
      parsedTasks.every(isValidTask)
    ) {
      return parsedTasks;
    }
  } catch {
    return initialTasks;
  }

  return initialTasks;
}

function loadSavedTheme(): Theme {
  const savedTheme = localStorage.getItem(
    THEME_STORAGE_KEY,
  );

  return savedTheme === "dark" ? "dark" : "light";
}

export default function Dashboard() {
  const [tasks, setTasks] =
    useState<Task[]>(loadSavedTasks);
  const [taskToEdit, setTaskToEdit] =
    useState<Task | null>(null);
  const [filters, setFilters] =
    useState<TaskFilters>(defaultFilters);
  const [sortOption, setSortOption] =
    useState<SortOption>("original");
  const [theme, setTheme] =
    useState<Theme>(loadSavedTheme);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(tasks),
    );
  }, [tasks]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const visibleTasks = useMemo(() => {
    const filteredTasks = filterTasks(tasks, filters);
    return sortTasks(filteredTasks, sortOption);
  }, [tasks, filters, sortOption]);

  const statistics: TaskStatistics = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter(
        (task) => task.status === "pending",
      ).length,
      inProgress: tasks.filter(
        (task) => task.status === "in-progress",
      ).length,
      completed: tasks.filter(
        (task) => task.status === "completed",
      ).length,
    }),
    [tasks],
  );

  function handleFormSubmit(formData: TaskFormData) {
    if (taskToEdit) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === taskToEdit.id
            ? { ...task, ...formData }
            : task,
        ),
      );

      setTaskToEdit(null);
      setMessage("Task updated successfully.");
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
    setMessage("Task added successfully.");
  }

  function handleStatusChange(
    taskId: string,
    newStatus: TaskStatus,
  ) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task,
      ),
    );

    setMessage("Task status updated.");
  }

  function handleDelete(taskId: string) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!shouldDelete) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskId,
      ),
    );

    if (taskToEdit?.id === taskId) {
      setTaskToEdit(null);
    }

    setMessage("Task deleted.");
  }

  function handleMove(
    taskId: string,
    direction: "up" | "down",
  ) {
    const visibleIndex = visibleTasks.findIndex(
      (task) => task.id === taskId,
    );

    const targetVisibleIndex =
      direction === "up"
        ? visibleIndex - 1
        : visibleIndex + 1;

    if (
      visibleIndex === -1 ||
      targetVisibleIndex < 0 ||
      targetVisibleIndex >= visibleTasks.length
    ) {
      return;
    }

    const targetTaskId =
      visibleTasks[targetVisibleIndex].id;

    setTasks((previousTasks) => {
      const updatedTasks = [...previousTasks];
      const currentIndex = updatedTasks.findIndex(
        (task) => task.id === taskId,
      );
      const targetIndex = updatedTasks.findIndex(
        (task) => task.id === targetTaskId,
      );

      [updatedTasks[currentIndex], updatedTasks[targetIndex]] =
        [
          updatedTasks[targetIndex],
          updatedTasks[currentIndex],
        ];

      return updatedTasks;
    });

    if (sortOption !== "original") {
      setSortOption("original");
    }

    setMessage("Task order updated.");
  }

  function handleExport() {
    const taskData = JSON.stringify(tasks, null, 2);
    const file = new Blob([taskData], {
      type: "application/json",
    });
    const fileUrl = URL.createObjectURL(file);
    const downloadLink = document.createElement("a");

    downloadLink.href = fileUrl;
    downloadLink.download = "task-dashboard-data.json";
    downloadLink.click();

    URL.revokeObjectURL(fileUrl);
    setMessage("Tasks exported successfully.");
  }

  async function handleImport(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    try {
      const fileContents = await selectedFile.text();
      const importedData: unknown =
        JSON.parse(fileContents);

      if (!Array.isArray(importedData)) {
        throw new Error("Invalid file");
      }

      const validTasks = importedData.filter(isValidTask);

      if (validTasks.length !== importedData.length) {
        throw new Error("Invalid task data");
      }

      setTasks(validTasks);
      setTaskToEdit(null);
      setMessage("Tasks imported successfully.");
    } catch {
      setMessage(
        "Import failed. Please select a valid task JSON file.",
      );
    }

    event.target.value = "";
  }

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Task Management Dashboard
            </h1>

            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Organize your tasks and track your progress.
            </p>
          </div>

          <button
            className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-amber-400 dark:text-slate-900 dark:hover:bg-amber-300"
            type="button"
            onClick={toggleTheme}
          >
            {theme === "light"
              ? "Dark Mode"
              : "Light Mode"}
          </button>
        </header>

        {message && (
          <div
            className="mb-6 flex items-center justify-between rounded-xl bg-blue-100 p-4 text-blue-900"
            role="status"
          >
            <span>{message}</span>

            <button
              className="px-2 py-1 text-sm hover:bg-blue-200"
              type="button"
              aria-label="Dismiss message"
              onClick={() => setMessage("")}
            >
              Close
            </button>
          </div>
        )}

        <section
          className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Task statistics"
        >
          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Total Tasks
            </p>
            <p className="mt-1 text-3xl font-bold">
              {statistics.total}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Pending
            </p>
            <p className="mt-1 text-3xl font-bold">
              {statistics.pending}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              In Progress
            </p>
            <p className="mt-1 text-3xl font-bold text-blue-600">
              {statistics.inProgress}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Completed
            </p>
            <p className="mt-1 text-3xl font-bold text-green-600">
              {statistics.completed}
            </p>
          </div>
        </section>

        <div className="mb-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <TaskForm
            taskToEdit={taskToEdit}
            onSubmit={handleFormSubmit}
            onCancelEdit={() => setTaskToEdit(null)}
          />

          <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-bold">
              Data Tools
            </h2>

            <div className="flex flex-wrap gap-3">
              <button
                className="bg-green-700 text-white hover:bg-green-800"
                type="button"
                onClick={handleExport}
              >
                Export Tasks
              </button>

              <label className="cursor-pointer rounded-lg bg-purple-700 px-4 py-2 font-medium text-white transition hover:bg-purple-800 active:scale-95">
                Import Tasks

                <input
                  className="sr-only"
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImport}
                />
              </label>
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
              Export your tasks as a JSON file or import a
              previously exported file.
            </p>
          </section>
        </div>

        <div className="mb-6">
          <TaskFilter
            filters={filters}
            sortOption={sortOption}
            onFilterChange={setFilters}
            onSortChange={setSortOption}
          />
        </div>

        <TaskList
          tasks={visibleTasks}
          onStatusChange={handleStatusChange}
          onEdit={setTaskToEdit}
          onDelete={handleDelete}
          onMove={handleMove}
        />
      </div>
    </main>
  );
}