# EduConnect

EduConnect is a comprehensive Learning Management System (LMS) designed to transform education through technology and innovation. The platform supports real-time virtual classrooms, advanced analytics, secure data management, integrated communication tools, and more.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

---

## Features

- Comprehensive Learning Management System
- Real-time Virtual Classrooms
- Advanced Analytics and Reporting
- Secure Student Data Management
- Integrated Communication Tools
- Automated Administrative Tasks
- Mobile-friendly Platform
- Dedicated Technical Support

### Highlighted Platform Features

- **Interactive Learning:** Engage with course materials through an interactive platform.
- **Live Classes:** Attend virtual classes with real-time interaction.
- **Instant Communication:** Integrated messaging for students and teachers.
- **Progress Tracking:** Monitor academic progress and assignment completion.
- **Collaborative Learning:** Group projects and assignments.
- **Personalized Learning:** Adaptable to individual student needs.
- **Secure Platform:** Robust data privacy and security.

---

## Project Structure

```
Minor-Project2/
├── client/    # Frontend (React + TypeScript + Vite)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── ...
├── server/    # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
└── ...
```

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, ShadCn UI,Socket.io, 100msLive, Axios
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, Socket.io, Zod, JWT, Nodemailer
- **Other:** Supabase, ESLint, Prettier

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (for backend database)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Abhishek-Gaire/Minor-Project2.git
cd Minor-Project2
```

#### 2. Install dependencies

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd ../server
npm install
```

#### 3. Set up environment variables

Create `.env` files in both `client` and `server` directories. (See [Environment Variables](#environment-variables))

#### 4. Database setup (for server)

- Configure your PostgreSQL connection in `server/.env`.
- Run Prisma migrations if using Prisma ORM:
  ```bash
  npx prisma migrate dev
  ```

#### 5. Start the development servers

**Client:**
```bash
npm run dev
```

**Server:**
```bash
npm run dev
```

---

## Environment Variables

### `server/.env`

```
DATABASE_URL=postgresql://user:password@localhost:5432/educonnect
JWT_SECRET=your_jwt_secret
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=5000
NODE_ENV=development for development
NODE_ENV=production for production
FRONTEND_URL=http://localhost:5173
BUCKET_NAME=your_supabase_storage_bucket_name
...
```

### `client/.env`

```
VITE_BACKEND_URI=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

VITE_TEACHER_ROOMCODE = your_teacher_roomcode from 100msLive
VITE_STUDENT_ROOMCODE = your_student_roomcode from 100msLive
...
```

---

## Scripts

### Client

- `npm run dev` – Start frontend dev server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

### Server

- `npm run dev` – Start backend with nodemon
- `npm run build` – Compile TypeScript
- `npm start` – Start compiled server

---

## Usage

- Access the frontend at `http://localhost:5173` (default Vite port).
- Backend API runs at `http://localhost:5000`.
- Register as a student, teacher, or admin to explore features.
- Use the messaging, assignment, and classroom modules for real-time collaboration.

---

## Contribution

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with clear messages.
4. Open a Pull Request describing your changes.

---

## License

This project is licensed under the ISC License.

---

## Contact

For support or inquiries, please contact the project maintainers.

---
