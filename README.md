
# 🗂️ Job Application Tracker

A full-stack web application that helps users track job applications efficiently, with features like resume upload, status filtering, analytics, dark mode, and user authentication.

---

## ✨ Features

- 🔐 **Authentication** – Secure sign-up, login, and session management.
- 📝 **Add & Manage Jobs** – Add job info, upload resumes, and track applications.
- 🔄 **Edit Status** – Update job status to Applied, Interviewing, Hired, or Rejected.
- 📊 **Analytics** – Visual summary of job application outcomes.
- 🌙 **Dark Mode** – User-friendly dark mode support.
- 👤 **User Profile** – View user ID, name, and email.
- 📁 **Resume Preview** – View uploaded resume documents.

---

## 💻 Tech Stack

### Frontend
- React 
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Spring Boot
- REST APIs
- File Upload Support (resume handling)

### Database
- MySQL

---

## 🚀 Getting Started

### 1. Clone the repository

```bash

git clone https://github.com/Madhura-6/job-tracker-application.git
cd job-tracker-application

### 2. Setup Frontend
cd frontend
npm install

3. Setup Backend
Open the Spring Boot project in an IDE like IntelliJ or Eclipse.

Update src/main/resources/application.properties with your MySQL credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/jobtracker
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
Run the backend application with:

./mvnw spring-boot:run   Or directly from your IDE using the main class.



