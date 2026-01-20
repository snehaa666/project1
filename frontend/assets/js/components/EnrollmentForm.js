import { $ } from "../utils/dom.js";

export function fillEnrollmentDropdowns(students, courses, teachers) {
  const studentSel = $("student_id");
  const courseSel  = $("course_id");
  const teacherSel = $("teacher_id");

  studentSel.innerHTML = `<option value="">Select Student</option>`;
  courseSel.innerHTML  = `<option value="">Select Course</option>`;
  teacherSel.innerHTML = `<option value="">Select Teacher</option>`;

  // Students
  (students || []).forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (ID: ${s.id})`;
    studentSel.appendChild(opt);
  });

  // Courses
  (courses || []).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.title} (ID: ${c.id})`;
    courseSel.appendChild(opt);
  });

  // Teachers ✅
  (teachers || []).forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = `${t.name} (ID: ${t.id})`;
    teacherSel.appendChild(opt);
  });
}
