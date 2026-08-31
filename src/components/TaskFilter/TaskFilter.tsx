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