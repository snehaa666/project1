import { $ } from "../utils/dom.js";
import { editTeacher, deleteTeacherAction } from "../controllers/teacherController.js";

// Renders the list of teachers into an HTML table
export function renderTeacherTable(teachers) {
  const body = $("teachersTableBody");
  const noTeachers = $("noTeachers");

  body.innerHTML = "";

  if (teachers.length === 0) {
    noTeachers.style.display = "block";
    return;
  }

  noTeachers.style.display = "none";

  teachers.forEach(teacher => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${teacher.id}</td>
      <td class="px-3 py-2">${teacher.name}</td>
      <td class="px-3 py-2">${teacher.email}</td>
      <td class="px-3 py-2">${teacher.subject}</td>
      <td class="px-3 py-2">${teacher.department}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
          data-edit="${teacher.id}">Edit</button>

        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          data-delete="${teacher.id}">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => editTeacher(teacher.id);
    row.querySelector("[data-delete]").onclick = () => deleteTeacherAction(teacher.id);

    body.appendChild(row);
  });
}
