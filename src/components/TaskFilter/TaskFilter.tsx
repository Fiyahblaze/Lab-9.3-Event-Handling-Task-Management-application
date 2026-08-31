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
  