# controllers/students.py

from core.responses import send_json, send_404
from core.request import parse_json_body
from services.student_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete,
)

def get_all_students(handler):
    return send_json(handler, service_get_all())

def get_student(handler, student_id):
    student = service_get_one(student_id)
    return send_json(handler, student) if student else send_404(handler)

def create_student(handler):
    data = parse_json_body(handler)
    new_student = service_create(data)
    return send_json(handler, new_student, 201)

def update_student(handler, student_id):
    data = parse_json_body(handler)
    updated = service_update(student_id, data)
    return send_json(handler, updated) if updated else send_404(handler)

def delete_student(handler, student_id):
    deleted = service_delete(student_id)
    return send_json(handler, {"deleted": True}) if deleted else send_404(handler)
