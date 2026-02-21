# 💰 Personal Finance Manager -- Frontend

## 📌 Overview

This is the **Frontend Application** for the Personal Finance Manager
system.

It is built using:

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- JWT Authentication
- Context API for Auth State

This frontend connects securely to the Spring Boot backend using
JWT-based authentication.

The system allows users to manage personal finances, including accounts,
transactions, transfers, and administrative monitoring.

---

# 🎯 Project Objectives

- Build a modern financial dashboard UI
- Connect securely with backend REST APIs
- Implement JWT authentication
- Apply role-based UI rendering (USER / ADMIN)
- Provide clear financial visualization

---

# 🏗️ Application Structure

## 📁 Folder Structure

    app/
     ├── (auth)/
     │    ├── login/
     │    └── register/
     │
     ├── (app)/
     │    ├── dashboard/
     │    ├── accounts/
     │    ├── transactions/
     │    ├── transfer/
     │    └── admin/
     │         └── users/
     │
     ├── layout.tsx
     └── globals.css

    components/
     ├── ui/
     ├── app-sidebar.tsx
     ├── top-navbar.tsx
     ├── summary-cards.tsx
     ├── monthly-chart.tsx
     └── transaction-table.tsx

    lib/
     ├── auth-context.tsx
     ├── api.ts
     └── types.ts

---

# 🔐 Authentication

- User Registration
- User Login
- JWT Access Token stored in client
- Refresh token handled by backend
- Protected routes
- Role-based UI (ADMIN panel visible only for admins)

---

# 📊 Core Features

## 👤 User

- Register / Login
- View Dashboard
- Create Accounts
- Add Income / Expense
- Transfer Between Accounts
- View Monthly Summary Chart

## 👑 Admin

- View All Users
- Toggle User Role (USER ↔ ADMIN)
- Monitor Transactions

---

---

## 👥 Task Division

This project was developed as a team assignment.

### ✅ Responsibilities

| Member       | Area                     | What they built                                              |
| ------------ | ------------------------ | ------------------------------------------------------------ |
| **Masterly** | Authentication           | Login, Register, JWT handling, Route protection              |
| **Raksa**    | Accounts                 | Create account, View list, Update account                    |
| **Chhai**    | Transactions & Transfers | Income/Expense CRUD, Transfer between accounts               |
| **Narin**    | Admin Panel              | View users, Toggle role (USER ↔ ADMIN), Monitor transactions |

---

# 🔌 API Integration

The frontend communicates with the backend using a centralized API
helper:

```ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
```

All authenticated requests include:

    Authorization: Bearer <access_token>

---

# 🎨 UI & Design

- Sidebar layout for dashboard
- Responsive design
- Financial summary cards
- Monthly income vs expense chart
- Transaction table with status badges

---

# 🚀 Running the Project

## 1️⃣ Install dependencies

```bash
npm install
```

## 2️⃣ Configure environment

Create `.env.local`

    NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

## 3️⃣ Start development server

```bash
npm run dev
```

Frontend runs on:

    http://localhost:3000

---

# 🔐 Security Notes

- JWT-based authentication
- Role-based UI protection
- Sensitive logic handled in backend
- Academic project (no real money transactions)

---

# 📚 Academic Context

This project was developed for:

Aditi Academy -- Midterm Assessment

Focus Areas: - Full-stack integration - Secure authentication -
Role-based access control - Clean architecture - UI/UX best practices

---

# 👨‍💻 Authors

Developed by:

- Masterly
- Raksa
- Chhai
- Narin
