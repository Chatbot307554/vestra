# VESTRA

VESTRA is a modern virtual fashion try-on and size-recommendation platform built as a monorepo.

## Project Structure

```
vestra/
├── frontend/          # Vite + React + TypeScript + shadcn/ui frontend
├── backend/           # Node.js + Express API (future phase)
└── README.md
```

## Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Routing:** React Router

### Backend *(planned)*
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Size Recommendation:** Python microservice
- **Virtual Try-On:** Third-party provider integration

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Copy `frontend/.env.example` to `frontend/.env` and fill in the values:

```bash
cp frontend/.env.example frontend/.env
```

## Roadmap

- [x] Frontend scaffold (React + Vite + shadcn/ui)
- [ ] Backend API (Node.js + Express + MongoDB)
- [ ] Python size-recommendation microservice
- [ ] Virtual Try-On provider integration
- [ ] Authentication & user accounts
- [ ] Product catalog & inventory management
