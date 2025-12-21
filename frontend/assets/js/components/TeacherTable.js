import { editTeacher, deleteTeacherAction } 
  from "../controllers/teacherController.js";

import { $ } from "../utils/dom.js";

export function renderTeacherTable(teachers = []) {
  const tbody = $("teachersTableBody");
  tbody.innerHTML = "";

  if (!teachers.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">No teachers found</td>
      </tr>
    `;
    return;
  }

  teachers.forEach((teacher) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${teacher.id}</td>
      <td>${teacher.name}</td>
      <td>${teacher.email}</td>
      <td>${teacher.subject}</td>
      <td>${teacher.experience}</td>
      <td>
        <button class="btn btn-sm btn-primary edit-btn">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn">Delete</button>
      </td>
    `;

    tr.querySelector(".edit-btn")
      .addEventListener("click", () => editTeacher(teacher.id));

    tr.querySelector(".delete-btn")
      .addEventListener("click", () => deleteTeacherAction(teacher.id));

    tbody.appendChild(tr);
  });
}
