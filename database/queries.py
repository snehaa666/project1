# Actual SQL queries — Create, Read, Update, Delete (CRUD)

from datetime import datetime
from .connection import get_connection


def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM students ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one(student_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM students WHERE id = ?", (student_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    # FIXED: Added missing commas between 'mark', 'created_at' and data values
    cur = conn.execute(
        "INSERT INTO students (name, email, course, year, marks, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        (data["name"], data["email"], data["course"], data["year"], data["marks"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)

def db_update(student_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    # FIXED: Added missing comma between data["mark"] and now
    conn.execute("""
        UPDATE students SET name=?, email=?, course=?, year=?, mark=?, updated_at=?
        WHERE id=?
    """, (data["name"], data["email"], data["course"], data["year"], data["mark"], now, student_id))
    conn.commit()
    conn.close()
    return db_get_one(student_id)

def db_delete(student_id):
    student = db_get_one(student_id)
    if not student:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM students WHERE id=?", (student_id,))
    conn.commit()
    conn.close()
    return student

# COURSES CRUD
# -----------------------------

def courses_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM courses ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def courses_get_one(course_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM courses WHERE id = ?", (course_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def courses_create(data: dict):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO courses (title, code, fees, created_at) VALUES (?, ?, ?, ?)",
        (data["title"], data.get("code"), data.get("fees"), now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return courses_get_one(new_id)

def courses_update(course_id: int, data: dict):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE courses
        SET title=?, code=?, fees=?, updated_at=?
        WHERE id=?
    """, (data["title"], data.get("code"), data.get("fees"), now, course_id))
    conn.commit()
    conn.close()
    return courses_get_one(course_id)

def courses_delete(course_id: int):
    course = courses_get_one(course_id)
    if not course:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM courses WHERE id=?", (course_id,))
    conn.commit()
    conn.close()
    return course

# -----------------------------
# ENROLLMENTS CRUD
# -----------------------------

def enrollments_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM enrollments ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def enrollments_get_one(enrollment_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM enrollments WHERE id = ?", (enrollment_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def enrollments_create(data: dict):
    conn = get_connection()
    now = datetime.now().isoformat()
    enrolled_on = data.get("enrolled_on") or now

    cur = conn.execute(
        "INSERT INTO enrollments (student_id, course_id, teacher_id, enrolled_on, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["student_id"], data["course_id"], data["teacher_id"], enrolled_on, now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return enrollments_get_one(new_id)

def enrollments_delete(enrollment_id: int):
    enrollment = enrollments_get_one(enrollment_id)
    if not enrollment:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM enrollments WHERE id=?", (enrollment_id,))
    conn.commit()
    conn.close()
    return enrollment


# -----------------------------
# JOIN REPORT
# -----------------------------

def enrollment_report():
    conn = get_connection()
    rows = conn.execute("""
        SELECT
            e.id AS enrollment_id,
            e.enrolled_on,

            s.id AS student_id,
            s.name AS student_name,
            s.email AS student_email,
            s.year AS student_year,
            s.mark AS student_mark, -- ADDED: Included mark in the report

            c.id AS course_id,
            c.title AS course_title,
            c.code AS course_code,
            c.teacher_name AS teacher_name,
            c.fees AS fees,
            c.duration_weeks AS duration_weeks
        FROM enrollments e
        JOIN students s ON s.id = e.student_id
        JOIN courses c ON c.id = e.course_id
        JOIN teachers t ON t.id = c.teacher_id
        ORDER BY e.id DESC;
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]