# Task Manager

This is my project for Lab 3: Lists, Keys, and Conditionals. I built a simple task manager using React, TypeScript, Vite, and Tailwind CSS. The project focuses on displaying lists, using unique keys, and showing different styles based on task properties.

## Features

- Display tasks with a title, description, status, priority, and due date.
- Filter tasks by status and priority.
- Update a task's status.
- Delete tasks.
- Sort tasks by due date.
- Show different colors for status and priority.
- Cross out completed task titles.
- Show a message when no tasks match the filters or the list is empty.

## How to Run

Open the project folder in VS Code and run:

```bash
npm install
npm run dev
```

Open the local link displayed in the terminal.

To check the production build, run:

```bash
npm run build
```

## How to Use

Use the dropdowns at the top to filter tasks by status, priority, or both. Select All Statuses and All Priorities to display every task again.

Each task has a status dropdown and a Delete button. Changing a task to Completed turns its background green and crosses out its title.

Click Sort by Due Date to show the earliest date first. Click Use Original Order to change it back.

The app does not permanently save changes. Refreshing the page restores the sample tasks.

## Components

- App.tsx stores the tasks and handles status changes and deletion.
- TaskList.tsx filters, sorts, and displays the tasks.
- TaskItem.tsx displays one task and its controls.
- TaskFilter.tsx displays the status and priority filters.
- types/index.ts contains the shared TypeScript types and interfaces.

Example usage in App.tsx:

```tsx
<TaskList
  tasks={tasks}
  onStatusChange={handleStatusChange}
  onDelete={handleDelete}
/>
```

TaskList receives the task list and the functions needed to update or delete a task.

## What I Practiced

I practiced using React state, passing props between components, and rendering lists with unique keys. I also practiced filtering data and using conditions to change what appears on the screen.

One issue I ran into was the Priority dropdown appearing blank. After updating the TaskFilter component, the choices displayed correctly and the filter worked.

## Resources

- [React](https://react.dev/learn)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/)
- ChatGPT helped with the explanations and troubleshooting.