const courses = [
  {
    id: 1,
    title: "HTML & CSS",
    description: "Build a strong foundation in web page structure, styling, and responsive design.",
    category: "WEB DEVELOPMENT",
    icon: "⌘",
    theme: "violet"
  },
  {
    id: 2,
    title: "JavaScript Basics",
    description: "Explore variables, functions, events, and the fundamentals of interactive websites.",
    category: "PROGRAMMING",
    icon: "JS",
    theme: "blue"
  },
  {
    id: 3,
    title: "Python Programming",
    description: "Practice Python fundamentals, problem solving, and writing clean code.",
    category: "PROGRAMMING",
    icon: "Py",
    theme: "orange"
  }
];

const STORAGE_KEY = "learnhub-completed-courses";
const completed = new Set(loadCompleted());

function loadCompleted() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.filter(id => courses.some(course => course.id === id))
      : [];
  } catch {
    return [];
  }
}

function saveCompleted() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch {
    // The app still works for the current session if storage is unavailable.
  }
}

function renderCourses(searchTerm = "") {
  const container = document.getElementById("course-list");
  if (!container) return;

  const query = searchTerm.trim().toLowerCase();
  const filteredCourses = courses.filter(course =>
    `${course.title} ${course.description} ${course.category}`
      .toLowerCase()
      .includes(query)
  );

  if (filteredCourses.length === 0) {
    container.innerHTML = '<p class="empty-state">No courses match your search. Try another keyword.</p>';
  } else {
    container.innerHTML = filteredCourses.map(course => {
      const isCompleted = completed.has(course.id);
      return `
        <article class="course-card">
          <div class="course-top">
            <span class="course-icon ${course.theme}" aria-hidden="true">${course.icon}</span>
            <span class="course-tag">${course.category}</span>
          </div>
          <h3>${course.title}</h3>
          <p class="description">${course.description}</p>
          <div class="course-bottom">
            <span class="course-status ${isCompleted ? "done" : ""}">
              ${isCompleted ? "✓ Completed" : "○ In progress"}
            </span>
            <button
              class="complete-button"
              data-course-id="${course.id}"
              ${isCompleted ? "disabled" : ""}
              aria-label="${isCompleted ? "Completed" : "Mark " + course.title + " as completed"}"
            >${isCompleted ? "Completed ✓" : "Mark complete"}</button>
          </div>
        </article>`;
    }).join("");
  }

  updateProgress();
}

function updateProgress() {
  const total = courses.length;
  const count = completed.size;
  const percent = total === 0 ? 0 : Math.round((count / total) * 100);

  const available = document.getElementById("available-count");
  const completedCount = document.getElementById("completed-count");
  const progressPercent = document.getElementById("progress-percent");
  const progressFill = document.getElementById("progress-fill");
  const progressBar = document.getElementById("progress-bar");

  if (available) available.textContent = total;
  if (completedCount) completedCount.textContent = count;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressBar) progressBar.setAttribute("aria-valuenow", String(percent));
}

function markCourseCompleted(id) {
  if (!courses.some(course => course.id === id)) return false;
  if (completed.has(id)) return false;
  completed.add(id);
  saveCompleted();
  return true;
}

function initApp() {
  const container = document.getElementById("course-list");
  const searchInput = document.getElementById("course-search");

  if (!container) return;

  container.addEventListener("click", event => {
    const button = event.target.closest("button[data-course-id]");
    if (!button) return;

    const id = Number(button.dataset.courseId);
    if (markCourseCompleted(id)) {
      renderCourses(searchInput ? searchInput.value : "");
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => renderCourses(searchInput.value));
  }

  renderCourses();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { courses, completed, markCourseCompleted, updateProgress, renderCourses };
}

if (typeof document !== "undefined") {
  initApp();
}
