import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new student
export function resetForm() {
  // Reset the entire form
  $("studentForm").reset();

  // Explicitly clear mark_id (optional but clear)
  // $("mark").value = "";

  // Change the submit button text back to "Add Student"
  $("submitBtn").textContent = "Add Student";

  // Hide the "Cancel" button
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected student object (for editing)
export function fillForm(student) {
  // Fill each input field with student data
  $("name").value = student.name;
  $("email").value = student.email;
  $("course").value = student.course;
  $("year").value = student.year;

  // NEW: fill mark_id
  $("mark").value = student.mark;

  // Change the submit button text
  $("submitBtn").textContent = "Update Student";

  // Show the "Cancel" button
  $("cancelBtn").style.display = "inline-block";
}
