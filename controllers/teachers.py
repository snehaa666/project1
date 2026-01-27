# controllers/teachers.py
# Handlers for Teachers API (HTTP-level)

from core.responses import send_json, send_404
from core.request import parse_json_body

from services.teacher_service import (
    service_get_all_teachers,
    service_get_one_teacher,
    service_create_teacher,
    service_update_teacher,
    service_delete_teacher,
)

def get_all_teachers(handler):
    return send_json(handler, service_get_all_teachers())

def get_teacher(handler, teacher_id):
    teacher = service_get_one_teacher(teacher_id)
    return send_json(handler, teacher) if teacher else send_404(handler)

def create_teacher(handler):
    data = parse_json_body(handler)
    new_teacher = service_create_teacher(data)
    return send_json(handler, new_teacher, 201)

def update_teacher(handler, teacher_id):
    data = parse_json_body(handler)
    updated = service_update_teacher(teacher_id, data)
    return send_json(handler, updated) if updated else send_404(handler)

def delete_teacher(handler, teacher_id):
    deleted = service_delete_teacher(teacher_id)
    return send_json(handler, {"deleted": True}) if deleted else send_404(handler)
