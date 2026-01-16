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

  if (courseForm) {
    courseForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // THE FIX: Added the 'fees' property to capture the value from the form
      const data = {
        title: $("title").value.trim(),
        code: $("code").value.trim(),
        fees: $("fees").value.trim() 
      };

      const { editingId } = getState();

      if (editingId) {
        await updateCourse(editingId, data);
      } else {
        await createNewCourse(data);
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      setState({ editingId: null });
      resetCourseForm();
      // Hide cancel button when reset
      cancelBtn.classList.add("hidden");
      const submitBtn = $("submitBtn");
      if (submitBtn) submitBtn.innerText = "Add Course";
    });
  }
}

// Load all courses and render table
async function loadCourses() {
  const spinner = $("loadingSpinner");
  const tableContainer = $("coursesTableContainer");

  // Toggle visibility using Tailwind 'hidden' class
  if (spinner) spinner.classList.remove("hidden");
  if (tableContainer) tableContainer.classList.add("hidden");

  try {
    const courses = await apiGetAll();
    setState({ courses });
    renderCourseTable(courses);
  } catch (err) {
    console.error("Error loading courses:", err);
    showAlert("Failed to load courses", "error");
  } finally {
    if (spinner) spinner.classList.add("hidden");
    if (tableContainer) tableContainer.classList.remove("hidden");
  }
}

// Create a new course
async function createNewCourse(data) {
  try {
    const res = await apiCreate(data);
    if (res && res.ok) {
      showAlert("Course added successfully!", "success");
      resetCourseForm();
      loadCourses();
    } else {
      showAlert("Failed to add course. Check your API.", "error");
    }
  } catch (err) {
    console.error("Create Error:", err);
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
      
      // Update UI for editing mode
      const submitBtn = $("submitBtn");
      const cancelBtn = $("cancelBtn");
      if (submitBtn) submitBtn.innerText = "Update Course";
      if (cancelBtn) cancelBtn.classList.remove("hidden");
      
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
    if (res && res.ok) {
      showAlert("Course updated!", "success");
      resetCourseForm();
      setState({ editingId: null });
      
      // Hide cancel button
      const cancelBtn = $("cancelBtn");
      if (cancelBtn) cancelBtn.classList.add("hidden");
      
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
  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    const res = await apiDelete(id);
    if (res && res.ok) {
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