# Event Server

A TypeScript-based Node.js server for QR code generation and event management.

## Features

- QR Code Generation API
- JWT Authentication
- Rate Limiting
- Health Check System
- Comprehensive Logging System
- Supabase Integration

## Prerequisites

- Node.js (v14 or higher)
- npm
- A Supabase account and project

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (see Configuration section)
4. Start the server:
   ```bash
   npm run dev   # for development
   npm start     # for production
   ```

## Configuration

Create a `.env` file with the following variables:

```env
NODE_ENV=development
PORT=3000

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_STORAGE_BUCKET_QR=your_qr_bucket

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Health Check
API_URL=http://localhost:3000/health
HEALTH_CHECK_SCHEDULE="*/14 * * * *"
```

## API Documentation

### Authentication

To authenticate requests, include a JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

The JWT token should be signed with your JWT_SECRET and contain the following payload structure:
```json
{
  "userId": "string",
  "role": "string",
  "iat": number,
  "exp": number
}
```

Example using [Postman](https://www.postman.com/):
1. Set the request header:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
2. The token payload should look like:
   ```json
   {
     "userId": "user123",
     "role": "user",
     "iat": 1623456789,
     "exp": 1623543189
   }
   ```

### Endpoints

#### Generate QR Code
```http
POST /api/qr/generate
```

Request Body:
```json
{
  "qrId": "string",
  "qrCode": "string",
  "userId": "string"
}
```

Response:
```json
{
  "status": "success",
  "data": {
    "url": "string"
  }
}
```

## Development Features

### Health Check System
- Runs only in development mode
- Configured through HEALTH_CHECK_SCHEDULE in cron format
- Monitors API health at configured intervals

### Logging
- Colored console output in development
- File-based logging with daily rotation
- Separate error logs
- JSON formatting for production

## Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot reload
- `npm test` - Run tests
- `npm run build` - Build the TypeScript code
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

This project is licensed under the MIT License - see the LICENSE file for details.
