import TaskItem from "../TaskItem/TaskItem";
import type { TaskListProps } from "../../types";

export default function TaskList({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
  onMove,
}: TaskListProps) {
  return (
    <section aria-labelledby="task-list-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2
          id="task-list-heading"
          className="text-2xl font-bold"
        >
          Your Tasks
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {tasks.length}{" "}
          {tasks.length === 1 ? "Task" : "Tasks"}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p
          className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300"
          role="status"
        >
          No tasks match your current filters.
        </p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
              canMoveUp={index > 0}
              canMoveDown={index < tasks.length - 1}
            />
          ))}
        </ul>
      )}
    </section>
  );
}