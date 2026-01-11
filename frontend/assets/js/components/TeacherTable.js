import { $ } from "../utils/dom.js";

export function renderTeacherTable(teachers, { onEdit, onDelete }) {
  // 1. Fix: Ensure ID matches TeacherTableBody from your HTML
  const body = $("TeacherTableBody");
  const noTeachers = $("noTeachers");
  const loader = $("loadingSpinner");
  const container = $("TeacherTableContainer");

  if (!body) return; // Safety check

  body.innerHTML = "";

  // 2. Logic to hide loader and show container once this function runs
  if (loader) loader.classList.add("hidden");
  if (container) container.classList.remove("hidden");

  if (!teachers || teachers.length === 0) {
    noTeachers.classList.remove("hidden");
    return;
  }

  noTeachers.classList.add("hidden");

  teachers.forEach(teacher => {
    const row = document.createElement("tr");
    row.className = "border-b hover:bg-gray-50 transition";

    row.innerHTML = `
      <td class="px-3 py-2 text-sm text-gray-700">${teacher.id}</td>
      <td class="px-3 py-2 text-sm font-medium text-gray-900">${teacher.name}</td>
      <td class="px-3 py-2 text-sm text-gray-700">${teacher.email}</td>
      <td class="px-3 py-2 text-sm text-gray-700">${teacher.subject}</td>
      <td class="px-3 py-2 flex space-x-2">
        <button data-edit class="bg-yellow-400 hover:bg-yellow-500 text-xs font-bold py-1 px-3 rounded">
          Edit
        </button>
        <button data-delete class="bg-red-500 hover:bg-red-600 text-xs font-bold text-white py-1 px-3 rounded">
          Delete
        </button>
      </td>
    `;

    // 3. Fix: Corrected querySelector syntax
    row.querySelector('[data-edit]').onclick = () => onEdit(teacher.id);
    row.querySelector('[data-delete]').onclick = () => onDelete(teacher.id);

    body.appendChild(row);
  });
}