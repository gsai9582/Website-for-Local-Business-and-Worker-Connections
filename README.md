# 🚀 Work Wagon

**Live Application:**
🌐 https://work-wagon.vercel.app/

Work Wagon is a **full-stack web application** that connects **Shopkeepers and Workers**.
It allows shops to post job vacancies and workers to discover and request available opportunities.

The platform implements a **mutual request system** where both workers and shopkeepers can initiate job connections.

---

# 🛠 Tech Stack

## 🔹 Backend

* **Java**
* **Spring Boot**
* **Spring Data JPA**
* **PostgreSQL (Render Cloud Database)**
* **REST APIs**

Backend Deployment:
https://work-wagon-ez8e.onrender.com

---

## 🔹 Frontend

* **React**
* **Tailwind CSS**

Frontend Deployment:
https://work-wagon.vercel.app

---

# 🌍 System Architecture

Browser
⬇
React Frontend (Vercel)
⬇
Spring Boot Backend (Render)
⬇
PostgreSQL Database (Render)

---

# 👥 User Roles

## 🏪 Shopkeeper

* Register and login
* Add shop information
* Post job vacancies
* View worker profiles
* Send job requests to workers
* Accept or reject worker requests
* Update shop profile

---

## 👷 Worker

* Register and login
* Set availability status
* View shop listings
* Send job requests to shops
* Accept or reject shop requests
* Update worker profile

---

# 🔐 Authentication & Security

* **Session-based authentication using HttpSession**
* **Password encryption with BCrypt**
* **Unique email and mobile validation**
* **Role-based request handling**
* **CORS configuration for deployed frontend**

---

# 📦 Core Features

## ✅ Mutual Request System

Both users can initiate job interactions.

* Shop ➜ Worker request
* Worker ➜ Shop request

Request states:

* **PENDING**
* **ACCEPTED**
* **REJECTED**

---

## ✅ Business Logic

When a request is **accepted**:

* Shop **vacancy count decreases**
* Worker **availability becomes false**
* Duplicate requests are **prevented**

---

## ✅ Profile Management

Users can:

* View profile
* Update personal information
* View pending requests
* View accepted requests
* Accept or reject job requests

---

# 📁 Project Structure

```
work_wagon/
│
├── backend/
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Model
│   ├── DTO
│   ├── Enum
│   └── Config
│
└── frontend/
    ├── components
    ├── pages
    └── assets
```

---

# 🗄 Database

**PostgreSQL (Render Cloud Database)**

Managed with **Spring Data JPA**.

Schema generated automatically using:

```
spring.jpa.hibernate.ddl-auto=update
```

### Unique Constraints

* Email
* Mobile number

---

# ⚡ API Endpoints (Examples)

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| POST   | `/shop/login`           | Shop login        |
| POST   | `/worker/login`         | Worker login      |
| GET    | `/shops`                | List all shops    |
| GET    | `/workers`              | List all workers  |
| POST   | `/requests/send`        | Send request      |
| PUT    | `/requests/{id}/accept` | Accept request    |
| PUT    | `/requests/{id}/reject` | Reject request    |
| GET    | `/requests/pending`     | Pending requests  |
| GET    | `/requests/accepted`    | Accepted requests |

---

# ⚠ Notes

Render free backend instances **sleep after inactivity**.
The first request may take **30–60 seconds to wake up**.

---

# 📌 Future Improvements

* JWT Authentication
* Real-time request notifications
* Search & filtering for jobs
* Worker skill matching
* Admin moderation panel

---

# 👨‍💻 Author

**Gowtham Sai Garnepudi**

GitHub:
https://github.com/gsai9582/Website-for-Local-Business-and-Worker-Connections.git
