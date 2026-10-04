[🚀 Live Demo](https://campus-grid-ak9b.vercel.app)

# CampusGrid — Campus Resource Governance System

CampusGrid is a full-stack campus resource management platform for booking, monitoring, and governing shared rooms, equipment, and other campus resources.

It provides role-based access control, resource availability management, booking workflows, deterministic waitlists, approval workflows, audit logging, and in-app notifications through a centralized web application.

## ✨ Features

### 🔐 Authentication & Role-Based Access Control

- JWT-based authentication
- Secure password hashing with bcrypt
- HTTP-only cookie based sessions
- Role-based access control
- Multiple user roles including:
  - Student
  - Professor
  - Club Admin
  - Club Manager
  - Department Officer
  - Lab Technician
  - LHC Manager
  - Super Admin

### 📅 Resource & Room Booking

- Centralized resource registry
- Room and equipment management
- Booking creation and cancellation
- Configurable booking duration limits
- Resource availability schedules
- Capacity and resource constraints
- Weekly and daily calendar views

### ⏳ Deterministic Waitlist

When a resource is unavailable, users can be placed on a waitlist.

The system maintains waitlist positions and supports promotion when resources become available.

### ✅ Approval Workflow

Resources can require approval before a booking is confirmed.

Authorized users can:

- Review pending requests
- Approve bookings
- Reject bookings with comments
- Override bookings where permitted
- Reopen previously processed requests

### 📊 Monitoring & Administration

- Dashboard statistics
- Room monitoring
- Resource monitoring
- User management
- Role management
- Department and club management

### 🔎 Audit Logging

Important booking and administrative actions are recorded through an audit-log system containing:

- Action
- Entity type
- Entity ID
- User
- Previous state
- New state
- Metadata
- Timestamp

### 🔔 Notifications

The platform supports in-app notifications for important booking and workflow events, including unread notification tracking.

### 📧 Email Notifications

Nodemailer is integrated for sending workflow-related emails such as booking confirmations, approvals, rejections, and waitlist events.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| UI | Tailwind CSS, Lucide React |
| Backend | Next.js REST API Routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT (`jose`) |
| Password Security | bcryptjs |
| Validation | Zod |
| Email | Nodemailer |
| Package Manager | npm |

---

## 🏗️ Architecture

```text
┌───────────────────────────────┐
│        Next.js Frontend       │
│   React + TypeScript + CSS    │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Next.js API Routes      │
│ Auth / Booking / Resources    │
│ Calendar / Users / Audit      │
│ Notifications / Monitoring   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│          Prisma ORM           │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│        PostgreSQL DB          │
│ Users / Resources / Bookings  │
│ Waitlists / Audit / Alerts    │
└───────────────────────────────┘
```

---

## 📂 Project Structure

```text
CampusGrid/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── scripts/
│   └── seed-timetable.ts
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   └── api/
│   │
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── middleware.ts
│   └── types/
│
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ or another compatible PostgreSQL instance
- npm

### 1. Clone the repository

```bash
git clone https://github.com/ctrlSankalp/CampusGrid.git
cd CampusGrid
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on the project's environment configuration.

Required configuration includes the PostgreSQL connection and authentication-related secrets.

> Never commit `.env` files or database credentials to GitHub.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Set up the database

```bash
npx prisma db push
```

### 6. Seed development data

```bash
npm run db:seed
```

### 7. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔌 API Modules

The application contains REST API routes for:

```text
/api/auth
/api/users
/api/resources
/api/bookings
/api/calendar
/api/notifications
/api/audit
/api/stats
/api/departments
/api/clubs
/api/room-monitoring
/api/resource-monitoring
```

Booking operations include creation, approval, rejection, cancellation, reopening, and override workflows.

---

## 🗄️ Database Model

The Prisma schema models the major entities of the system:

```text
User
 │
 ├── Bookings
 ├── Approvals
 ├── Notifications
 ├── Audit Logs
 ├── Owned Resources
 └── Waitlist Entries

Resource
 │
 ├── Bookings
 ├── Waitlists
 ├── Department
 └── Club

Booking
 │
 └── Waitlist Entry
```

This relational structure allows bookings, resources, users, approvals, and waitlists to be connected while maintaining database-level relationships and indexes.

---

## 🔒 Security Considerations

The project includes:

- Password hashing with bcrypt
- JWT authentication
- HTTP-only authentication cookies
- Role-based authorization
- Request validation using Zod
- Environment-based database configuration
- Audit logging for important actions

Secrets and environment-specific credentials should remain outside version control.

---

## 📸 Screenshots

Screenshots of the dashboard, calendar, booking workflow, resource management, and approval system can be added here.

---

## 🔮 Future Improvements

Potential extensions include:

- Production deployment with managed PostgreSQL
- Advanced analytics and utilization reports
- Calendar synchronization
- Push notifications
- Automated conflict-resolution policies
- File/document attachments for booking requests
- More granular permission policies

---

## 📄 License

See the repository license for usage and distribution terms.
