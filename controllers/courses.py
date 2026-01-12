# controllers/courses.py
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.course_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete
)

def get_all_courses(handler):
    """Handles GET /api/courses"""
    data = service_get_all()
    return send_json(handler, 200, data)

def get_course(handler, course_id):
    """Handles GET /api/courses/<id>"""
    course = service_get_one(course_id)
    return send_json(handler, 200, course) if course else send_404(handler)

def create_course(handler):
    """Handles POST /api/courses"""
    data = parse_json_body(handler)
    new_course = service_create(data)
    return send_json(handler, 201, new_course)

def update_course(handler, course_id):
    """Handles PUT /api/courses/<id>"""
    data = parse_json_body(handler)
    updated = service_update(course_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_course(handler, course_id):
    """Handles DELETE /api/courses/<id>"""
    deleted = service_delete(course_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)