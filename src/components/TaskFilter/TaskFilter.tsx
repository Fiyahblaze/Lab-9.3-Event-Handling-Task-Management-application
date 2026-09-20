import type {
  SortOption,
  TaskFilterProps,
  TaskPriority,
  TaskStatus,
} from "../../types";

export default function TaskFilter({
  filters,
  sortOption,
  onFilterChange,
  onSortChange,
}: TaskFilterProps) {
  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.search.trim() !== "";

  function clearFilters() {
    onFilterChange({
      status: "all",
      priority: "all",
      search: "",
    });
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            className="mb-1 block font-medium"
            htmlFor="search"
          >
            Search Tasks
          </label>

          <input
            className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-600 dark:bg-slate-700"
            id="search"
            type="search"
            placeholder="Search title or description"
            value={filters.search}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                search: event.target.value,
              })
            }
          />
        </div>

        <div>
          <label
            className="mb-1 block font-medium"
            htmlFor="filter-status"
          >
            Status
          </label>

          <select
            className="w-full"
            id="filter-status"
            value={filters.status}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                status: event.target.value as
                  | TaskStatus
                  | "all",
              })
            }
          >
            <option value="all">All Statuses</option>
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
            htmlFor="filter-priority"
          >
            Priority
          </label>

          <select
            className="w-full"
            id="filter-priority"
            value={filters.priority}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                priority: event.target.value as
                  | TaskPriority
                  | "all",
              })
            }
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label
            className="mb-1 block font-medium"
            htmlFor="sort"
          >
            Sort Tasks
          </label>

          <select
            className="w-full"
            id="sort"
            value={sortOption}
            onChange={(event) =>
              onSortChange(
                event.target.value as SortOption,
              )
            }
          >
            <option value="original">
              Original Order
            </option>
            <option value="due-date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-medium">
            Active filters:
          </span>

          {filters.search.trim() && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              Search: {filters.search}
            </span>
          )}

          {filters.status !== "all" && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
              Status: {filters.status}
            </span>
          )}

          {filters.priority !== "all" && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-900">
              Priority: {filters.priority}
            </span>
          )}

          <button
            className="bg-slate-200 text-sm text-slate-800 hover:bg-slate-300"
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}