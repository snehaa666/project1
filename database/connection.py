import sqlite3

DB_FILE = "master.db"

# ✅ DEFINE FIRST
def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def _column_exists(conn, table, column):
    cols = conn.execute(f"PRAGMA table_info({table})").fetchall()
    return any(c["name"] == column for c in cols)

# ✅ USE AFTER DEFINITION
def init_database():
    conn = get_connection()

    # 1. Students Table
    # 1. Students Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            course TEXT,
            year TEXT,
            marks TEXT,   -- Added this line
            created_at TEXT,
            updated_at TEXT
        )
    """)

    # 2. Teachers Table
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

    # 3. Courses Table 
    # (Including 'fees' here handles brand new database files)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            code TEXT,
            fees REAL,
            created_at TEXT,
            updated_at TEXT
        )
    """)

    # 4. 🚀 MIGRATION: Force add 'fees' to EXISTING databases
    # This prevents the "no column named fees" error if the DB file already existed
    try:
        conn.execute("ALTER TABLE courses ADD COLUMN fees REAL;")
        print("✓ Migration: 'fees' column successfully added to existing table.")
    except sqlite3.OperationalError:
        # If the column is already there, it skips this to avoid crashing
        print("ℹ Migration: 'fees' column already exists, skipping.")

    # 5. Marks Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS marks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            year TEXT NOT NULL,
            subject TEXT NOT NULL,
            mark INTEGER NOT NULL,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY (student_id) REFERENCES students(id)
        )
    """)
   
    conn.execute("""
        CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            teacher_id INTEGER NOT NULL,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(student_id) REFERENCES students(id),
            FOREIGN KEY(course_id) REFERENCES courses(id),
            FOREIGN KEY(teacher_id) REFERENCES teachers(id)
        )
    """) 

    conn.commit()
    conn.close()
    
    print("✓ Database initialized with students, teachers, courses & marks tables")

# To run the initialization directly
if __name__ == "__main__":
    init_database()