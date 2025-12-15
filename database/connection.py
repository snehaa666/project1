import sqlite3

DB_FILE = "students.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_database():
    conn = get_connection()

    # ------------------------------
    # STUDENTS TABLE
    # ------------------------------
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            course TEXT,
            year TEXT,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    # ------------------------------
    # TEACHERS TABLE (NEW)
    # ------------------------------
    conn.execute("""
        CREATE TABLE IF NOT EXISTS teachers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            subject TEXT NOT NULL,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    conn.commit()
    conn.close()

    print("✓ Database initialized with students & teachers tables")