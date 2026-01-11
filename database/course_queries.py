# =========================
# COURSE QUERIES
# =========================

from .connection import get_connection


def db_get_all_courses():
    """
    Get all distinct courses from students table
    """
    conn = get_connection()
    rows = conn.execute("""
        SELECT DISTINCT course
        FROM students
        ORDER BY course
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_course(course_name):
    """
    Get a single course by name
    """
    conn = get_connection()
    row = conn.execute("""
        SELECT DISTINCT course
        FROM students
        WHERE course = ?
    """, (course_name,)).fetchone()
    conn.close()
    return dict(row) if row else None


def db_get_students_by_course(course_name):
    """
    Get all students enrolled in a course
    """
    conn = get_connection()
    rows = conn.execute("""
        SELECT *
        FROM students
        WHERE course = ?
        ORDER BY id DESC
    """, (course_name,)).fetchall()
    conn.close()
    return [dict(r) for r in rows]
