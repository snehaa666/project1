import { 
  apiGetAll, 
  apiGetOne, 
  apiCreate, 
  apiUpdate, 
  apiDelete 
} from "../services/teacherService.js";

// import { showAlert } from "../components/Alert.js";
import { renderTeacherTable } from "frontend/assets/js/components/TeacherTable.js";
import { resetForm, fillForm } from "frontend/assets/js/components/TeacherForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";

// Setup event listeners and load initial data
export function initTeacherController() {
  // Load teachers on start
  loadTeachers();

  // --- Handle Form Submissions ---
  $("teacherForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data (ONLY name, email, subject)
    const data = {
      name: $("name").value.trim(),
      email: $("email").value.trim(),
      subject: $("subject").value.trim()
    };

    const { editingId } = getState();

    editingId
      ? await updateTeacher(editingId, data)
      : await createNewTeacher(data);
  });

  // --- Handle Cancel Button ---
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

  const teachers = await apiGetAll();

  setState({ teachers });
  renderTeacherTable(teachers);

  spinner.style.display = "none";
  table.style.display = "block";
}
