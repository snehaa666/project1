# database/teacher_queries.py

from datetime import datetime
from .connection import get_connection


# -------------------------------------------------
# GET ALL TEACHERS
# -------------------------------------------------
def db_get_all_teachers():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM teachers ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


# -------------------------------------------------
# GET ONE TEACHER BY ID
# -------------------------------------------------
def db_get_one_teacher(teacher_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM teachers WHERE id = ?", (teacher_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


# -------------------------------------------------
# CREATE TEACHER
# -------------------------------------------------
def db_create_teacher(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute("""
        INSERT INTO teachers (name, email, subject, created_at)
        VALUES (?, ?, ?, ?)
    """, (data["name"], data["email"], data["subject"], now))

    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_teacher(new_id)


# -------------------------------------------------
# UPDATE TEACHER
# -------------------------------------------------
def db_update_teacher(teacher_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()

    conn.execute("""
        UPDATE teachers
        SET name=?, email=?, subject=?, updated_at=?
        WHERE id=?
    """, (data["name"], data["email"], data["subject"], now, teacher_id))

    conn.commit()
    conn.close()
    return db_get_one_teacher(teacher_id)


# -------------------------------------------------
# DELETE TEACHER
# -------------------------------------------------
def db_delete_teacher(teacher_id):
    teacher = db_get_one_teacher(teacher_id)
    if not teacher:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM teachers WHERE id=?", (teacher_id,))
    conn.commit()
    conn.close()
    return teacher