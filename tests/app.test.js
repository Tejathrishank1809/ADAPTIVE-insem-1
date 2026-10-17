const { test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { courses, completed, markCourseCompleted } = require("../script.js");

beforeEach(() => {
  completed.clear();
});

test("LMS contains three available courses", () => {
  assert.equal(courses.length, 3);
});

test("every course has an id, title, and description", () => {
  for (const course of courses) {
    assert.ok(Number.isInteger(course.id));
    assert.ok(course.title.length > 0);
    assert.ok(course.description.length > 0);
  }
});

test("a valid course can be marked as completed", () => {
  assert.equal(markCourseCompleted(1), true);
  assert.equal(completed.has(1), true);
});

test("a completed course cannot be marked twice", () => {
  assert.equal(markCourseCompleted(1), true);
  assert.equal(markCourseCompleted(1), false);
  assert.equal(completed.size, 1);
});

test("an unknown course id is rejected", () => {
  assert.equal(markCourseCompleted(999), false);
  assert.equal(completed.size, 0);
});
