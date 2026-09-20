# Reflection

For this project, I updated my previous task manager and turned it into a full dashboard using React, TypeScript, Vite, and Tailwind CSS. I used separate components for the dashboard, task form, filters, task list, and individual tasks. The main dashboard manages the task data and passes the information and functions each component needs through props.

I used TypeScript interfaces to define the task data, form data, filters, component props, and statistics. This helped me catch mistakes while building the project and made it clearer what type of information each component should receive. I also used React state to manage the tasks, filters, sorting, theme, messages, and the task being edited.

One challenge was connecting the updated types to all the components. Some errors appeared while the project was being updated because the older components were still using the previous props. I worked through the project one section at a time and updated each component until everything connected correctly. I tested the form validation, filters, sorting, task controls, localStorage, import and export features, and production build.

I also came to a better understanding of Git commits during this project. In the past, I used general messages such as “first commit,” “second commit,” or “third commit.” I changed that approach and started committing based on the section or feature I was working on. This resulted in fewer commits, but they were more organized and professional because each message clearly explained what was completed.

I enjoy using React and TypeScript with Vite because I can work on each section of my web application separately. Instead of searching through one large file with a lot of code, I can go directly to the component responsible for that feature. This made the project easier to build, understand, test, and fix.
