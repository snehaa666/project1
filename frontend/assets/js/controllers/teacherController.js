import {
  apiGetAll,
  apiCreate,
  apiUpdate,
  apiDelete
} from "../services/teacherService.js";

import { renderTeacherTable } from "../components/TeacherTable.js";
import { resetForm, fillForm } from "../components/TeacherForm.js";
import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Initialize controller
export function initTeacherController() {
  const teacherForm = $("teacherForm");
  if (!teacherForm) return;

  // ✅ LOAD TEACHERS ON PAGE LOAD
  loadTeachers();

  // Handle form submit
  teacherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      email: $("email").value.trim(),
      subject: $("subject").value.trim()
    };

    const { editingId } = getState();

    if (editingId) {
      await updateTeacher(editingId, data);
    } else {
      await createNewTeacher(data);
    }
  });

  // Cancel edit
  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Fetch all teachers
export async function loadTeachers() {
  const spinner = $("loadingSpinner");
  const table = $("teachersTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  try {
    const teachers = await apiGetAll();
    setState({ teachers });
    renderTeacherTable(teachers);
  } catch (error) {
    console.error("Error loading teachers:", error);
  } finally {
    spinner.style.display = "none";
    table.style.display = "block";
  }
}

// Create teacher
async function createNewTeacher(data) {
  await apiCreate(data);
  await loadTeachers();
  resetForm();
}

// Update teacher
async function updateTeacher(id, data) {
  await apiUpdate(id, data);
  await loadTeachers();
  resetForm();
  setState({ editingId: null });
}

// Edit handler
export function editTeacher(id) {
  const { teachers } = getState();
  const teacher = teachers.find(t => t.id === id);
  if (!teacher) return;

  setState({ editingId: id });
  fillForm(teacher);
}

// Delete handler
export async function deleteTeacherAction(id) {
  if (!confirm("Are you sure you want to delete this teacher?")) return;

  await apiDelete(id);
  await loadTeachers();
  resetForm();
  setState({ editingId: null });
}