import { apiGetAll, apiGetOne, apiCreate, apiUpdate, apiDelete } from "../services/courseService.js";
import { showAlert } from "../components/Alert.js";
import { renderCourseTable } from "../components/CourseTable.js";
import { resetCourseForm, fillCourseForm } from "../components/CourseForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

export function initCourseController() {
  loadCourses();

  const courseForm = $("courseForm");
  const cancelBtn = $("cancelBtn");

  // Form submit
  courseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: $("title").value.trim(),
      code: $("code").value.trim()
    };

    const { editingId } = getState();

    if (editingId) {
      await updateCourse(editingId, data);
    } else {
      await createNewCourse(data);
    }
  });

  // Cancel editing
  cancelBtn.addEventListener("click", () => {
    setState({ editingId: null });
    resetCourseForm();
  });
}

// Load all courses and render table
async function loadCourses() {
  const spinner = $("loadingSpinner");
  const table = $("coursesTableContainer");

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  try {
    const courses = await apiGetAll();
    setState({ courses });
    renderCourseTable(courses);
  } catch (err) {
    console.error("Error loading courses:", err);
    showAlert("Failed to load courses", "error");
  } finally {
    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
  }
}

// Create a new course
async function createNewCourse(data) {
  try {
    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Course added!", "success");
      resetCourseForm();
      loadCourses();
    } else {
      showAlert("Failed to add course", "error");
    }
  } catch (err) {
    console.error(err);
    showAlert("Error adding course", "error");
  }
}

// Edit a course
export async function editCourse(id) {
  try {
    const course = await apiGetOne(id);
    if (course) {
      setState({ editingId: id });
      fillCourseForm(course);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (err) {
    console.error(err);
    showAlert("Error fetching course data", "error");
  }
}

// Update an existing course
async function updateCourse(id, data) {
  try {
    const res = await apiUpdate(id, data);
    if (res.ok) {
      showAlert("Course updated!", "success");
      resetCourseForm();
      setState({ editingId: null });
      loadCourses();
    } else {
      showAlert("Failed to update course", "error");
    }
  } catch (err) {
    console.error(err);
    showAlert("Error updating course", "error");
  }
}

// Delete a course
export async function deleteCourseAction(id) {
  if (!confirm("Delete this course?")) return;

  try {
    const res = await apiDelete(id);
    if (res.ok) {
      showAlert("Course deleted!", "success");
      loadCourses();
    } else {
      showAlert("Failed to delete course", "error");
    }
  } catch (err) {
    console.error(err);
    showAlert("Error deleting course", "error");
  }
}
