##################### API Observation Via Codespace URL
##################### API Observation Via Hopscotch
##################### API Observation Via CURL

# A. Get All Students
curl -X GET "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/students"

# A. Get All Teacher
curl -X GET "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/teachers"

# B. Get One Student
curl -X GET "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/students/1"

# B. Get One Student Mark
curl -X GET "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/marks/student/1"

# B. Get One Teacher
curl -X GET "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/teachers/1"

# C. Create Student
curl -X POST "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/students" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "sam Johnson",
    "email": "jhonson@example.com",
    "course": "Computer Science",
    "year": 2
  }'

# C. Create Teacher
 curl -X POST "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/teachers" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "michel simron",
    "email": "simron@example.com",
    "subject": "Mathematics"
  }'


# C. Create Mark 1st year
curl -X POST "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/marks" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 1,
    "year": "1st year",
    "subject": "maths",
    "marks": 75
  }'


# C. Create Mark 1st year
curl -X POST "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/marks" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": 1,
    "year": "2nd year",
    "subject":"science",
    "marks": 80
  }'


# D. Update Student
curl -X PUT "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/students/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "jhonson Updated",
    "email": "jhonson_new@example.com",
    "course": "Data Science",
    "year": 3
  }'

  # D. Update Teacher
curl -X PUT "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/teachers/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john_new@example.com",
    "subject": "Data Science"
  }'

 # D. Update Marks
  curl -X PUT "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/marks/1" \
  -H "Content-Type: application/json" \
  -d '{
    "year": "1st year",
    "marks": 35
  }'


# E. Delete Student
curl -X DELETE "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/students/1"


# E. Delete Teacher
curl -X DELETE "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/teachers/1"


# E. Delete Marks
curl -X DELETE "https://cautious-lamp-q7jv975q56xjh9r67-8000.app.github.dev/api/marks/1"



##################### DB Observation Via SQLite Web
- install https://github.com/coleifer/sqlite-web
- pip install sqlite-web
- sqlite_web master.db