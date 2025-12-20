from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.students import (
    get_all_students,
    get_student,
    create_student,
    update_student,
    delete_student,
)

from controllers.teachers import (
    get_all_teachers,
    get_teacher,
    create_teacher,
    update_teacher,
    delete_teacher,
)

from controllers.marks import (
    add_mark,
    get_marks_by_student,
    get_all_marks,
    update_mark,
    delete_mark,
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


FRONTEND_ROUTES = {"/", "/home", "/students", "/docs"}


def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True

    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True

    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True

    return False


class StudentRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if handle_ui_routes(self, path):
            return

        # --------------------
        # STUDENTS
        # --------------------
        if path == "/api/students":
            return get_all_students(self)

        if path.startswith("/api/students/"):
            try:
                return get_student(self, int(path.split("/")[-1]))
            except ValueError:
                return send_404(self)

        # --------------------
        # TEACHERS
        # --------------------
        if path == "/api/teachers":
            return get_all_teachers(self)

        if path.startswith("/api/teachers/"):
            try:
                return get_teacher(self, int(path.split("/")[-1]))
            except ValueError:
                return send_404(self)

        # --------------------
        # MARKS
        # --------------------
        if path == "/api/marks":
            return get_all_marks(self)

        if path.startswith("/api/marks/student/"):
            try:
                student_id = int(path.split("/")[-1])
                return get_marks_by_student(self, student_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    def do_POST(self):
        if self.path == "/api/students":
            return create_student(self)

        if self.path == "/api/teachers":
            return create_teacher(self)

        if self.path == "/api/marks":
            return add_mark(self)

        return send_404(self)

    def do_PUT(self):
        if self.path.startswith("/api/students/"):
            return update_student(self, int(self.path.split("/")[-1]))

        if self.path.startswith("/api/teachers/"):
            return update_teacher(self, int(self.path.split("/")[-1]))

        if self.path.startswith("/api/marks/"):
            return update_mark(self, int(self.path.split("/")[-1]))

        return send_404(self)

    def do_DELETE(self):
        if self.path.startswith("/api/students/"):
            return delete_student(self, int(self.path.split("/")[-1]))

        if self.path.startswith("/api/teachers/"):
            return delete_teacher(self, int(self.path.split("/")[-1]))

        if self.path.startswith("/api/marks/"):
            return delete_mark(self, int(self.path.split("/")[-1]))

        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")