
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
## 🚀 Tech Stack

| Layer      | Technology        |
|------------|------------------|
| Frontend   | React (Create React App), Tailwind CSS |
| Backend    | Spring Boot (Java) |
| Database   | MySQL             |
| API Format | REST APIs         |
| Tools      | Git, Postman, Axios, Toastify, Eclipse, VS Code |

---

## 📸 UI Screenshots

| Screen        | Image Preview |
|---------------|---------------|
| Home          | ![](frontend/public/Implementation%20Screenshots/HomePage.png)
| Dashboard     | ![](frontend/public/Implementation%20Screenshots/DashboardPage.png)
| Add Job       | ![](frontend/public/Implementation%20Screenshots/AddJobPage.png)
| Edit Job      | ![](frontend/public/Implementation%20Screenshots/Edit.png)
| Analytics     | ![](frontend/public/Implementation%20Screenshots/Analytics.png)
| Login (Dark)  | ![](frontend/public/Implementation%20Screenshots/Login%20with%20Dark%20Mode.png)
| Profile       | ![](frontend/public/Implementation%20Screenshots/Profile.png)
| SignupPage    | ![](frontend/public/Implementation%20Screenshots/SignupPage.png)

---

## 📁 Project Structure
job-tracker-application/
├── backend/ # Spring Boot backend
│ └── src/
│ └── main/
│ ├── java/
│ └── resources/
│ └── application.properties
├── frontend/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js

---

## ⚙️ Backend Setup (Spring Boot)

1. **Configure MySQL:**
   - Create a database `jobtrackerdb` in MySQL.
   - Update `application.properties`:

     ```properties
     # === APP INFO ===
     spring.application.name=jobtracker

     # === SERVER CONFIG ===
     server.port=8080

     # === DB CONFIG ===
     spring.datasource.url=jdbc:mysql://localhost:3306/jobtrackerdb
     spring.datasource.username=your_mysql_username
     spring.datasource.password=your_mysql_password
     spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

     # === FILE UPLOAD CONFIG ===
     file.upload-dir=D:/JobResumes
     spring.servlet.multipart.max-file-size=5MB
     spring.servlet.multipart.max-request-size=5MB
     ```

2. **Run Spring Boot Application:**
   - Open terminal in the `backend/` directory.
   - Run with your IDE or:
     ```bash
     ./mvnw spring-boot:run
     ```
---

## 🌐 Frontend Setup (React + CRA)

1. Open terminal in `frontend/`:
   ```bash
   cd frontend

2. Install dependencies
   npm install

3. Start development server:
   npm start

4. Visit in browser:
   http://localhost:3000

---


