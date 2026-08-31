# Reflection

## 1. How did you ensure unique keys for your list items?

Each task has its own ID, and I used task.id as the key when displaying the list. This helps React keep track of the correct task when tasks are filtered, sorted, or deleted.

## 2. What considerations did you make when implementing the filtering functionality?

I made sure users could filter by status and priority separately or together. When both filters are selected, a task has to match both choices. Filtering only changes which tasks are displayed and does not delete them. I also included a message when no tasks match.

## 3. How did you handle state updates for task status changes?

I used useState to store the tasks. When a status changes, the handler uses map to find the task with the matching ID. It creates an updated copy of that task while keeping the other tasks unchanged. React then updates the display.

## 4. What challenges did you face when implementing conditional rendering?

I had to keep track of which styles and messages should appear for each condition. Completed tasks needed a green background and a crossed-out title. The list also needed different messages when all tasks were deleted or when no tasks matched the filters.

During testing, the Priority dropdown appeared blank. After updating the TaskFilter component, I checked it again and confirmed the options and filtering worked.