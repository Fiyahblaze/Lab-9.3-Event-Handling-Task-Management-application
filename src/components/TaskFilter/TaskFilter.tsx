import { useState } from "react";
import type {
  TaskFilterProps,
  TaskFilters,
  TaskPriority,
  TaskStatus,
} from "../../types";

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [filters, setFilters] = useState<TaskFilters>({});

  function updateFilters(changes: TaskFilters) {
    const updated = { ...filters, ...changes };

    setFilters(updated);
    onFilterChange(updated);
  }

  return (
    <div className="mb-4 grid gap-4 rounded-xl bg-white p-4 sm:grid-cols-2">
      <label className="flex flex-col gap-2 font-medium">
        Status

        <select
          value={filters.status ?? ""}
          onChange={(event) =>
            updateFilters({
              status: (event.target.value || undefined) as
                | TaskStatus
                | undefined,
            })
          }
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label className="flex flex-col gap-2 font-medium">
        Priority

        <select
          className="text-slate-800"
          value={filters.priority ?? ""}
          onChange={(event) =>
            updateFilters({
              priority: (event.target.value || undefined) as
                | TaskPriority
                | undefined,
            })
          }
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
    </div>
  );
}