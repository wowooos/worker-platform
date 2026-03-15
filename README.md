# Service Marketplace MVP 

## 🔹 Project Overview
**Service Marketplace** is a fullstack MVP built with React, Node.js/Express, and PostgreSQL. Originally developed as part of a college extension project, it connects self-employed workers with potential clients — workers can register their services, and clients can browse and filter providers by service type.

The project was built as a personal portfolio piece to practice fullstack development with a layered backend architecture (Routes → Controllers → Services → Repositories). It is currently local-only, with deployment and additional features planned for future iterations.


### Key Features
- Worker registration form with service details
- Service filtering and search functionality
- PostgreSQL database for data persistence

---

## 🔹 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#️-installation)
  - [Setting up your local Database](#-setting-up-your-local-database)
  - [Running the Project](#-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Future Enhancements](#-future-enhancements)
- [Deployment](#-deployment)


---

## 🔹 Tech Stack

### Frontend 
- [![JavaScript][JavaScript]](#)
- [![Vite][Vite]](#) _Fast build tool and development server_
- [![React][React]](#) _UI library for building interactive user interfaces_
- [![Bootstrap][Bootstrap]](#) _CSS framework for responsive design_
- `axios` _HTTP client for making API requests_

### Backend
- [![JavaScript][JavaScript]](#)
- [![Node.js][Node]](#) _JavaScript runtime environment_
- [![Express.js][Express]](#) _Web application framework for Node.js_
- `pg` _PostgreSQL client for Node.js_
- `cors` _Express middleware for handling CORS (Cross-Origin Resource Sharing)_
- `dotenv` _Environment variable management_

### Database
- [![Postgres][PostgreSQL]](#) _Relational database_

---

## 🔹 Getting Started

In this section, I'll guide you on how to set up the project **locally** and get it running!

### 📌 Prerequisites

| Requirement | Minimum Version | Tested Version |
|-------------|----------------|----------------|
| **Node.js** | v20.6.0 | v24.13.0 |
| **npm** | v9.0.0 | v11.6.2 |
| **PostgreSQL** | v14 | v18.1 |
| **Git** | Any recent version | - |

**Important Notes:**
- Node.js v20.6.0+ required for `--env-file` and `--watch` flags support

**Download Links:**
- [Node.js](https://nodejs.org/pt-br/download)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/install/)

> *💡 **Tip:** You can check the supported versions for each technology in their official websites.*
> - *[PostgreSQL releases](https://www.postgresql.org/support/versioning/)*
> - *[Node.js releases](https://nodejs.org/en/about/previous-releases)*

### ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USER_NAME/worker-platform.git
```

2. **Install dependencies**: By running ``npm install`` from the root directory, the command will install dependencies for both ``frontend`` and ``backend`` automatically:
```bash
cd worker-platform/

npm install
```

3. **Configure environment variables**: 

Copy and paste the following .env configurations for both your `backend` and `frontend`.

- Create a `.env` file in the `backend` directory:
```env
cd worker-platform/backend

# Server variables
PORT=5000   # Set your preferred port for the backend
NODE_ENV=development

# Database variables
DATABASE_URL=postgresql://username:password@localhost:port/worker_platform
DB_NAME=worker_platform
```
In ``DATABASE_URL``, replace `username`, `password`, and `port` with your PostgreSQL configurations.

> ⚠️ Note: If you change the `DB_NAME` value, you need to replace "worker_platform" in `DATABASE_URL` with the same value, and vice versa.

- Create a `.env` file in the `frontend` directory:
```env
cd worker-platform/frontend

VITE_API_URL=http://localhost:PORT/api/
``` 
Replace PORT with the defined ``PORT`` in the **backend .env file**, this is your backend API's URL.

### 💾 Setting up your local Database
Inside `backend`, you will be able to **initialize** and **seed** your local database by running the scripts located inside the `backend/scripts` directory.
> 📍 Note: You do not need to enter the `scripts` folder since the backend's package.json has pre-defined commands to run the scripts.
- Perform local DB initialization/migration:
```bash
cd worker-platform/backend

npm run db:init
```
It creates your local database with the pre-defined `DB_NAME` and `DATABASE_URL` backend .env variables, and creates the `worker` table.
- Seed data into it:
```bash
cd worker-platform/backend

npm run seed
```
It adds 10 entries to the `worker` table.

**Table Schema:**
```sql
CREATE TABLE IF NOT EXISTS worker (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    service VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    description TEXT
)
```

### 📁 Running the Project
- Start both the `frontend` and the `backend` concurrently:
```bash
cd worker-platform/

npm run dev
```
- Runs only the `backend`:
```bash
cd worker-platform/backend

npm run dev
```
- Runs only the `frontend`:
```bash
cd worker-platform/frontend

npm run dev
```

---

## 🔹 API Endpoints

### `GET /api/workers`
This returns all the workers from the `worker` table.

**Request**

No body, no query params, no auth required.

**Response ``200 OK``**
```json
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "service": "Plumber",
        "phone": "11999999999",
        "gender": "male",
        "date_of_birth": "1990-05-20",
        "description": "Experienced plumber available on weekends"
    },
...
]
```
**Response ``500 Internal Server Error``**
```json
{ "error": "<database error message>" }
```

### `POST /api/workers`
This endpoint adds a new entry to the `worker` table, and returns the inserted record.

**Request Body** `application/json`
```json
{
    "first_name": "John",       // required — string
    "last_name": "Doe",         // required — string
    "service": "Plumber",       // required — string
    "phone": "11999999999",     // required — string
    "gender": "male",           // required — string
    "date_of_birth": "1990-05-20", // required — date string (YYYY-MM-DD)
    "description": "..."        // not required — string
}
```

**Response `200 OK`** — returns the newly created row (array with one object)
```json
[
    {
        "id": 42,
        "first_name": "John",
        "last_name": "Doe",
        "service": "Plumber",
        "phone": "11999999999",
        "gender": "male",
        "date_of_birth": "1990-05-20",
        "description": "..."
    }
]
```
> Note: the response is an array (from RETURNING *) even though it always contains a single object.

**Response `500 Internal Server Error`**
```json
{ "error": "<database error message>" }
```

### `GET /api/services`
This endpoint returns the list of distinct services that already have at least one worker registered.

**Request**

No body, no query params, no auth required.

**Response `200 OK`**
```json
[
  {
    "service": "Cabeleireira"
  },
  {
    "service": "Encanador"
  },
  {
    "service": "Professor Particular de Inglês"
  },
  {
    "service": "Limpeza"
  },
  {
    "service": "Mecânico"
  },
  {
    "service": "Fotógrafa"
  },
  {
    "service": "Personal Trainer"
  },
  {
    "service": "Eletricista"
  },
  {
    "service": "Desenvolvedor Web"
  },
  {
    "service": "Manicure"
  }
]
```

> Note: each object has only the service field — not full worker objects. This endpoint queries `SELECT DISTINCT service FROM worker`, so it reflects what's currently in the database.

**Response `500 Internal Server Error`**
```json
{ "error": "<database error message>" }
```

---

## 🔹 Project Structure

### Folder Structure and System Architecture

This project follows a **Layered Architecture**, which organizes the application into distinct layers with clear responsibilities.

```
project-root/
├── backend/
│   ├── src/                         # BACKEND LAYERS
│   │   ├── routes/                     # API/Route LAYER
│   │   │   └── workerRoutes.js         # Express routes (endpoints)
│   │   │   └── serviceRoutes.js
│   │   │
│   │   ├── controllers/                # CONTROLLER LAYER
│   │   │   └── workerController.js     # Handle HTTP requests/responses
│   │   │   └── serviceController.js
│   │   │
│   │   ├── services/                   # BUSINESS LOGIC LAYER
│   │   │   └── workerService.js        # Business rules & validation
│   │   │   └── serviceTypeService.js
│   │   │
│   │   ├── repositories/               # DATA ACCESS LAYER
│   │   │   └── workerModel.js          # Database queries (CRUD)
│   │   │   └── serviceModel.js
│   │   │
│   │   ├── config/                     # Configuration
│   │   │   └── db.js                   # Database connection
│   │   │
│   │   └── app.js                      # Express application configuration
│   │
│   ├── server.js                       # Server entry point (starts HTTP server)
│   ├── .env                            # Environment variables
│   ├── package.json                    # Backend dependencies
│   └── README.md
├── frontend/                       # PRESENTATION LAYER
│   ├── src/
│   │   ├── components/                 # React components (UI)
│   │   │   ├── AddWorkerForm.jsx
│   │   │   └── WorkerCard.jsx
│   │   ├── services/                   # API calls to backend
│   │   │   └── api.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json                    # Frontend dependencies
├── package.json
└── README.md

```
### Key Files

**`server.js`** - Server Entry Point
- Starts the HTTP server
- Listens on specified port (5000)
- Imports and uses the configured Express app

**`src/app.js`** - Express Application Setup
- Configures Express application
- Registers middleware (CORS, JSON parsing)
- Registers API routes
- Exports configured app for use in server.js

---

## 🔹 Testing

### Testing the available features

**Worker Registration:**
1. Navigate to the registration form
2. Fill in all required fields
3. Submit the form
4. Verify the worker appears in the database

**Service Filtering:**
1. Navigate to the search/filter section
2. Select a service type from the dropdown
3. Verify only workers providing that service are displayed

---

## 🔸 Future Enhancements

- Add user authentication (worker/client accounts)
- Implement worker profile editing and deletion
- Add image upload functionality
- Implement pagination for worker listings
- Advanced filtering
- Add input validation on the backend (return `400 Bad Request` for missing or invalid fields instead of falling through to `500`)
- Standardize HTTP status codes (e.g., `POST /api/workers` returning `201 Created` instead of `200 OK`)

---
## 🔸 Deployment

**Current Status**
- **Database**: PostgreSQL 18.1 (Local)
- **Backend**: Node.js/Express (Local development only)
- **Frontend**: React/Vite (Local development only)

---
**Project Version:** 1.0.0 (MVP)

**Documentation Last Updated:** March 15, 2026  

---
[React]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB&style=plastic
[Vite]: https://img.shields.io/badge/BUILD_TOOL-F5F5F5?style=plastic&logo=vite&logoColor=fff&label=Vite&labelColor=646CFF
[Bootstrap]: https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff&style=plastic
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=plastic

[Node]: https://img.shields.io/badge/RUNTIME-F5F5F5?style=plastic&logo=node.js&logoColor=white&logoSize=auto&label=Node.js&labelColor=6DA55F
[Express]: https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB&style=plastic

[PostgreSQL]: https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white&style=plastic
