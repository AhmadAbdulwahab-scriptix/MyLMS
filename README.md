# Library Management Sysytem (LMS)
Scriptix Lbrary Management System backend
A RESTful API for managing books and students, built with Node.js, Express, and MongoDB.

## Features
* Create, update, and fetch books
* ISBN validation and normalization (ISBN-13)
* Student management
* Library Attendant management
* Author management
* JWT authentication
* Request validation using Joi
* ISBN validation using isbn-utils

## Tech Stack
* Node.js
* Express.js
* MongoDB (Mongoose)
* Joi (Validation)
* JWT (Authentication)


## Setup Instructions
### 1. Clone the repository
```bash
git clone: https://github.com/AhmadAbdulwahab-scriptix/MyLMS.git
```

### 2. Install dependencies
```bash
npm install nodemon,
npm install cookie-parser,
npm install dotenv,
npm install express,
npm install isbn-utils,
npm install joi,
npm install jsonwebtoken,
npm install mongoose
```

### 3. environment variables
PORT=8080
ACCESS_tOKEN=496062d0f8e773c306ddac3bd6b9fbb3c9de4ceda6fecacc470bc5545dc616b69a4df4da174d558e05cac0e349522b02c3d77061857c415a77b8f6f31c423134
REFRESH_TOKEN=2485410e03abf24529e42cc156106893b4c391d8cacec6124cd82e7addf1e060907c4a1de5f451873b9288b04a1a9aac374d52afe3c73beb2279e8ee882c4e1c

### 4. Run the server
```bash
npm run dev
```
Server will start on PORT 8080
```
http://localhost:8080
```

## API Documentation
### Base URL
http://localhost:8080/


**<!-- Login Endpoints -->**
## Login Endpoints
### Student Login
* POST: `/students/login`

* Body: { 
    "email": "ahmad@gmail.com", 
    "studentId": "cst22i"
  }

### Attendant Login
* POST: `'/attendants/login'`

<!-- used name because we werent asked to use any other identifier like password -->
* Body: { 
    "name": "Ahmad Abdul", 
    "staffId": "Cst22"
  }


**<!-- Author Endpoints -->**
## Author Endpoints
### ➤ Create Author
* POST: `/authors`

* Body: {
    "name": "Harry Inks",
    "authorId": "CST123",
    "bio": "harry@example.com"
  }

### ➤ Get All Authors
* GET: `/authors`

### ➤ Get Author by ID
* GET: `/authors/:id`  -->  `/authors/69cba67a04c9e2c0010919ef`

### ➤ Update Author
* PUT: `/authors/:id` ---> `/authors/69cba67a04c9e2c0010919ef`

* Body: {
    "name": "Sais Hale",              //from: sais
    "bio: "He grew up in Nigeria      //from: nige
  }
<!-- minimum of one field must be entered -->

### ➤ Delete Author by ID
* DELETE: `/authors/:id`  --->  `/authors/69cb93594b12c0348dc8bb51`


**<!-- Books Endpoints -->**
## Books Endpoints
### ➤ Create Book
* POST: `/books`

* Body: {
    "title": "Atomic Habits",
    "isbn": "978-0735211292",
    "authors": [{"_id": "69cb93454b12c0348dc8bb4d"}]
  }

### ➤ Get All Books
* GET: `/books`

### ➤ Get Book by ID
* GET: `/books/:id`  --->  `/books/69cba3bc0361ed5b370b10a3`

### ➤ Update Book
* PUT: `/books/:id` ---> `/books/69cba3bc0361ed5b370b10a3`

* Body: {
    "title": "The Wicked Refused To DIe 1"            //from: The Wickd Refused To DIe 2,
    "isbn": "9780306406157"                           //from: "2" before applying isbn validaation,
    "authors: [{"_id": "69cb93594b12c0348dc8bb51",}]  //from: initially had 2 authors
  }
<!-- minimum of one field must be entered -->

### ➤ Delete Book by ID
* DELETE: `/books/:id`  --->  `/books/69cba4880361ed5b370b10bb`


**<!-- Students Endpoints -->**
## Students Endpoints
### ➤ Create Student
* POST: `/api/students`

* Body: {
    "name": "John Doe",
    "email": "john@example.com",
    "studentId": "ST123"
  }

### ➤ Get All Students
* GET: `/api/students`

### ➤ Get Student by ID
* GET: `/api/students/:id`  --->  `/api/students/69cb8914ba3e4d85fa7b8cae`


**<!-- Attendant Endpoints -->**
## Attendants Endpoints
### ➤ Create Attendant
* POST: `/api/attendants`

* Body: {
    "name": "Atomic Habits",
    "staffId": "FMS22"
  }

### ➤ Get All Attendants
* GET: `/api/attendants`


**<!-- Borrow & Return Endpoints -->**
## Borrow & Return Endpoints
### ➤ Borrow Book
* POST: `books/:id/borrow`  --->  'books/69cba3bc0361ed5b370b10a3/borrow'

* Body: {
    "attendantId": "69cb84f78c15fad61acd6998", 
    "studentId": "69cea46f6076abb6657e7352", 
    "returnDate": "2026-04-10"
  }

### ➤ Return Book
* POST: `books/:id/return`  --->  'books/69cba3bc0361ed5b370b10a3/return'


## Authentication
All routes require a valid JWT token: Except Student and Attendant Auth(Login) routes

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJfaWQiOiI2OWNlYTQyZTk4ZGJlOGVkMjRjYWY1ZDciLCJ1c2VySWQiOiJjc3QyMmkifSwiaWF0IjoxNzc1NTc5MDY3fQ._a5LDeI-P7_LbbFykn_YlyNAHx1xA0SlHRjfnUQQJdc
```

## 📬 Postman Collection
The API collection here: https://web.postman.co/workspace/Default-workspace~0e477a29-d12f-4555-a8eb-9aa05a433add/collection/53145322-0d38542d-5a18-4aae-8ef9-9296a2f679c3?action=share&source=copy-link&creator=53145322

## 🧠 Notes
* All ISBNs are normalized to ISBN-13
* Duplicate ISBNs are not allowed
* Validation errors return structured responses
---

## 📌 Author
Ahmed Abdulwahab (SCRIPTIX)
