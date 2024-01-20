-- table for users
-- TODO - Change id to serial
-- STRETCH class_id, school
CREATE TABLE users (
    id INTEGER PRIMARY KEY ,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    class_id INTEGER
        REFERENCES classes ON DELETE SET NULL,
    school_id INTEGER
        REFERENCES schools ON DELETE SET NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
)

-- table for students (add age?)
-- TODO - Change id to serial
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
-- STRETCH set, school_id values
-- TODO - Change id to serial
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    isbn INTEGER NOT NULL,
    title TEXT NOT NULL,
    stage INTEGER NOT NULL,
    set INTEGER,
    school_id INTEGER,
    condition VARCHAR(10) NOT NULL
)

-- table for borrow record
-- TODO - Change id to serial
CREATE TABLE borrow_record (
    id SERIAL PRIMARY KEY, 
    student_id INTEGER NOT NULL
        REFERENCES students ON DELETE CASCADE, 
    book_id INTEGER NOT NULL
        REFERENCES books ON DELETE CASCADE,
    borrow_date DATE NOT NULL,
    return_date DATE
)

-- STRETCH table for schools
CREATE TABLE schools (
    id INTEGER PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    location TEXT NOT NULL
)

-- STRETCH table for classes
CREATE TABLE classes (
    id INTEGER PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    school_id INTEGER NOT NULL,
)

-- 