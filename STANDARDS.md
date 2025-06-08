# 📚 Code Standards

This document outlines the coding standards and best practices for the Event Server project.

## TypeScript Guidelines

### Type Safety

- Always use explicit types instead of `any`
- Use interfaces for complex object shapes
- Enable strict TypeScript configuration
- Use type guards for runtime type checking

```typescript
// Good
interface UserData {
  id: string;
  name: string;
}

function processUser(user: UserData): void {
  // Implementation
}

// Bad
function processUser(user: any): void {
  // Implementation
}
```

### Naming Conventions

- Use PascalCase for class names and interfaces
- Use camelCase for variables and functions
- Use UPPER_CASE for constants
- Use descriptive names that convey purpose

```typescript
// Good
class QRCodeGenerator {}
const maxRetryAttempts = 3;
const API_BASE_URL = 'https://api.example.com';

// Bad
class qr {}
const x = 3;
const url = 'https://api.example.com';
```

## Testing Standards

### Test Structure

- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Group related tests using describe blocks
- Mock external dependencies

```typescript
describe('QRService', () => {
  describe('generateQR', () => {
    it('should generate QR code successfully', async () => {
      // Arrange
      const input = {
        /* ... */
      };

      // Act
      const result = await service.generateQR(input);

      // Assert
      expect(result).toBeDefined();
    });
  });
});
```

### Test Coverage

- Maintain minimum 80% coverage
- Test both success and error paths
- Include integration tests
- Test edge cases and boundary conditions

## Error Handling

### Best Practices

- Use custom error classes
- Include meaningful error messages
- Log errors with appropriate context
- Handle async errors properly

```typescript
class QRGenerationError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = 'QRGenerationError';
  }
}

try {
  await generateQR();
} catch (error) {
  logger.error('QR generation failed:', error);
  throw new QRGenerationError('Failed to generate QR code', 'QR_GEN_001');
}
```

## API Design

### RESTful Principles

- Use appropriate HTTP methods
- Return consistent response structures
- Include proper status codes
- Version APIs appropriately

### Request/Response Structure

```typescript
// Success Response
{
  "status": "success",
  "data": {
    // Response data
  }
}

// Error Response
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Logging

### Guidelines

- Use appropriate log levels
- Include contextual information
- Avoid logging sensitive data
- Use structured logging format

```typescript
logger.info('QR code generated', {
  qrId: id,
  userId: user.id,
  timestamp: new Date().toISOString(),
});
```

## Git Practices

### Commit Messages

- Use conventional commits format
- Include descriptive messages
- Reference issue numbers

```bash
feat: add QR code generation endpoint
fix: handle storage upload errors
docs: update API documentation
```

### Branch Strategy

- Use feature branches
- Keep commits atomic
- Squash commits when merging
- Delete branches after merging

## Development Workflow

### Code Review

- Review all changes
- Use pull requests
- Address review comments
- Update documentation

### Quality Checks

- Run linter before committing
- Ensure all tests pass
- Check code coverage
- Validate types
