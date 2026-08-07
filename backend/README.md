# VESTRA — Backend

> ⚠️ **This directory is reserved for the future backend implementation.**  
> No backend code has been implemented during the current frontend phase.

## Overview

This directory will house the VESTRA server-side application. The backend will provide a REST API consumed by the React frontend and coordinate with external services.

## Planned Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB (via Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) |
| File Uploads | Multer |
| Validation | Zod / express-validator |

## Planned Services

### MongoDB & Mongoose
Product catalog, user profiles, order history, and size recommendations will be persisted in MongoDB. Mongoose will provide schema validation and query helpers.

### Python Size-Recommendation Service
A separate Python microservice will implement the body-measurement-to-size mapping algorithm. The Express backend will act as a proxy, forwarding relevant measurement data and returning size recommendations to the frontend.

### Virtual Try-On Provider
A third-party Virtual Try-On (VTO) provider will be integrated through this backend. The backend will:
1. Accept garment and user image requests from the frontend.
2. Forward them to the VTO provider's API.
3. Return the composited try-on image to the frontend.

Routing through the backend keeps provider API keys server-side and allows caching/rate-limiting.

## Directory Structure

```
backend/
├── src/
│   ├── config/        # Environment config, DB connection, constants
│   ├── controllers/   # Route handler logic
│   ├── middleware/    # Auth, validation, error-handling middleware
│   ├── models/        # Mongoose schemas & models
│   ├── routes/        # Express router definitions
│   ├── services/      # Business logic & external API clients
│   ├── utils/         # Shared utility functions
│   └── validators/    # Request validation schemas
├── tests/             # Unit & integration tests
├── uploads/           # Temporary storage for uploaded files
└── README.md
```

## Future Setup

Once backend development begins:

```bash
cd backend
npm init -y
npm install express mongoose dotenv cors helmet morgan multer zod
npm install -D typescript ts-node nodemon @types/express @types/node jest
```

Start the development server (once implemented):

```bash
npm run dev   # runs on http://localhost:5000
```
