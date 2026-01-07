import { $ } from "../utils/dom.js";
// import { editTeacher, deleteTeacherAction } from "../controllers/teacherController.js";

export function renderTeacherTable(teachers, { onEdit, onDelete }) {
  const body = $("teachersTableBody");
  const noTeachers = $("noTeachers");

  body.innerHTML = "";

  if (!teachers || teachers.length === 0) {
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
      <td class="px-3 py-2 flex space-x-2">
        <button data-edit class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded">
          Edit
        </button>
        <button data-delete class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
          Delete
        </button>
      </td>
    `;

    row.querySelector["data-edit"].onclick = () =>  onEdit(teacher.id);
    row.querySelector["data-delete"].onclick = () =>  onDelete(teacher.id);

    body.appendChild(row);
  });
}