# Campus Freelance & Skill-Share Hub

## Project Overview
The **Campus Freelance & Skill-Share Hub** is a full-stack application designed to facilitate skill-sharing and freelance opportunities within a university campus. This project implements a **Polyglot Persistence** architecture, utilizing both Relational (PostgreSQL) and NoSQL (MongoDB) databases to handle different data requirements efficiently.

---

## Architecture & Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **State & Routing:** React Router DOM
* **API Handling:** Axios (with JWT Interceptors)
* **Feedback:** React Hot Toast (for notifications)

### Backend
* **Runtime:** Node.js & Express.js
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt.js
* **Database Management:** * **PostgreSQL:** Handles structured, transactional data (Users, Bookings).
  * **MongoDB:** Handles flexible, document-based data (Gig Listings).

---

## Database Schemas

### PostgreSQL (Relational)
| Table | Fields | Description |
| :--- | :--- | :--- |
| **Users** | `id` (UUID), `name`, `email`, `password_hash`, `role` | User profiles and credentials |
| **Bookings** | `id` (UUID), `gig_id` (Mongo ID), `client_id`, `freelancer_id`, `status` | Records of gig hire transactions |

### MongoDB (NoSQL)
* **Gigs Collection:** Stores `title`, `description`, `category`, `hourly_rate`, and `freelancer_id` (Postgres UUID reference). This allows for dynamic tags and flexible gig descriptions.

---

## Getting Started

### Prerequisites
* Node.js v20.11.0 or higher
* npm

### 1. Backend Setup
```bash
cd backend
npm install
Create a .env file in the backend/ folder:

Code snippet
PORT=5000
PG_URI=your_postgresql_connection_string
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the server:

Bash
node server.js
2. Frontend Setup
Bash
cd frontend
npm install
Start the development server:

Bash
npm run dev
**API Endpoints**
Auth Service
POST /api/auth/register - Create a new account.

POST /api/auth/login - Authenticate and receive a token.

Gig Service
GET /api/gigs - Fetch all available gigs.

POST /api/gigs - Post a new gig (Freelancer only).

DELETE /api/gigs/:id - Remove a gig listing.

Booking Service
POST /api/bookings - Book a specific gig.

GET /api/bookings/:user_id - View personal booking history.
