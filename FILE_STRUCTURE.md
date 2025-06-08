# 📂 File Structure Documentation

This document provides a detailed overview of the Event Server project's file structure and organization.

## Directory Structure

```
server/
├── src/                          # Source code
│   ├── config/                  # Configuration
│   │   └── config.ts           # Environment and app configuration
│   ├── controllers/             # Request handlers
│   │   └── qr.controller.ts    # QR code controller
│   ├── middleware/              # Express middleware
│   │   └── error.middleware.ts # Error handling middleware
│   ├── routes/                  # API routes
│   │   └── qr.routes.ts       # QR code routes
│   ├── services/               # Business logic
│   │   ├── qr.service.ts      # QR code service
│   │   └── supabase.service.ts # Supabase client
│   ├── types/                  # TypeScript types
│   │   └── qr.types.ts        # QR code related types
│   ├── utils/                  # Utility functions
│   │   ├── health-check.service.ts  # Health check service
│   │   └── logger.ts          # Logging utility
│   ├── app.ts                  # Express app setup
│   └── index.ts               # Application entry point
├── logs/                      # Application logs
├── .env.example              # Example environment variables
├── package.json              # Project dependencies
└── tsconfig.json             # TypeScript configuration
```

## Key Directories and Files

### `/src`

Contains all the source code for the application.

### `/src/config`

Application configuration files.

- `config.ts`: Environment variables and app configuration

### `/src/controllers`

Request handlers that process incoming requests.

- `qr.controller.ts`: Handles QR code generation requests

### `/src/middleware`

Express middleware functions.

- `error.middleware.ts`: Global error handling

### `/src/routes`

API route definitions.

- `qr.routes.ts`: QR code related routes

### `/src/services`

Business logic implementation.

- `qr.service.ts`: QR code generation and storage logic
- `supabase.service.ts`: Supabase client configuration

### `/src/types`

TypeScript type definitions.

- `qr.types.ts`: Types for QR code related functionality

### `/src/utils`

Utility functions and helper classes.

- `health-check.service.ts`: Health monitoring service
- `logger.ts`: Logging configuration and utilities

### Root Files

- `app.ts`: Express application setup
- `index.ts`: Application entry point
- `.env.example`: Template for environment variables
- `package.json`: Project metadata and dependencies
- `tsconfig.json`: TypeScript compiler configuration
