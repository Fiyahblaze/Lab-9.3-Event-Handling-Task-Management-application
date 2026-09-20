import type {
  TaskItemProps,
  TaskStatus,
} from "../../types";
import { formatDate } from "../../utils/taskUtils";

const statusStyles = {
  pending:
    "border-slate-400 bg-white dark:bg-slate-800",
  "in-progress":
    "border-blue-600 bg-blue-50 dark:bg-blue-950",
  completed:
    "border-green-600 bg-green-50 dark:bg-green-950",
};

const priorityStyles = {
  low: "bg-slate-200 text-slate-800",
  medium: "bg-amber-100 text-amber-900",
  high: "bg-red-100 text-red-800",
};

export default function TaskItem({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  onMove,
  canMoveUp,
  canMoveDown,
}: TaskItemProps) {
  return (
    <li
      className={`rounded-xl border-l-4 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${statusStyles[task.status]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3
            className={`text-xl font-semibold ${
              task.status === "completed"
                ? "text-slate-500 line-through"
                : ""
            }`}
          >
            {task.title}
          </h3>

          <p className="mt-1 text-slate-600 dark:text-slate-300">
            {task.description}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${priorityStyles[task.priority]}`}
        >
          {task.priority.charAt(0).toUpperCase() +
            task.priority.slice(1)}
        </span>
      </div>

      <div className="my-4 flex flex-wrap items-center gap-3 text-sm">
        <span>
          Due:{" "}
          <time dateTime={task.dueDate}>
            {formatDate(task.dueDate)}
          </time>
        </span>

        {task.status === "completed" && (
          <span className="font-medium text-green-700 dark:text-green-400">
            Completed
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2">
          <span className="font-medium">Status:</span>

          <select
            aria-label={`Status for ${task.title}`}
            value={task.status}
            onChange={(event) =>
              onStatusChange(
                task.id,
                event.target.value as TaskStatus,
              )
            }
          >
            <option value="pending">Pending</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button
          className="bg-blue-700 text-white hover:bg-blue-800"
          type="button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="bg-red-700 text-white hover:bg-red-800"
          type="button"
          aria-label={`Delete ${task.title}`}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

        <button
          className="bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          disabled={!canMoveUp}
          aria-label={`Move ${task.title} up`}
          onClick={() => onMove(task.id, "up")}
        >
          Move Up
        </button>

        <button
          className="bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          disabled={!canMoveDown}
          aria-label={`Move ${task.title} down`}
          onClick={() => onMove(task.id, "down")}
        >
          Move Down
        </button>
      </div>
    </li>
  );
}