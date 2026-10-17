# LearnHub — LMS Frontend

A beginner-friendly frontend-only Learning Management System demo built with HTML, CSS, and vanilla JavaScript.

## User story

As a student, I want to view available courses and mark a course as completed so that I can track my learning progress.

## Features

- Responsive course dashboard
- Three sample courses
- Search courses by title, description, or category
- Mark courses as completed
- Completion count and progress percentage
- Progress saved in browser local storage
- Node.js built-in automated tests
- GitHub Actions CI workflow
- Docker container served by Nginx

## Run locally

Open `index.html` in your browser. No backend or package installation is required to use the frontend.

## Run tests

Install Node.js 22 or newer, then run:

```bash
npm test
```

## Run with Docker

Build:

```bash
docker build -t learnhub-lms:1.0 .
```

Run:

```bash
docker run --name learnhub-lms -p 8080:80 learnhub-lms:1.0
```

Open http://localhost:8080.

Stop and remove:

```bash
docker stop learnhub-lms
docker rm learnhub-lms
```

## Git branch workflow

```bash
git init
git add .
git commit -m "chore: initialize LearnHub LMS"
git branch -M main
git switch -c feature/course-completion
git add .
git commit -m "feat: add course completion tracking"
```

Create an empty GitHub repository, then connect it:

```bash
git remote add origin https://github.com/YOUR_USERNAME/lms-frontend.git
git push -u origin main
git push -u origin feature/course-completion
```

Open a pull request from `feature/course-completion` into `main`. GitHub Actions runs the tests automatically on pushes to `main` or `feature/**`, and on pull requests targeting `main`.

## Project structure

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

## Notes

This is a frontend demonstration. Course data is hard-coded, and completion status is stored locally in the current browser. There is no authentication, server, or shared database.
