
# LearnHub - Learning Management System

A beginner-friendly frontend Learning Management System built using HTML, CSS, and JavaScript.

## User Story

As a student, I want to view available courses and mark courses as completed so that I can track my learning progress.

## Features

- View available courses.
- Search courses by title or category.
- Mark a course as completed.
- View completed course count.
- Track overall learning progress.
- Responsive user interface.
- Save progress using browser local storage.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Git and GitHub
- GitHub Actions
- Node.js testing
- Docker
- Nginx

## Project Structure

```text
lms-frontend/
├── .github/
│   └── workflows/
│       └── ci.yml
├── tests/
│   └── app.test.js
├── index.html
├── style.css
├── script.js
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

## Run the Application

Open `index.html` in your browser.

No backend server is required.

## Run Automated Tests

Install Node.js, open the project terminal, and run:

```bash
npm test
```

## Docker Setup

Build the Docker image:

```bash
docker build -t learnhub-lms:1.0 .
```

Start the container:

```bash
docker run --name learnhub-lms -p 8080:80 learnhub-lms:1.0
```

Open http://localhost:8080 in your browser.

## Git Branch Workflow

The project uses a feature branch for development.

```bash
git switch main
git switch -c feature/course-completion
```

After making changes:

```bash
git add .
git commit -m "feat: document LMS course completion"
git push -u origin feature/course-completion
```

## Continuous Integration

GitHub Actions automatically runs the Node.js tests when code is pushed to `main` or a `feature/**` branch and when a pull request targets `main`.

## Pull Request

Create a pull request from:

- Source branch: `feature/course-completion`
- Target branch: `main`

Review the automated test results before merging.

## Limitations

This is a frontend demonstration. Course information is stored in JavaScript, and course progress is saved in the browser. There is no backend, authentication, or shared database.
