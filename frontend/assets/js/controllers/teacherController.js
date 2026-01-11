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

export function initTeacherController() {
  // FIX: Match HTML id="TeacherForm"
  const teacherForm = $("TeacherForm"); 
  if (!teacherForm) {
    console.error("Form not found!");
    return;
  }

  loadTeachers();

  teacherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      email: $("email").value.trim(),
      subject: $("Subject").value.trim() // FIX: Match HTML id="Subject"
    };

    const { editingId } = getState();

    try {
      if (editingId) {
        await updateTeacher(editingId, data);
      } else {
        await createNewTeacher(data);
      }
    } catch (err) {
      alert("Failed to save teacher data.");
    }
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

export async function loadTeachers() {
  const spinner = $("loadingSpinner");
  const table = $("TeacherTableContainer"); // FIX: Match HTML ID

  if (spinner) spinner.style.display = "block";
  if (table) table.style.display = "none";

  try {
    const teachers = await apiGetAll();
    setState({ teachers });
    
    // FIX: Pass the actions so the buttons in the table actually work
    renderTeacherTable(teachers, { 
      onEdit: editTeacher, 
      onDelete: deleteTeacherAction 
    });
    
  } catch (error) {
    console.error("Error loading teachers:", error);
  } finally {
    // This finally block will now run because we fixed the errors above
    if (spinner) spinner.style.display = "none";
    if (table) table.style.display = "block";
  }
}

async function createNewTeacher(data) {
  await apiCreate(data);
  await loadTeachers();
  resetForm();
}

async function updateTeacher(id, data) {
  await apiUpdate(id, data);
  await loadTeachers();
  resetForm();
  setState({ editingId: null });
}

export function editTeacher(id) {
  const { teachers } = getState();
  // Ensure we compare the right types (string vs number)
  const teacher = teachers.find(t => String(t.id) === String(id));
  if (!teacher) return;

  setState({ editingId: id });
  fillForm(teacher);
}

export async function deleteTeacherAction(id) {
  if (!confirm("Are you sure you want to delete this teacher?")) return;

  try {
    await apiDelete(id);
    await loadTeachers();
    resetForm();
    setState({ editingId: null });
  } catch (err) {
    console.error("Delete failed", err);
  }
}