# Schedula Server

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.0-green.svg)
![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen.svg)

**Schedula Server** is a high-performance backend service designed to power modern event management systems. Built with TypeScript and Node.js, it excels at generating and managing secure QR codes for event access control, while providing robust health monitoring and comprehensive logging capabilities.

### Why Schedula Server?

- **Security First**: Built with industry-standard security practices using Helmet and CORS protection
- **Modern Stack**: Leverages TypeScript for type safety and modern ES6+ features
- **Cloud Ready**: Seamless integration with Supabase for secure and scalable storage
- **Developer Friendly**: Comprehensive test coverage and detailed documentation
- **Production Grade**: Built-in health monitoring, error handling, and logging
- **Enterprise Ready**: Follows best practices for scalability and maintenance

This server is an integral part of the Schedula ecosystem, designed to handle event management needs at scale, from small meetups to large conferences.

## 📋 Features

- **QR Code Generation & Management**: Create and store QR codes for event access
- **Automated Health Checks**: Scheduled cron jobs for system health monitoring
- **Secure Storage**: Integration with Supabase for secure file storage
- **Type Safety**: Built with TypeScript for increased reliability
- **Test Coverage**: Comprehensive test suite with 80%+ coverage
- **API Validation**: Request/response validation
- **Error Handling**: Comprehensive error handling and logging

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

# Health Check
API_URL=http://localhost:3000/health
HEALTH_CHECK_SCHEDULE="*/14 * * * *"
```

The server can be configured through environment variables:

| Variable                     | Description                     | Default                      |
| ---------------------------- | ------------------------------- | ---------------------------- |
| `PORT`                       | Port for the server             | 3000                         |
| `NODE_ENV`                   | Environment mode                | development                  |
| `SUPABASE_URL`               | Supabase instance URL           | (required)                   |
| `SUPABASE_ANON_KEY`          | Supabase anonymous key          | (required)                   |
| `SUPABASE_STORAGE_BUCKET_QR` | Bucket name for QR codes        | (required)                   |
| `API_URL`                    | URL for API health checks       | http://localhost:3000/health |
| `HEALTH_CHECK_SCHEDULE`      | Cron schedule for health checks | `*/14 * * * *`               |

## API Documentation

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
- `npm run build` - Build the TypeScript code
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📚 Technologies

### Core Dependencies

- Express - Web framework
- Supabase - Backend storage
- QRCode - QR code generation
- Cron - Task scheduling
- Joi - Request validation
- TypeScript - Type safety

### Development Tools

- ESLint - Code linting
- Prettier - Code formatting
- Jest - Testing framework
- Husky - Manage Git hooks
- Docker - Containerization

## 📚 Documentation

- [Code Standards](./STANDARDS.md): Coding standards and practices
- [Contributing Guide](./CONTRIBUTING.md): How to contribute to the project
- [File Structure](./FILE_STRUCTURE.md): Detailed project structure documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
