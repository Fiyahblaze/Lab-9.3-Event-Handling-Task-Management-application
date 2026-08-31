import { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import type { Task, TaskStatus } from "./types";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Review React notes",
    description: "Practice rendering lists and using unique keys.",
    status: "pending",
    priority: "low",
    dueDate: "2026-09-03",
  },
  {
    id: "2",
    title: "Complete the task manager",
    description: "Test task filters, status changes, and deletion.",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-09-01",
  },
  {
    id: "3",
    title: "Set up the project",
    description: "Connect React, TypeScript, Vite, and Tailwind.",
    status: "completed",
    priority: "medium",
    dueDate: "2026-08-31",
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleStatusChange(taskId: string, newStatus: TaskStatus) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  }

  function handleDelete(taskId: string) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== taskId),
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-8">
      <h1 className="text-3xl font-bold">Task Manager</h1>

      <p className="mb-6 mt-2 text-slate-600">
        Filter your tasks and keep track of your progress.
      </p>

      <TaskList
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </main>
  );
}