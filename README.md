# CMS Backend

Small Express-based CMS backend used for development and testing.

Contents:
- `server.js` - app entrypoint
- `src/` - application source: controllers, models, routes, middlewares
- `utils/` - helper utilities

Environment variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - token signing secret
- `EMAIL_USER` / `EMAIL_PASS` - SMTP credentials for OTP delivery
- `CORS_ORIGIN` - optional comma-separated list of allowed origins

Common scripts:
- `npm run dev` - start the API with nodemon
- `npm start` - start the API in production mode
- `npm run lint` - run ESLint across the repository

Main endpoints:
- `GET /health` - service health and version info
- `POST /api/auth/send-otp` - send a verification OTP
- `POST /api/auth/verify-otp` - verify an OTP and mark a user verified
- `POST /api/auth/signup` - create a user account
- `POST /api/auth/login` - issue a JWT
- `GET /api/artifacts` - list artifacts for the authenticated user
- `POST /api/artifacts` - create an artifact for the authenticated user

Quick start:

```bash
npm install
npm run dev
```

Purpose: provide a clear starting point and documentation for contributors.
