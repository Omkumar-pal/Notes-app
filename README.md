# 📝 Notes App

A full-stack web application for creating and managing personal notes, built with Node.js, Express, MongoDB, and EJS. Includes a server-side rendered web interface and a versioned REST API.

---

## Features

- User authentication with JWT (httpOnly cookie)
- Create, read, update, and delete personal notes
- Notes are scoped to the authenticated user — no cross-user access
- Admin panel to view, manage, and delete users and their notes
- Role-based access control (`user` / `admin`)
- Input validation on all forms and API endpoints
- REST API at `/api/v1` for external integrations
- Global error handling with environment-aware stack traces

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Templating | EJS |
| Validation | express-validator |
| Dev | Nodemon |

---

## Project Structure

```
├── controllers/
│   ├── auth.controllers.js         # Signup, signin, logout
│   ├── admin.controllers.js        # Admin — users & notes management
│   ├── notes.controllers.js        # Notes CRUD (web)
│   └── api/
│       └── v1/
│           ├── auth.controllers.js # API auth handlers
│           └── notes.controllers.js# API notes handlers
├── routes/
│   ├── static.routes.js            # Page rendering routes
│   ├── users.routes.js             # Auth + admin routes
│   ├── notes.routes.js             # Notes web routes
│   └── api/
│       └── v1/
│           ├── auth.routes.js      # POST /api/v1/auth/*
│           └── notes.routes.js     # /api/v1/notes/*
├── middlewares/
│   ├── authenticated.js            # JWT verification + authorize()
│   ├── setAuthStatus.js            # Non-blocking auth for public pages
│   ├── asyncHandler.js             # Async error wrapper
│   ├── error.middleware.js         # Global error + 404 handler
│   └── validation.middleware.js    # express-validator result handler
├── models/
│   ├── users.model.js              # User schema (bcrypt pre-save hook)
│   └── notes.model.js              # Note schema
├── validators/
│   ├── user.validator.js           # Register + login rules
│   └── note.validator.js           # Title + description rules
├── utils/
│   └── authToken.js                # JWT sign + set cookie
├── db/
│   └── index.js                    # MongoDB connection
├── views/                          # EJS templates
├── public/                         # Static assets
├── app.js                          # Express app setup
└── server.js                       # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/notes-app.git
cd notes-app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
```

### Run

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

App runs at `http://localhost:3000`

---

## Web Routes

### Public

| Method | Route | Description |
|---|---|---|
| GET | `/` | Home page |
| GET | `/sign-in` | Sign-in form |
| GET | `/sign-up` | Sign-up form |

### Auth

| Method | Route | Description |
|---|---|---|
| POST | `/users/sign-up` | Register new user |
| POST | `/users/sign-in` | Login |
| POST | `/users/logout` | Logout + clear cookie |

### Notes (requires login)

| Method | Route | Description |
|---|---|---|
| GET | `/notes` | All notes for logged-in user |
| POST | `/notes/create` | Create a new note |
| GET | `/notes/edit/:noteId` | Edit note form |
| POST | `/notes/edit/:noteId` | Update note |
| POST | `/notes/delete/:noteId` | Delete note |
| GET | `/notes/:noteId` | View single note |

### Admin (requires `admin` role)

| Method | Route | Description |
|---|---|---|
| GET | `/users/admin/users` | List all users |
| GET | `/users/admin/users/:userId/notes` | View a user's notes |
| POST | `/users/admin/users/:userId/delete` | Delete user + their notes |

---

## REST API

Base URL: `/api/v1`

All API errors return:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Auth — `/api/v1/auth`

#### POST `/api/v1/auth/sign-up`

**Body:**
```json
{
  "fullName": "Om Kumar Pal",
  "email": "om@example.com",
  "password": "secret123"
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "fullName": "Om Kumar Pal",
    "email": "om@example.com",
    "role": "user"
  }
}
```

---

#### POST `/api/v1/auth/sign-in`

**Body:**
```json
{
  "email": "om@example.com",
  "password": "secret123"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { "_id": "...", "fullName": "...", "email": "...", "role": "user" }
}
```

---

#### POST `/api/v1/auth/logout`

**Response `200`:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Notes — `/api/v1/notes`

All notes routes require authentication (JWT cookie).

#### GET `/api/v1/notes`

**Response `200`:**
```json
{
  "success": true,
  "count": 2,
  "notes": [ { "_id": "...", "title": "...", "description": "...", "createdBy": "..." } ]
}
```

---

#### GET `/api/v1/notes/:noteId`

**Response `200`:**
```json
{
  "success": true,
  "note": { "_id": "...", "title": "...", "description": "..." }
}
```

---

#### POST `/api/v1/notes`

**Body:**
```json
{
  "title": "My Note",
  "description": "Note content here"
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "note": { "_id": "...", "title": "My Note", "description": "Note content here" }
}
```

---

#### PUT `/api/v1/notes/:noteId`

**Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated content"
}
```

**Response `200`:**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "note": { ... }
}
```

---

#### DELETE `/api/v1/notes/:noteId`

**Response `200`:**
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

## Error Codes

| Status | Meaning |
|---|---|
| 400 | Validation failed or missing fields |
| 401 | Invalid email or password |
| 403 | Insufficient role (admin only) |
| 404 | User or note not found |
| 409 | Email already registered |
| 500 | Internal server error |

---

## Authentication

JWT is signed using `JWT_SECRET_KEY`, expires in `1 day`, and is stored as an `httpOnly` cookie named `token`. Passwords are hashed using bcrypt with 10 salt rounds.

The `authenticated` middleware verifies the token on protected routes. The `setAuthStatus` middleware does a non-blocking check for public pages to conditionally show auth-aware UI.

---

## License

MIT
