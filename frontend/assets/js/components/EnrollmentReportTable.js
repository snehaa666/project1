import { $ } from "../utils/dom.js";

export function renderEnrollmentReportTable(rows) {
  const body = $("reportTableBody");
  const empty = $("noRows");

  body.innerHTML = "";

  if (!rows || rows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${r.enrollment_id ?? ""}</td>

      <td class="px-3 py-2 border">
        ${r.student_name ?? ""} 
        <span class="text-xs text-gray-500">(ID: ${r.student_id ?? ""})</span>
      </td>

      <td class="px-3 py-2 border">
        ${r.course_title ?? ""} 
        <span class="text-xs text-gray-500">(ID: ${r.course_id ?? ""})</span>
      </td>

      <!-- ✅ Teacher column added -->
      <td class="px-3 py-2 border">
        ${r.teacher_name ?? "Not Assigned"} 
        <span class="text-xs text-gray-500">(ID: ${r.teacher_id ?? ""})</span>
      </td>

      <td class="px-3 py-2 border">${r.enrolled_on ?? ""}</td>
    `;
    body.appendChild(tr);
  });
}
import { $ } from "../utils/dom.js";
import { deleteEnrollmentAction } from "../controllers/enrollmentController.js";

export function renderEnrollmentTable(enrollments) {
  const body = $("enrollmentsTableBody");
  const empty = $("noEnrollments");

  body.innerHTML = "";

  if (!enrollments || enrollments.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  enrollments.forEach(e => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${e.id}</td>
      <td class="px-3 py-2 border">${e.student_id}</td>
      <td class="px-3 py-2 border">${e.course_id}</td>

      <!-- ✅ Teacher column added -->
      <td class="px-3 py-2 border">
        ${e.teacher_name ?? "Not Assigned"} 
        <span class="text-xs text-gray-500">(ID: ${e.teacher_id ?? ""})</span>
      </td>

      <td class="px-3 py-2 border">${e.enrolled_on ?? ""}</td>
      <td class="px-3 py-2 border">
        <button class="text-red-600 underline" data-del="${e.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () =>
      deleteEnrollmentAction(Number(btn.dataset.del))
    );
  });
}
