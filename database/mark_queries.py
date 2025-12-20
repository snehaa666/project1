# =========================
# MARKS QUERIES (YEAR WISE)
# =========================

from datetime import datetime
from database.connection import get_connection


def db_create_mark(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute("""
        INSERT INTO marks (student_id, year,subject, marks, created_at)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["student_id"],
        data["year"],# "1st year", "2nd year", "3rd year"
        data["subject"],
        data["marks"],
        now
    ))

    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_mark(new_id)


def db_get_mark(mark_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM marks WHERE id = ?",
        (mark_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def db_get_marks_by_student(student_id):
    conn = get_connection()
    rows = conn.execute("""
        SELECT * FROM marks
        WHERE student_id = ?
        ORDER BY id DESC
    """, (student_id,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_update_mark(mark_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()

    conn.execute("""
        UPDATE marks
        SET year = ?, marks = ?, updated_at = ?
        WHERE id = ?
    """, (
        data["year"],
        data["marks"],
        now,
        mark_id
    ))

    conn.commit()
    conn.close()
    return db_get_mark(mark_id)


def db_delete_mark(mark_id):
    mark = db_get_mark(mark_id)
    if not mark:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM marks WHERE id = ?", (mark_id,))
    conn.commit()
    conn.close()
    return mark

def db_get_all_marks():
    conn = get_connection()
    rows = conn.execute("""
        SELECT * FROM marks ORDER BY student_id, year
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]