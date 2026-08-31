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
export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: TaskItemProps) {
  return (
    <li
      className={`rounded-xl border-l-4 p-5 shadow-sm transition hover:shadow-md ${statusStyles[task.status]}`}
    >
      <h2
        className={`text-xl font-semibold ${
          task.status === "completed" ? "line-through" : ""
        }`}
      >
        {task.title}
      </h2>

      <p className="mb-4 mt-1 text-slate-600">
        {task.description}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        <span
          className={`rounded-full px-3 py-1 font-medium ${priorityStyles[task.priority]}`}
        >
          Priority: {task.priority}
        </span>

        <span>
          Due: <time dateTime={task.dueDate}>{task.dueDate}</time>
        </span>

        {task.status === "completed" && (
          <span className="font-medium text-green-800">
            Completed
          </span>
        )}
         </div>

         <div className="flex flex-wrap items-center gap-3">
        <label className="flex flex-wrap items-center gap-2">
          Status

          <select
            aria-label={`Status for ${task.title}`}
            value={task.status}
            onChange={(event) =>
              onStatusChange(task.id, event.target.value as TaskStatus)
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>