import { $ } from "../utils/dom.js";

// Controller functions are passed in, NOT imported
export function renderStudentTable(students, { onEdit, onDelete }) {
  const body = $("studentsTableBody");
  const noStudents = $("noStudents");

  body.innerHTML = "";

  if (!students || students.length === 0) {
    noStudents.style.display = "block";
    return;
  }

  noStudents.style.display = "none";

  students.forEach(student => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="px-3 py-2">${student.id}</td>
      <td class="px-3 py-2">${student.mark}</td>
      <td class="px-3 py-2">${student.name}</td>
      <td class="px-3 py-2">${student.email}</td>
      <td class="px-3 py-2">${student.course}</td>
      <td class="px-3 py-2">${student.year}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button data-edit class="bg-yellow-400 px-3 py-1 rounded">Edit</button>
        <button data-delete class="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
      </td>
    `;

    row.querySelector("[data-edit]").onclick = () => onEdit(student.id);
    row.querySelector("[data-delete]").onclick = () => onDelete(student.id);

    body.appendChild(row);
  });
}
