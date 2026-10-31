# ATU Student Study Planner Web Application

A lightweight, responsive, and intuitive web application designed for students at **Accra Technical University (ATU)** to organize academic tasks, monitor completion progress, and streamline study activities through a clean digital interface.

---

## Project Overview
Many undergraduate students encounter challenges managing their daily coursework, assignment deadlines, and exam preparation schedules. The **ATU Student Study Planner** provides a robust client-side web solution built using vanilla web technologies, allowing students to record tasks, categorize them by course/subject, track completion status in real-time, and preserve records locally without requiring an external server or database.

## Project Objectives
- Provide a user-friendly platform for organizing study tasks and course assignments.
- Enable students to monitor completed vs. pending tasks dynamically.
- Ensure data persistence across browser sessions using the Web Storage API (Local Storage).
- Deliver a fully responsive, modern interface suitable for mobile devices, tablets, and desktop computers.

## Core Features
1. **Task Management**: Add study tasks with custom titles and subject categories.
2. **Input Validation**: Prevents empty task submissions with helpful validation prompts.
3. **Completion Tracking**: Toggle task completion with visual strikethrough styling and immediate statistics updates.
4. **Dynamic Filtering**: Easily filter view between *All*, *Pending*, and *Completed* tasks.
5. **Real-time Statistics**: Live counters for total, completed, and pending tasks alongside an animated progress bar.
6. **Local Storage Persistence**: Automatically saves data in the browser so tasks remain available after refreshing or reopening.
7. **Theme Switching**: Built-in Light and Dark mode toggle with preference persistence.
8. **Responsive Design**: Optimized layout supporting desktop, tablet, and mobile screens.

## Technologies Used
- **HTML5**: Semantic document structure and accessibility markup.
- **CSS3**: Modern styling, Flexbox/Grid layouts, CSS variables, and responsive media queries.
- **Vanilla JavaScript (ES6+)**: Application state, DOM manipulation, event handling, and local storage integration.
- **Git & GitHub**: Version control and source code management.
- **GitHub Pages**: Static hosting and public deployment.

## Project File Structure
```text
Atu_Study_Planner/
│
├── index.html
├── style.css
├── app.js
├── atu_logo.png
└── README.md
