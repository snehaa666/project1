import { $ } from "../utils/dom.js";

export function resetCourseForm() {
  $("courseForm").reset();
  $("cancelBtn").classList.add("hidden");
  $("submitBtn").textContent = "Add Course";
}

export function fillCourseForm(course) {
  $("title").value = course.title ?? "";
  $("code").value = course.code ?? "";
  $("cancelBtn").classList.remove("hidden");
  $("submitBtn").textContent = "Update Course";
}