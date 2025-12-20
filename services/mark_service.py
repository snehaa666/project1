# Contains business logic for marks (year-wise)
# No HTTP logic here

from database.mark_queries import (
    db_create_mark,
    db_get_marks_by_student,
    db_update_mark,
    db_delete_mark,
    db_get_all_marks,
    # db_get_one   # to validate student exists
)

from database.queries import db_get_one

VALID_YEARS = {"1st year", "2nd year", "3rd year"}

def service_add_mark(data):
    # validation: student must exist
    student = db_get_one(data["student_id"])
    if not student:
        return None

    # validation: valid academic year
    if data["year"] not in VALID_YEARS:
        raise ValueError("Invalid year")

    return db_create_mark(data)


def service_get_marks_by_student(student_id):
    return db_get_marks_by_student(student_id)


def service_update_mark(mark_id, data):
    if data["year"] not in VALID_YEARS:
        raise ValueError("Invalid year")

    return db_update_mark(mark_id, data)


def service_delete_mark(mark_id):
    return db_delete_mark(mark_id)

def service_get_all_marks():
    return db_get_all_marks()