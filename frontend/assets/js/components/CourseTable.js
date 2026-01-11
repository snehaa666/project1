import { $ } from "../utils/dom.js";
import { editCourse, deleteCourseAction } from "../controllers/courseController.js";

export function renderCourseTable(courses) {
  const body = $("coursesTableBody");
  const empty = $("noCourses");

  body.innerHTML = "";

  if (!courses || courses.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  courses.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${c.id}</td>
      <td class="px-3 py-2 border">${c.title ?? ""}</td>
      <td class="px-3 py-2 border">${c.code ?? ""}</td>
      <td class="px-3 py-2 border">
        <button class="text-blue-600 underline mr-3" data-edit="${c.id}">Edit</button>
        <button class="text-red-600 underline" data-del="${c.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => editCourse(Number(btn.dataset.edit)));
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteCourseAction(Number(btn.dataset.del)));
  });
}