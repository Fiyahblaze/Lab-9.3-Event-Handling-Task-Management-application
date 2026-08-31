import type { TaskItemProps, TaskStatus } from "../../types";

const statusStyles = {
  pending: "border-slate-400 bg-white",
  "in-progress": "border-blue-600 bg-blue-50",
  completed: "border-green-600 bg-green-50",
};

const priorityStyles = {
  low: "bg-slate-200 text-slate-800",
  medium: "bg-amber-100 text-amber-900",
  high: "bg-red-100 text-red-800",
};
