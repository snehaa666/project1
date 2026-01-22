from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

# --- STUDENTS ---
from controllers.students import (
    get_all_students,
    get_student,
    create_student,
    update_student,
    delete_student,
)

# --- TEACHERS ---
from controllers.teachers import (
    get_all_teachers,
    get_teacher,
    create_teacher,
    update_teacher,
    delete_teacher,
)

# --- MARKS ---
from controllers.marks import (
    add_mark,
    get_marks_by_student,
    get_all_marks,
    update_mark,
    delete_mark,
)

# --- COURSES ---
from controllers.courses import (
    get_all_courses,
    get_course,
    create_course,
    update_course,
    delete_course,
)

# --- ENROLLMENTS (Added missing imports) ---
from controllers.enrollments import (
    get_all_enrollments,
    get_enrollment,
    create_enrollment,
    delete_enrollment,
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers

# Added /profiles and /enrollments to fix the UI 404s
# Add "/profiles" to this list to stop the 404 error
FRONTEND_ROUTES = {"/", "/home", "/students", "/teachers", "/courses", "/profiles", "/enrollments","/learn-more"}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True
         # Serve assets at /assets/... -> frontend/assets/...
    if path.startswith("/assets/"):
        serve_static(handler, "frontend" + path)
        return True

    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True

    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True
    # Dynamic SPA routes (profiles pages)
    # e.g. /profiles/1 should still load index.html and let the SPA router decide
    if path.startswith("/profiles/"):
        serve_static(handler, "frontend/pages/index.html")
        return True

    

    return False


# -------------------------------
# Helpers
# -------------------------------

def _last_path_id_or_404(handler, path):
    """
    Extract the last path segment and ensure it's a number.
    If it's not a number, return None after sending 404 (no crash).
    """
    last = path.split("/")[-1]
    if not last.isdigit():
        send_404(handler)
        return None
    return int(last)

# -------------------------------
# MAIN ROUTER CLASS
# -------------------------------



class StudentRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if handle_ui_routes(self, path):
            return

        # API ROUTES
        # ---------------------------
        # STUDENTS
        # ---------------------------
        if path == "/api/students":
            return get_all_students(self)

        if path.startswith("/api/students/"):
            student_id = _last_path_id_or_404(self, path)
            if student_id is None:
                return
            return get_student(self, student_id)

      

        if path == "/api/teachers":
            return get_all_teachers(self)

        if path.startswith("/api/teachers/"):
            try:
                return get_teacher(self, int(path.split("/")[-1]))
            except ValueError:
                return send_404(self)
            
        if path == "/api/courses":
            return get_all_courses(self)

        if path.startswith("/api/courses/"):
            try:
                course_id = int(path.split("/")[-1])
                return get_course(self, course_id)
            except ValueError:
                return send_404(self)

        # if path == "/api/marks":
        #     return get_all_marks(self)

        # if path.startswith("/api/marks/students/"):
        #     try:
        #         student_id = int(path.split("/")[-1])
        #         return get_marks_by_student(self, student_id)
        #     except ValueError:
        #         return send_404(self)

        # ENROLLMENTS
        if path == "/api/enrollments":
            return get_all_enrollments(self)

        if path.startswith("/api/enrollments/"):
            try:
                enrollment_id = int(path.split("/")[-1])
                return get_enrollment(self, enrollment_id)
            except ValueError:
                return send_404(self)

        # REPORTS
        if path == "/api/reports/enrollments":
            return get_enrollment_report(self)

        return send_404(self)

    def do_POST(self):
        path = urlparse(self.path).path # Fixed: Added local path variable
        if path == "/api/students":
            return create_student(self)
        if path == "/api/teachers":
            return create_teacher(self)
        # if path == "/api/marks":
        #     return add_mark(self)
        if path == "/api/courses":
            return create_course(self)
        if path == "/api/enrollments":
            return create_enrollment(self)
        return send_404(self)

    def do_PUT(self):
        path = urlparse(self.path).path# Fixed: Added local path variable
        if path.startswith("/api/students/"):
            return update_student(self, int(path.split("/")[-1]))
        if path.startswith("/api/teachers/"):
            return update_teacher(self, int(path.split("/")[-1]))
        # if path.startswith("/api/marks/"):
        #     return update_mark(self, int(path.split("/")[-1]))
        if path.startswith("/api/courses/"):
            return update_course(self, int(path.split("/")[-1]))
        return send_404(self)

    def do_DELETE(self):
        path = urlparse(self.path).path # Fixed: Added local path variable
        if path.startswith("/api/students/"):
            return delete_student(self, int(path.split("/")[-1]))
        if path.startswith("/api/teachers/"):
            return delete_teacher(self, int(path.split("/")[-1]))
        # if path.startswith("/api/marks/"):
        #     return delete_mark(self, int(path.split("/")[-1]))
        if path.startswith("/api/courses/"):
            return delete_course(self, int(path.split("/")[-1]))
        if path.startswith("/api/enrollments/"):
            try:
                enrollment_id = int(path.split("/")[-1])
                return delete_enrollment(self, enrollment_id)
            except ValueError:
                return send_404(self)
        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")