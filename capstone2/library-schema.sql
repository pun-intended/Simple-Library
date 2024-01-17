-- table for users
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    class_id INTEGER
        REFERENCES classes ON DELETE SET NULL,
    school TEXT
        REFERENCES schools ON DELETE SET NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
)

-- table for students (add age?)
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    school_id INTEGER
        REFERENCES schools ON DELETE SET NULL,
    class_id INTEGER
        REFERENCES classes ON DELETE SET NULL,
    level TEXT NOT NULL
)

-- table for books
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    isbn INTEGER NOT NULL,
    stage INTEGER NOT NULL,
    set INTEGER NOT NULL,
    school_id INTEGER NOT NULL,
    available BOOLEAN NOT NULL,
    condition VARCHAR(10) NOT NULL
)

-- table for borrow record
CREATE TABLE borrow_record (
    id INTEGER PRIMARY KEY, 
    student_id INTEGER NOT NULL
        REFERENCES students ON DELETE CASCADE, 
    book_id INTEGER NOT NULL
        REFERENCES books ON DELETE CASCADE,
    borrow_date DATE NOT NULL,
    return_date DATE
)

-- table for schools
CREATE TABLE schools (
    id INTEGER PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    location TEXT NOT NULL
)

-- table for classes
CREATE TABLE classes (
    id INTEGER PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    school_id INTEGER NOT NULL,
)

-- 