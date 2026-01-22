// frontend/assets/js/controllers/enrollmentController.js

import {
  apiGetAll as apiGetAllEnrollments,
  apiCreate,
  apiDelete,
} from "../services/enrollmentService.js";

import { apiGetAll as apiGetAllStudents } from "../services/studentService.js";
import { apiGetAll as apiGetAllTeachers } from "../services/teacherService.js";
import { apiGetAllCourses } from "../services/courseService.js";

import { showAlert } from "../components/Alert.js";
import { renderEnrollmentTable } from "../components/EnrollmentTable.js";
import { fillEnrollmentDropdowns } from "../components/EnrollmentForm.js";

import { $ } from "../utils/dom.js";

export function initEnrollmentController() {
  loadEverything();

  $("enrollmentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      student_id: Number($("student_id").value),
      course_id: Number($("course_id").value),
      teacher_id: Number($("teacher_id").value),
    };

    const res = await apiCreate(data);

    if (res.ok) {
      showAlert("Enrollment created!");
      $("enrollmentForm").reset();
      await loadEnrollmentsOnly();
    } else {
      showAlert("Failed to create enrollment", "error");
    }
  });
}

async function loadEverything() {
  await Promise.all([
    loadStudentsCoursesTeachers(),
    loadEnrollmentsOnly(),
  ]);
}

async function loadStudentsCoursesTeachers() {
  const [students, courses, teachers] = await Promise.all([
    apiGetAllStudents(),
    apiGetAllCourses(),
    apiGetAllTeachers(),
  ]);

  fillEnrollmentDropdowns(students, courses, teachers);
}

async function loadEnrollmentsOnly() {
  const spinner = $("loadingSpinner");
  const table = $("enrollmentsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const enrollments = await apiGetAllEnrollments();
  renderEnrollmentTable(enrollments);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function deleteEnrollmentAction(id) {
  if (!confirm("Delete this enrollment?")) return;

  const res = await apiDelete(id);

  if (res.ok) {
    showAlert("Enrollment deleted!");
    await loadEnrollmentsOnly();
  } else {
    showAlert("Failed to delete enrollment", "error");
  }
}
