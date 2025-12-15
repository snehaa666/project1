# Contains business logic (validation, processing, rules)
# Does NOT know about HTTP — only works with Python data

from database.teacher_queries import (
    db_get_all_teachers,
    db_get_one_teacher,
    db_create_teacher,
    db_update_teacher,
    db_delete_teacher
)

def service_get_all_teachers():
    return db_get_all_teachers()

def service_get_one_teacher(teacher_id):
    return db_get_one_teacher(teacher_id)

def service_create_teacher(data):
    return db_create_teacher(data)

def service_update_teacher(teacher_id, data):
    return db_update_teacher(teacher_id, data)

def service_delete_teacher(teacher_id):
    return db_delete_teacher(teacher_id)