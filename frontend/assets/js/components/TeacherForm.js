import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new teacher
export function resetForm() {
  // Reset the entire form
  $("teacherForm").reset();

  // Change the submit button text back to "Add Teacher"
  $("submitBtn").textContent = "Add Teacher";

  // Hide the "Cancel" button
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected teacher object (for editing)
export function fillForm(teacher) {
  // Fill each input field with teacher data
  $("name").value = teacher.name;
  $("email").value = teacher.email;
  $("subject").value = teacher.subject;
  $("department").value = teacher.department;

  // Change the submit button text
  $("submitBtn").textContent = "Update Teacher";

  // Show the "Cancel" button
  $("cancelBtn").style.display = "inline-block";
}
