import { useState } from "react";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskItem from "../TaskItem/TaskItem";
import type { TaskFilters, TaskListProps } from "../../types";

export default function TaskList({
  tasks,
  onStatusChange,
  onDelete,
}: TaskListProps) {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortByDate, setSortByDate] = useState(false);

  const visibleTasks = tasks.filter(
    (task) =>
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority),
  );

  if (sortByDate) {
    visibleTasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }

  return (
    <section aria-label="Tasks">
      <TaskFilter onFilterChange={setFilters} />

      <button
        className="mb-4 bg-blue-700 text-white hover:bg-blue-800"
        aria-pressed={sortByDate}
        onClick={() => setSortByDate((previous) => !previous)}
      >
        {sortByDate ? "Use Original Order" : "Sort by Due Date"}
      </button>

      {visibleTasks.length === 0 ? (
        <p
          role="status"
          className="rounded-xl bg-white p-6 text-center text-slate-600"
        >
          {tasks.length === 0
            ? "No tasks left."
            : "No tasks match your filters."}
        </p>
      ) : (
        <ul className="space-y-4">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}