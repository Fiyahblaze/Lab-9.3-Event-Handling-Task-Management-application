import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import type {
  TaskFormData,
  TaskFormErrors,
  TaskFormProps,
  TaskPriority,
  TaskStatus,
} from "../../types";
import { validateTaskForm } from "../../utils/taskUtils";

const emptyForm: TaskFormData = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

export default function TaskForm({
  taskToEdit,
  onSubmit,
  onCancelEdit,
}: TaskFormProps) {
  const [formData, setFormData] =
    useState<TaskFormData>(emptyForm);
  const [errors, setErrors] =
    useState<TaskFormErrors>({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
      });
    } else {
      setFormData(emptyForm);
    }

    setErrors({});
  }, [taskToEdit]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedData: TaskFormData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    };

    const validationErrors =
      validateTaskForm(cleanedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(cleanedData);
    setFormData(emptyForm);
    setErrors({});
  }

  function handleCancel() {
    setFormData(emptyForm);
    setErrors({});
    onCancelEdit();
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
      <h2 className="mb-4 text-xl font-bold">
        {taskToEdit ? "Edit Task" : "Add New Task"}
      </h2>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            className="mb-1 block font-medium"
            htmlFor="title"
          >
            Task Title
          </label>

          <input
            className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700"
            id="title"
            type="text"
            value={formData.title}
            onChange={(event) =>
              setFormData({
                ...formData,
                title: event.target.value,
              })
            }
            aria-describedby={
              errors.title ? "title-error" : undefined
            }
          />

          {errors.title && (
            <p
              id="title-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-1 block font-medium"
            htmlFor="description"
          >
            Description
          </label>

          <textarea
            className="min-h-24 w-full rounded-lg border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700"
            id="description"
            value={formData.description}
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.target.value,
              })
            }
            aria-describedby={
              errors.description
                ? "description-error"
                : undefined
            }
          />

          {errors.description && (
            <p
              id="description-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              {errors.description}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              className="mb-1 block font-medium"
              htmlFor="status"
            >
              Status
            </label>

            <select
              className="w-full"
              id="status"
              value={formData.status}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  status: event.target.value as TaskStatus,
                })
              }
            >
              <option value="pending">Pending</option>
              <option value="in-progress">
                In Progress
              </option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              className="mb-1 block font-medium"
              htmlFor="priority"
            >
              Priority
            </label>

            <select
              className="w-full"
              id="priority"
              value={formData.priority}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  priority:
                    event.target.value as TaskPriority,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              className="mb-1 block font-medium"
              htmlFor="dueDate"
            >
              Due Date
            </label>

            <input
              className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700"
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  dueDate: event.target.value,
                })
              }
              aria-describedby={
                errors.dueDate
                  ? "due-date-error"
                  : undefined
              }
            />

            {errors.dueDate && (
              <p
                id="due-date-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="bg-blue-700 text-white hover:bg-blue-800"
            type="submit"
          >
            {taskToEdit ? "Save Changes" : "Add Task"}
          </button>

          {taskToEdit && (
            <button
              className="bg-slate-200 text-slate-800 hover:bg-slate-300"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}