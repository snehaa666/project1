import sqlite3

DB_FILE = "master.db"

# ✅ DEFINE FIRST
def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


# ✅ USE AFTER DEFINITION
def init_database():
    conn = get_connection()

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

    # ------------------------------
# MARKS TABLE (NEW)
# ------------------------------
    conn.execute("""
    CREATE TABLE IF NOT EXISTS marks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        year TEXT NOT NULL,
        subject TEXT NOT NULL,
        marks INTEGER NOT NULL,
        created_at TEXT,
        updated_at TEXT,
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
""")



    conn.commit()
    conn.close()

    # print("✓ Database initialized successfully")
    print("✓ Database initialized with students, teachers & marks tables")
