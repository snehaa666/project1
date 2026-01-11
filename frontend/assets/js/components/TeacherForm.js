import { $ } from "../utils/dom.js";

// Resets the input form to its default state
export function resetForm() {
  // FIX: Matches id="TeacherForm" in HTML
  const form = $("TeacherForm");
  if (form) form.reset();

  const submitBtn = $("submitBtn");
  if (submitBtn) submitBtn.textContent = "Add Teacher";

  // FIX: Uses 'hidden' class to match Tailwind patterns
  const cancelBtn = $("cancelBtn");
  if (cancelBtn) cancelBtn.classList.add("hidden");
}

// Populates the form fields for editing
export function fillForm(teacher) {
  // FIX: Ensure these match the 'id' attributes in your HTML exactly
  if ($("name")) $("name").value = teacher.name;
  if ($("email")) $("email").value = teacher.email;
  
  // FIX: Your HTML used id="Subject" (Capital S)
  if ($("Subject")) $("Subject").value = teacher.subject;

  const submitBtn = $("submitBtn");
  if (submitBtn) submitBtn.textContent = "Update Teacher";

  const cancelBtn = $("cancelBtn");
  if (cancelBtn) cancelBtn.classList.remove("hidden");
}